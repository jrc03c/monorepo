class BaseClass {
  subscriptions = {}

  copy() {
    const out = new this.constructor(this.toObject())

    Object.keys(this.subscriptions).forEach(channel => {
      out.subscriptions[channel] = this.subscriptions[channel].slice()
    })

    return out
  }

  emit(channel, payload) {
    if (this.subscriptions[channel]) {
      this.subscriptions[channel].forEach(callback => {
        callback(payload)
      })
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

    return undefined
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

if (typeof module !== "undefined") {
  module.exports = BaseClass
}

if (typeof window !== "undefined") {
  window.BaseClass = BaseClass
}
