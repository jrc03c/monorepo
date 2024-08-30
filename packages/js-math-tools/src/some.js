const assert = require("./assert")
const isArray = require("./is-array")
const isFunction = require("./is-function")

function some(x, fn) {
  assert(
    isArray(x),
    "The first argument passed into the `some` function must be an array, Series, or DataFrame!",
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `some` function must be a function!",
  )

  for (const v of x) {
    if (isArray(v)) {
      if (some(v, fn)) {
        return true
      }
    } else {
      if (fn(v)) {
        return true
      }
    }
  }

  return false
}

module.exports = some
