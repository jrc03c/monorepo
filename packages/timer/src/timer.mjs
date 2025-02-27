import { TimerEvent } from "./timer-event.mjs"

class Timer {
  events = []
  shouldLogToConsole = true

  constructor(options) {
    options = options || {}

    this.events = options.events
      ? options.events.map(e => new TimerEvent(e))
      : this.events

    this.shouldLogToConsole =
      typeof options.shouldLogToConsole === "undefined"
        ? this.shouldLogToConsole
        : options.shouldLogToConsole
  }

  get totalTime() {
    let firstTime = Infinity
    let lastTime = -Infinity

    this.events.forEach(event => {
      if (event.timer === this) {
        return
      }

      const start = event.start.getTime()
      const stop = start + event.duration

      if (start < firstTime) {
        firstTime = start
      }

      if (stop > lastTime) {
        lastTime = stop
      }
    })

    return lastTime - firstTime
  }

  start(name) {
    const now = new Date()

    const event = new TimerEvent({
      name,
      start: now,
      timer: this,
    })

    if (this.shouldLogToConsole) {
      console.log(`${now.toLocaleString()} | START: ${name}`)
    }

    this.events.push(event)
    return event
  }

  stop(event) {
    event =
      event instanceof TimerEvent
        ? event
        : this.events.find(e => e.name === event && e.timer === this)

    if (!event) {
      throw new Error(`No running event with name "${event}" could be found!`)
    }

    event.timer = null
    event.stop()

    if (this.shouldLogToConsole) {
      console.log(
        `${new Date().toLocaleString()} | STOP: ${event.name} (duration: ${
          event.duration
        } ms)`,
      )
    }

    return this
  }

  stopAll() {
    for (const event of this.events) {
      if (event.timer === this) {
        this.stop(event)
      }
    }

    return this
  }

  toObject() {
    return {
      events: this.events.map(e => e.toObject()),
      shouldLogToConsole: this.shouldLogToConsole,
    }
  }
}

export { Timer }
