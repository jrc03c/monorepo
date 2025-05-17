class BaseClass {
  subscriptions = {}

  copy() {
    const out = new this.constructor(this.toObject())
    const channels = Object.keys(this.subscriptions)

    for (const channel of channels) {
      out.subscriptions[channel] = []

      for (let i = 0; i < this.subscriptions[channel].length; i++) {
        out.subscriptions[channel].push(this.subscriptions[channel][i])
      }
    }

    return out
  }

  emit() {
    const args = Array.from(arguments)
    const channel = args[0]
    const payload = args.slice(1)
    const callbacks = this.subscriptions[channel]

    if (callbacks) {
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](...payload)
      }
    }

    return this
  }

  off(channel, callback) {
    if (typeof channel !== "string") {
      throw new Error(
        `The first argument passed into a \`${this.constructor.name}\` instance's \`off\` method must be a string representing an event name!`,
      )
    }

    if (typeof callback !== "function") {
      throw new Error(
        `The second argument passed into a \`${this.constructor.name}\` instance's \`off\` method must be a callback function!`,
      )
    }

    if (this.subscriptions[channel]) {
      const index = this.subscriptions[channel].indexOf(callback)

      if (index > -1) {
        this.subscriptions[channel].splice(index, 1)
      }
    }

    return this
  }

  on(channel, callback) {
    if (typeof channel !== "string") {
      throw new Error(
        `The first argument passed into a \`${this.constructor.name}\` instance's \`on\` method must be a string representing an event name!`,
      )
    }

    if (typeof callback !== "function") {
      throw new Error(
        `The second argument passed into a \`${this.constructor.name}\` instance's \`on\` method must be a callback function!`,
      )
    }

    if (!this.subscriptions[channel]) {
      this.subscriptions[channel] = []
    }

    this.subscriptions[channel].push(callback)
    return () => this.off(channel, callback)
  }

  toObject() {
    return {}
  }
}

export { BaseClass }
