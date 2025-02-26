import { isWholeNumber } from "../utils/is-whole-number.mjs"

class WordCountMap extends Map {
  constructor(data) {
    super()
    data = data || {}

    Object.keys(data).forEach(key => {
      this.set(key, data[key])
    })
  }

  delete(key) {
    if (typeof key !== "string") {
      throw new Error(
        `The \`delete\` method of a \`WordCountMap\` instance can only accept keys that are strings!`,
      )
    }

    return super.delete(key)
  }

  get(key) {
    if (typeof key !== "string") {
      throw new Error(
        `The \`get\` method of a \`WordCountMap\` instance can only accept keys that are strings!`,
      )
    }

    return super.get(key)
  }

  has(key) {
    if (typeof key !== "string") {
      throw new Error(
        `The \`has\` method of a \`WordCountMap\` instance can only accept keys that are strings!`,
      )
    }

    return super.has(key)
  }

  set(key, value) {
    if (typeof key !== "string") {
      throw new Error(
        `The \`set\` method of a \`WordCountMap\` instance can only accept keys that are strings!`,
      )
    }

    if (!isWholeNumber(value)) {
      throw new Error(
        `The \`set\` method of a \`WordCountMap\` instance can only accept values that are whole numbers (i.e., non-negative integers)!`,
      )
    }

    return super.set(key, value)
  }

  stringify() {
    return JSON.stringify(this.toObject(), ...arguments)
  }

  toObject() {
    const out = {}

    Array.from(this.keys()).forEach(key => {
      out[key] = this.get(key)
    })

    return out
  }
}

export { WordCountMap }
