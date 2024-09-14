const isArray = require("../is-array")
const isDataFrame = require("../is-dataframe")
const isFunction = require("../is-function")
const isSeries = require("../is-series")
const isUndefined = require("../is-undefined")

// NOTE: a lot of this code was copied from the `set` function, so it might be
// good to extract out some of the shared functionality

function makeKey(n) {
  const alpha = "abcdefg1234567890"
  let out = ""
  while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)]
  return out
}

const NULL_KEY = makeKey(16)
const UNDEFINED_KEY = makeKey(16)
const INFINITY_KEY = makeKey(16)
const MINUS_INFINITY_KEY = makeKey(16)
const SYMBOL_KEY = makeKey(16)

class Counter {
  constructor() {
    this.clear()
  }

  get counts() {
    return this.values.map(v => this.get(v))
  }

  get values() {
    return Object.values(this.valuesDict)
  }

  clear() {
    this.countsDict = {}
    this.valuesDict = {}
    return this
  }

  count(x) {
    for (const v of x) {
      if (isArray(v)) {
        this.count(v)
      } else {
        this.increment(v)
      }
    }

    return this
  }

  delete(value) {
    const key = this.getStandardizedKey(value)
    delete this.countsDict[key]
    delete this.valuesDict[key]
    return this
  }

  get(value) {
    return this.countsDict[this.getStandardizedKey(value)] || 0
  }

  getStandardizedKey(value) {
    // prettier-ignore
    return typeof value === "object" && value === null
      ? NULL_KEY
      : isUndefined(value)
      ? UNDEFINED_KEY
      : isFunction(value)
      ? value.toString()
      : typeof value === "symbol"
      ? value.toString() + " - " + SYMBOL_KEY
      : value === Infinity
      ? INFINITY_KEY
      : value === -Infinity
      ? MINUS_INFINITY_KEY
      : typeof value === "bigint"
      ? value.toString()
      : isDataFrame(value)
      ? value.toJSONString()
      : isSeries(value)
      ? JSON.stringify(value.toObject())
      : JSON.stringify(value)
  }

  has(value) {
    return !isUndefined(this.countsDict[this.getStandardizedKey(value)])
  }

  increment(value) {
    return this.set(value, this.get(value) + 1)
  }

  set(value, count) {
    const key = this.getStandardizedKey(value)
    this.countsDict[key] = count
    this.valuesDict[key] = value
    return this
  }

  toArray() {
    return this.values.map(v => ({ value: v, count: this.get(v) }))
  }

  toObject() {
    const out = {}

    this.values.forEach(value => {
      out[value] = this.get(value)
    })

    return out
  }
}

module.exports = Counter
