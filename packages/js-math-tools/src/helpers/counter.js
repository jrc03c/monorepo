const isEqual = require("../is-equal")

class Counter {
  constructor() {
    this.clear()
  }

  get counts() {
    return this.values.map(v => this.dict.get(v))
  }

  get values() {
    return Array.from(this.dict.keys())
  }

  clear() {
    this.dict = new Map()
    return this
  }

  count(x) {
    for (const v of x) {
      this.increment(v)
    }

    return this
  }

  delete(value) {
    this.dict.delete(this.getOriginalValue(value))
    return this
  }

  get(value) {
    return this.dict.get(this.getOriginalValue(value)) || 0
  }

  getOriginalValue(value) {
    if (this.dict.has(value)) {
      return value
    }

    if (typeof value === "object" && value !== null) {
      const other = this.values.find(other => isEqual(other, value))

      if (other) {
        return other
      }
    }

    return value
  }

  has(value) {
    return (
      this.dict.has(value) ||
      (typeof value === "object" &&
        value !== null &&
        !!this.values.find(other => isEqual(other, value)))
    )
  }

  increment(value) {
    return this.set(value, this.get(value) + 1)
  }

  set(value, count) {
    this.dict.set(this.getOriginalValue(value), count)
    return this
  }

  toArray() {
    return this.values.map(v => ({ value: v, count: this.dict.get(v) }))
  }

  toObject() {
    const out = {}

    this.values.forEach(value => {
      out[value] = this.dict.get(value)
    })

    return out
  }
}

module.exports = Counter
