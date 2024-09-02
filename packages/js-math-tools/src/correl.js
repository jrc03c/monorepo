const assert = require("./assert")
const covariance = require("./covariance")
const isArray = require("./is-array")
const isSeries = require("./is-series")
const shape = require("./shape")

function correl(x, y, shouldDropNaNs) {
  if (isSeries(x)) {
    return correl(x.values, y)
  }

  if (isSeries(y)) {
    return correl(x, y.values)
  }

  assert(
    isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
    "The `correl` function only works on 1-dimensional arrays and Series!",
  )

  assert(
    x.length === y.length,
    "The two arrays or Series passed into the `correl` function must have the same length!",
  )

  try {
    const shouldAlsoReturnStatsObjects = true

    const [num, xstats, ystats] = covariance(
      x,
      y,
      shouldDropNaNs,
      shouldAlsoReturnStatsObjects,
    )

    const den = xstats.stdev * ystats.stdev
    return num / den
  } catch (e) {
    return NaN
  }
}

module.exports = correl
