const assert = require("./assert")
const flatten = require("./flatten")
const float = require("./float")
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
    let out = 0

    for (const v of temp) {
      if (typeof v === "bigint") {
        const out = sum(float(temp))

        try {
          return BigInt(out)
        } catch (e) {
          return out
        }
      }

      out += v
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = sum
