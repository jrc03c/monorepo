class Timer {
  lastTime = new Date()
  shouldLogToConsole = true
  splits = []

  constructor(options) {
    options = options || {}

    this.shouldLogToConsole =
      typeof options.shouldLogToConsole === "undefined"
        ? this.shouldLogToConsole
        : options.shouldLogToConsole
  }

  get totalTime() {
    if (this.splits.length > 0) {
      const last = this.splits.at(-1)
      const first = this.splits[0]
      return last.start.getTime() + last.duration - first.start.getTime()
    } else {
      return 0
    }
  }

  mark(message) {
    const now = new Date()
    const duration = now - this.lastTime
    const split = { message, start: this.lastTime, duration }
    this.splits.push(split)
    this.lastTime = now

    if (this.shouldLogToConsole) {
      console.log(now, "|", duration, "ms", "|", message)
    }

    return this
  }

  start() {
    this.lastTime = new Date()
    return this
  }

  toObject() {
    return { ...this }
  }
}

export { Timer }
