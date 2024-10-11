import { makeKey } from "@jrc03c/make-key"
import { pause } from "@jrc03c/pause"

class Queue {
  interval = null
  isRunning = false
  jobs = []
  results = {}
  timeBetweenJobs = 100

  constructor(timeBetweenJobs) {
    this.timeBetweenJobs =
      typeof timeBetweenJobs === "undefined"
        ? this.timeBetweenJobs
        : timeBetweenJobs
  }

  append(fn) {
    const id = makeKey(8)
    this.jobs.push({ fn, id })
    this.start()
    return id
  }

  async retrieve(id) {
    while (!this.results[id]) {
      await pause(10)
    }

    return this.results[id]
  }

  async process(fn) {
    const id = this.append(fn)
    return await this.retrieve(id)
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    let isProcessing = false

    const process = async () => {
      if (isProcessing) return
      isProcessing = true

      if (!this.jobs || this.jobs.length === 0) {
        return this.stop()
      }

      const job = this.jobs.shift()
      const result = await job.fn()

      if (this.results) {
        this.results[job.id] = result
      }

      isProcessing = false
    }

    process()
    this.interval = setInterval(process, this.timeBetweenJobs)
    return this
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    this.isRunning = false
    return this
  }

  destroy() {
    this.stop()
    this.jobs = null
    this.results = null
    this.interval = null
    this.isRunning = null
    this.timeBetweenJobs = null
    return undefined
  }
}

if (typeof window !== "undefined") {
  window.Queue = Queue
}

export { Queue }
