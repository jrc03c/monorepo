import assert from "./assert.js"
import covariance from "./covariance.js"
import isArray from "./is-array.js"
import isSeries from "./is-series.js"
import shape from "./shape.js"

function correl(x, y, shouldDropNaNs) {
  if (isSeries(x)) {
    return correl(x.values, y, shouldDropNaNs)
  }

  if (isSeries(y)) {
    return correl(x, y.values, shouldDropNaNs)
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

export default correl
