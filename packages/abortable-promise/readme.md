# Intro

This library offers an `AbortablePromise` class since regular ol' `Promise`s can't be aborted.

# Usage

Install:

```bash
npm install --save @jrc03c/abortable-promise
```

Import:

```js
import { AbortablePromise } from "@jrc03c/abortable-promise"
```

The `AbortablePromise` class is a descendant of the `Promise` class, so you can use it wherever else you use `Promise`s. But the `AbortablePromise` class adds roughly two new bits of functionality.

The first new bit of functionality can be seen in the function that's passed into the `AbortablePromise` constructor. Instead of passing into the constructor a function that can only receive `resolve` and `reject` arguments, you can now pass a function that can accept `resolve`, `reject`, `abort`, and `onAbort` arguments (all of which are functions). Like this:

```js
new AbortablePromise((resolve, reject, abort, onAbort) => {
  try {
    // do the usual `Promise` stuff
    doSomethingHard().then(resolve)

    // but if you need to abort from inside this function, simply call `abort`
    if (somethingWentWrong) {
      abort(someReturnValue)
    }

    // you can also provide callbacks that'll be called when the
    // `AbortablePromise` has been aborted
    onAbort(someReturnValue => {
      // tidy up any loose ends, etc.
    })
  } catch (e) {
    reject(e)
  }
})
```

The second bit of new functionality can be seen from outside an `AbortablePromise` instance, specifically by calling the instance's `abort` and `onAbort` methods (which are exactly the same as the `abort` and `onAbort` functions seen above):

```js
const promise = new AbortablePromise(...)

// add callbacks to be called when the `AbortablePromise` is aborted
promise.onAbort(someValue => {
  console.log(
    "The `AbortablePromise` was aborted and returned this value:",
    someValue
  )
})

// abort the `AbortablePromise` early if necessary
if (somethingWentWrong) {
  promise.abort(someValue)
}
```

If you abort an `AbortablePromise`, then any callbacks passed to the instance's `then` or `catch` methods will _not_ be called. For example:

```js
const promise = new AbortablePromise(...)

promise.onAbort(() => console.log("Abortion!"))

promise.then(() => {
  // because `promise` will be aborted below, this callback will not be called!
  console.log("Success!")
})

promise.catch(() => {
  // because `promise` will be aborted below, this callback will not be called!
  console.log("Failure!")
})

promise.abort()
```

Finally, here's one quite subtle point that I only learned while building this library: **The `then`, `catch`, and `finally` methods of a `Promise` each return a _new_ `Promise`, _not_ the original `Promise`!** So, chaining such calls like this:

```js
fetch(...)
  .then(...)
  .catch(...)
  .finally(...)
```

...is actually equivalent to this:

```js
const promise1 = fetch(...)
const promise2 = promise1.then(...)
const promise3 = promise2.catch(...)
const promise4 = promise3.finally(...)
```

I mention all of that because I specifically chose _not_ to return a new `AbortablePromise` from the `onAbort` method. I found that including `onAbort` in chained method calls resulted in unexpected behavior, and I couldn't figure out how to make it behave in the expected way. Therefore, the `onAbort` method doesn't return anything and should not be chained. (If you know of a way to make chained calls to `onAbort` work correctly, I'd be glad to hear it!)

# API

## `AbortablePromise(fn)`

The `AbortablePromise` constructor accepts a function which receives four arguments, all of which are functions: `resolve`, `reject`, `abort`, and `onAbort`. For example:

```js
new AbortablePromise((resolve, reject, abort, onAbort) => {
  // ...
})
```

## Properties

### `wasAborted`

A read-only boolean indicating whether or not the `AbortablePromise` was already aborted.

### `wasRejected`

A read-only boolean indicating whether or not the `AbortablePromise` was already rejected.

### `wasResolved`

A read-only boolean indicating whether or not the `AbortablePromise` was already resolved.

## Methods

### `abort([...])`

Aborts the `AbortablePromise` immediately and returns nothing. Any arguments passed into this function are automatically passed to all callback functions that were added via the `onAbort` method.

### `onAbort(fn)`

Adds a callback function (`fn`) to the list of callback functions that will be called if the `abort` method is called. The function `fn` will automatically receive whatever arguments are passed into the `abort` method.

# Examples

Here's an example of how you might implement your own function that returns an `AbortablePromise`:

```js
function countToNSlowly(n) {
  return new AbortablePromise((resolve, reject, abort, onAbort) => {
    try {
      let counter = 0

      const interval = setInterval(() => {
        counter++
        console.log("Counter:", counter)

        if (counter >= n) {
          clearInterval(interval)
          resolve(counter)
        }
      }, 1000)

      // if the `AbortablePromise` gets aborted, then we need to be sure to shut
      // down the above loop
      onAbort(() => clearInterval(interval))
    } catch (e) {
      return reject(e)
    }
  })
}

const promise = countToNSlowly(10) // which should take 10 seconds

promise.then(() => {
  console.log("Done!")
})

promise.onAbort(() => {
  console.log("Aborted!")
})

// abort the counting early
setTimeout(() => promise.abort(), 3000)
```

A slightly more complex example involves wrapping the `fetch` function so that we can abort it if it's taking too long. This example is somewhat contrived because JS already provides the `AbortController` class that can be used in conjunction with `fetch`. But here it is anyway:

```js
function abortableFetch(url, options) {
  options = options || {}

  return new AbortablePromise((resolve, reject, abort, onAbort) => {
    try {
      const controller = new AbortController()

      fetch(url, { ...options, signal: controller.signal })
        .then(response => resolve(response))
        .catch(error => reject(error))

      onAbort(() => controller.abort())
    } catch (e) {
      return reject(e)
    }
  })
}

const promise = abortableFetch("https://some-slow-website.com")

promise.then(response => {
  response.text().then(console.log)
})

promise.onAbort(() => {
  console.log("Aborted!")
})

// if we don't receive a response in 100ms, then we'll bail out!
setTimeout(() => promise.abort(), 100)
```
