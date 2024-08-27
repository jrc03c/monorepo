const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function sum(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return sum(arr.values)
  }

  assert(
    isArray(arr),
    "The `sum` function only works on arrays, Series, and DataFrames!",
  )

  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    let resultShouldBeABigInt = false
    let out = 0

    for (let v of temp) {
      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = Number(v)
      }

      out += v
    }

    if (resultShouldBeABigInt) {
      try {
        return BigInt(out)
      } catch (e) {}
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = sum
