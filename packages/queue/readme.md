# Intro

`queue` is a simple queueing tool for JS.

# Installation

```bash
npm install --save https://github.com/jrc03c/queue
```

# Usage

Node / bundlers:

```js
const Queue = require("@jrc03c/queue")
```

Browser:

```html
<script src="path/to/dist/queue.js"></script>
```

Then:

```js
async function run(){
  const timeBetweenJobs = 1000
  const queue = new Queue(timeBetweenJobs)

  // Option 1: `append` an async function to the queue, which returns an ID; then
  // `retrieve` the result using the ID later.
  const id1 = queue.append(async () => {
    const response = await fetch(...)
    return await response.json()
  })

  const result1 = await queue.retrieve(id)

  // Option 2: Do both steps using the single `process` function.
  const result2 = await queue.process(async () => {
    const response = await fetch(...)
    return await response.json()
  })
}

run()
```

# API

## `Queue`

The `Queue` class is the primary tool in this library. As you `append` jobs (i.e., asynchronous functions) to the queue, the queue processes them one-at-a-time, in order, with a short pause after each job is finished.

### Properties

#### `jobs`

An array of "jobs" where each job is a dictionary containing `id` and `fn` properties.

#### `results`

A dictionary of ID-value pairs.

#### `interval`

The thing returned from `setInterval` when `.start()` is called.

#### `isRunning`

A boolean indicating whether or not the queue is actively processing jobs.

#### `timeBetweenJobs`

A number indicating a time in milliseconds to wait after each job finishes before starting the next job.

### Methods

#### `new Queue(timeBetweenJobs=100)`

The only argument to the `Queue` constructor is the amount of time (in milliseconds) to wait between jobs. The default value is 100 milliseconds.

#### `.append(asyncFunction)`

Appends an asynchronous function to the list of jobs to process and returns an ID that points to that job.

#### `.retrieve(ID)`

Returns a `Promise` that resolves to the output of the job.

#### `.process(asyncFunction)`

Returns a `Promise` that resolves to the output of the job. This function is exactly like calling `.append(asyncFunction)` and then `.retrieve(ID)`.

#### `.start()`

Starts the processing of the list of jobs. Normally, this doesn't need to be called manually; it's called automatically as soon as a job is appended to the list of jobs.

#### `.stop()`

Stops the processing of the list of jobs. Any jobs that are being processed when this method is called will _not_ be stopped; they will finish as usual and store their results. Normally, this doesn't need to be called manually; it's called automatically as soon as the job list becomes empty.

#### `.destroy()`

Stops the processing of the list of jobs and then sets all properties to `null`.
