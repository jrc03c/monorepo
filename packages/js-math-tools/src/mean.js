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

    for (const v of temp) {
      if (typeof v === "bigint") {
        return mean(float(temp))
      }
    }

    let out = 0

    temp.forEach(v => {
      out += v
    })

    return out / temp.length
  } catch (e) {
    return NaN
  }
}

module.exports = mean
