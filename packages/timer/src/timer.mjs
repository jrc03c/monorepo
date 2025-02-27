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
    let firstEvent = this.events[0]
    let lastEvent = this.events[0]

    this.events.forEach(event => {
      if (event.start < firstEvent.start) {
        firstEvent = event
      }

      if (event.start + event.duration > lastEvent.start + lastEvent.duration) {
        lastEvent = event
      }
    })

    return lastEvent.start + lastEvent.duration - firstEvent.start
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
