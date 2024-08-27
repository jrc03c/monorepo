const assert = require("./assert")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const mean = require("./mean")

function variance(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return variance(arr.values)
  }

  assert(
    isArray(arr),
    "The `variance` function only works on arrays, Series, and DataFrames!",
  )

  try {
    const temp = flatten(arr)
    const m = Number(mean(temp))
    if (!isNumber(m)) return NaN

    let out = 0

    for (let v of temp) {
      if (!isNumber(v)) return NaN
      if (typeof v === "bigint") v = Number(v)
      out += (v - m) * (v - m)
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = variance
