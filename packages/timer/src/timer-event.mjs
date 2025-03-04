class TimerEvent {
  duration = -1
  name = "Untitled timer event"
  start = new Date()
  timer = null

  constructor(options) {
    options = options || {}

    this.duration =
      typeof options.duration === "undefined"
      ? this.duration
      : options.duration

    this.name = options.name || this.name
    this.start = options.start || this.start
    this.timer = options.timer || this.timer

    if (typeof this.start === "number") {
      this.start = new Date(this.start)
    }
  }

  stop() {
    if (this.timer) {
      this.timer.stop(this)
    } else {
      this.duration = new Date() - this.start
    }

    return this
  }

  toObject() {
    const start = this.start.getTime()

    return {
      duration: this.duration,
      name: this.name,
      start,
      stop: start + this.duration,
    }
  }
}

export { TimerEvent }
