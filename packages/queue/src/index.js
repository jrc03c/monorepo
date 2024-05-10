const makeKey = require("./make-key.js")
const pause = require("./pause.js")

class Queue {
  jobs = []
  results = {}
  interval = null
  isRunning = false
  timeBetweenJobs = 100

  constructor(timeBetweenJobs) {
    const self = this

    if (typeof timeBetweenJobs !== "undefined") {
      self.timeBetweenJobs = timeBetweenJobs
    }
  }

  append(fn) {
    const self = this
    const id = makeKey(8)
    self.jobs.push({ fn, id })
    self.start()
    return id
  }

  async retrieve(id) {
    const self = this

    while (!self.results[id]) {
      await pause(10)
    }

    return self.results[id]
  }

  async process(fn) {
    const self = this
    const id = self.append(fn)
    return await self.retrieve(id)
  }

  start() {
    const self = this
    if (self.isRunning) return
    self.isRunning = true
    let isProcessing = false

    async function process() {
      if (isProcessing) return
      isProcessing = true

      if (!self.jobs || self.jobs.length === 0) {
        return self.stop()
      }

      const job = self.jobs.shift()
      const result = await job.fn()

      if (self.results) {
        self.results[job.id] = result
      }

      isProcessing = false
    }

    process()
    self.interval = setInterval(process, self.timeBetweenJobs)
    return self
  }

  stop() {
    const self = this

    if (self.interval) {
      clearInterval(self.interval)
      self.interval = null
    }

    self.isRunning = false
    return self
  }

  destroy() {
    const self = this
    self.stop()
    self.jobs = null
    self.results = null
    self.interval = null
    self.isRunning = null
    self.timeBetweenJobs = null
    return undefined
  }
}

if (typeof module !== "undefined") {
  module.exports = Queue
}

if (typeof window !== "undefined") {
  window.Queue = Queue
}
