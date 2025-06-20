import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isDataFrame } from "../is-dataframe.mjs"
import { isFunction } from "../is-function.mjs"
import { isSeries } from "../is-series.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"

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
    return map(this.values, v => this.get(v))
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
    return map(this.values, v => ({ value: v, count: this.get(v) }))
  }

  toObject() {
    const out = {}

    forEach(this.values, value => {
      out[value] = this.get(value)
    })

    return out
  }
}

export { Counter }
