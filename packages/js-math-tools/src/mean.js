const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")

function mean(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return mean(arr.values)
  }

  assert(
    isArray(arr),
    "The `mean` function only works on arrays, Series, and DataFrames!",
  )

  try {
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
        return BigInt(out / temp.length)
      } catch (e) {}
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean
