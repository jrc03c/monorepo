import assert from "./assert.js"
import flatten from "./flatten.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isFunction from "./is-function.js"
import isSeries from "./is-series.js"
import isUndefined from "./is-undefined.js"

function makeKey(n) {
  const alpha = "abcdefg1234567890"
  let out = ""
  while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)]
  return out
}

const NULL_KEY = makeKey(256)
const UNDEFINED_KEY = makeKey(256)
const INFINITY_KEY = makeKey(256)
const MINUS_INFINITY_KEY = makeKey(256)
const SYMBOL_KEY = makeKey(256)

function set(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return set(arr.values)
  }

  assert(
    isArray(arr),
    "The `set` function only works on arrays, Series, and DataFrames!",
  )

  const out = []
  const temp = {}

  flatten(arr).forEach(item => {
    // prettier-ignore
    const key =
      typeof item === "object" && item === null
        ? NULL_KEY
        : isUndefined(item)
        ? UNDEFINED_KEY
        : isFunction(item)
        ? item.toString()
        : typeof item === "symbol"
        ? item.toString() + " - " + SYMBOL_KEY
        : item === Infinity
        ? INFINITY_KEY
        : item === -Infinity
        ? MINUS_INFINITY_KEY
        : typeof item === "bigint"
        ? item.toString()
        : isDataFrame(item)
        ? item.toJSONString()
        : isSeries(item)
        ? JSON.stringify(item.toObject())
        : JSON.stringify(item)

    if (!temp[key]) out.push(item)
    temp[key] = true
  })

  return out
}

export default set
