const assert = require("./assert")
const flatten = require("./flatten")
const float = require("./float")
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
    let out = 0

    for (const v of temp) {
      if (typeof v === "bigint") {
        const out = mean(float(temp))

        try {
          return BigInt(out)
        } catch (e) {
          return out
        }
      }

      out += v
    }

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean
