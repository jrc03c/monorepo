const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")

function product(arr, shouldDropNaNs) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return product(arr.values)
  }

  assert(
    isArray(arr),
    "The `product` function only works on arrays, Series, and DataFrames!",
  )

  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    let resultShouldBeABigInt = false
    let out = 1

    for (let v of temp) {
      if (!isNumber(v)) {
        if (shouldDropNaNs) {
          v = 1
        } else {
          return NaN
        }
      }

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = Number(v)
      }

      out *= v
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

module.exports = product
