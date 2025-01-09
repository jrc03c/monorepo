# Intro

This tool makes it a little easier to interact with Web Workers.

# Installation

```bash
npm install --save @jrc03c/web-worker-helper
```

# Usage

> **NOTE:** This example assumes the use of [Parcel](https://parceljs.org/). See the notes section at the bottom of this document for more info.

```js
// main.js
import { WebWorkerHelper } from "@jrc03c/web-worker-helper

const helper = new WebWorkerHelper(
  new URL("worker.js", import.meta.url), { type: "module" }
)

const data = { hello: "world" }

helper.exec("run-some-expensive-computation", data).then(result => {
  console.log(result)
})
```

```js
// worker.js
import { someExpensiveComputation } from "some-library"
import { WebWorkerHelper } from "@jrc03c/web-worker-helper"

self.addEventListener("message", event => {
  if (event.data.signal === "run-some-expensive-computation") {
    const result = await someExpensiveComputation(event.data.payload)

    return self.postMessage({
      signal: WebWorkerHelper.FINISHED_SIGNAL,
      payload: result,
    })
  }
})
```

# API

## `WebWorkerHelper`

### `new WebWorkerHelper(path, options)`

Constructs a new `WebWorkerHelper` instance given a `path` to a web worker script and an (optional) `options` object. These represent exactly the same arguments that are usually passed into the [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker/Worker) constructor.

### Properties

#### (static) `CANCEL_SIGNAL`

#### (static) `FINISHED_SIGNAL`

#### (static) `PROGRESS_SIGNAL`

#### (static) `START_SIGNAL`

#### `worker`

A `Worker` instance.

### Methods

#### `destroy()`

Terminates `worker`.

#### `exec(signal, payload, progress)`

Posts a message to `worker`. The worker will receive the `signal` and `payload` as properties on a `MessageEvent.data` object.

# Notes

I've been using [Parcel](https://parceljs.org/) in all of my testing, and it pairs very well with this tool. Your mileage may vary with other bundlers.
