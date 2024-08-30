const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isFunction = require("./is-function")
const isSeries = require("./is-series")

function every(x, fn) {
  if (isDataFrame(x) || isSeries(x)) {
    return every(x.values, fn)
  }

  assert(
    isArray(x),
    "The first argument passed into the `every` function must be an array, Series, or DataFrame!",
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `every` function must be a function!",
  )

  for (const v of x) {
    if (isArray(v)) {
      if (!every(v, fn)) {
        return false
      }
    } else {
      if (!fn(v)) {
        return false
      }
    }
  }

  return true
}

module.exports = every
