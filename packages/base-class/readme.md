# Intro

This class can hopefully operate as a base upon which to build other classes in contexts where (1) you want to use event emission patterns and/or (2) you want to store and retrieve object data to and from disk or other storage medium (e.g., `localStorage`).

# Installation

```bash
npm install --save @jrc03c/base-class
```

# Usage

```js
const BaseClass = require("@jrc03c/base-class")
// then create instances and/or subclasses of it
```

# API

## `BaseClass` (constructor)

Creates a new `BaseClass` instance. In this specific class, no arguments need to be provided to the constructor; but this class is designed to be used in such a way that _subclass_ constructors should expect to receive a single configuration object.

For example:

```js
const BaseClass = require("@jrc03c/base-class")

class Person extends BaseClass {
  name = "Nobody"
  age = 0

  constructor(data) {
    super()
    data = data || {}
    this.name = data.name || this.name
    this.age = data.age || this.age
  }
}

const alice = new Person({ name: "Alice", age: 23 })
// ...
```

To take full advantage of the class, you'll want to override the constructor, the [`toObject`](#toobject) method, and maybe also the [`copy`](#copy) method.

### Properties

#### `subscriptions`

An object whose keys are event names and whose values are arrays of callback functions that will be called when the events fire.

### Methods

#### `copy()`

Returns a copy of the given instance. Note that events and their subscribed callback functions will also be copied to the new instance. For example:

```js
const BaseClass = require("@jrc03c/base-class")
const base1 = new BaseClass()
base1.on("foo", () => console.log("FOO!"))
const base2 = base1.copy()
base1.emit("foo") // "FOO!"
base2.emit("foo") // "FOO!"
```

Ideally, the newly-created copy will be identical in every way to the original — though to make this work, you'll almost certainly need to override the constructor, the `toObject` method, and maybe even this method (`copy`).

#### `emit(event : string, payload : any)`

Calls all callback functions subscribed to a particular event, passing the payload to each of them. Returns the instance.

#### `off(event: string, callback : function)`

Unsubscribes a callback function from an event. Returns `undefined`.

#### `on(event : string, callback : function)`

Subscribes a callback function to an event. Returns an unsubscription function that's equivalent to invoking the `off` method. For example:

```js
const BaseClass = require("@jrc03c/base-class")
const base = new BaseClass()
const callback = () => console.log("The callback has been called!")
const unsubscribe = base.on("some-event", callback)

// You can unsubscribe the callback from "some-event" in one of two equivalent
// ways. First, you can call the returned `unsubscribe` function:
unsubscribe()

// Or second, you can use the instance's `off` method:
base.off("some-event", callback)
```

#### `toObject()`

Returns a JS object containing all of the important data from the instance.

The goal of this function is to aid in storage of class instance data. It's designed to work in tandem with the class constructor in the following way. As I mentioned above, the constructor expects (at least potentially in subclasses) to receive an object. So, importantly, **the object returned from the `toObject` method should be _exactly_ the kind of object expected by the constructor.** The reason for this is that the `copy` method literally just injects the data returned from the `toObject` method into the constructor and returns the newly-created instance. In other words:

```js
return new this.constructor(this.toObject())
```

Here's an example of how to override the `toObject` method using the `Person` class I introduced up in the constructor documentation:

```js
const BaseClass = require("@jrc03c/base-class")

class Person extends BaseClass {
  name = "Nobody"
  age = 0

  constructor(data) {
    super()
    data = data || {}
    this.name = data.name || this.name
    this.age = data.age || this.age
  }

  toObject() {
    return {
      ...super.toObject(),
      name: this.name,
      age: this.age,
    }
  }
}

const alice = new Person({ name: "Alice", age: 23 })
const malice = alice.copy()
console.log(malice.name) // "Alice"
console.log(malice.age) // 23
```

Once you've overridden the `toObject` method, you can start storing data offline and retrieving it later. Here's a Node example using the `Person` class defined above:

```js
const fs = require("node:fs")
const alice = new Person({ name: "Alice", age: 23 })

// Save Alice's data to disk:
fs.writeFileSync("alice.json", JSON.stringify(alice.toObject()), "utf8")

// Then retrieve it later and reconstruct an identical `Person` instance:
const malice = new Person(JSON.parse(fs.readFileSync("alice.json", "utf8")))
```

**NOTE:** If some callback functions were subscribed to events on `alice`, then those callback functions will _not_ automatically be subscribed to the same events on `malice`, as would be the case if `malice` was created simply by using `alice.copy()`!
