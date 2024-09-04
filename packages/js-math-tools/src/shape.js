const assert = require("./assert")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function helper(x) {
  if (isArray(x)) {
    const childShapes = helper(x[0])
    return [x.length].concat(childShapes || [])
  } else {
    return undefined
  }
}

function shape(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return shape(x.values)
  }

  assert(
    isArray(x),
    "The `shape` function only works on arrays, Series, and DataFrames!",
  )

  return helper(x)
}

module.exports = shape
