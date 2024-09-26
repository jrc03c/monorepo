import assert from "./assert.js"
import IndexMatcher from "./index-matcher.js"
import isArray from "./is-array.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"
import shape from "./shape.js"
import stats from "./stats.js"

function covariance(x, y, shouldDropNaNs, shouldAlsoReturnStatsObjects) {
  if (isSeries(x)) {
    return covariance(x.values, y, shouldDropNaNs, shouldAlsoReturnStatsObjects)
  }

  if (isSeries(y)) {
    return covariance(x, y.values, shouldDropNaNs, shouldAlsoReturnStatsObjects)
  }

  assert(
    isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
    "The `covariance` function only works on 1-dimensional arrays and Series!",
  )

  assert(
    x.length === y.length,
    "The two arrays or Series passed into the `covariance` function must have the same length!",
  )

  if (shouldDropNaNs) {
    return covariance(
      ...new IndexMatcher().fitAndTransform(x, y),
      false,
      shouldAlsoReturnStatsObjects,
    )
  }

  try {
    const xstats = stats(x, { stdev: shouldAlsoReturnStatsObjects })
    const ystats = stats(y, { stdev: shouldAlsoReturnStatsObjects })
    const mx = Number(xstats.mean)
    const my = Number(ystats.mean)

    if (!isNumber(mx) || !isNumber(my)) {
      return NaN
    }

    const n = Math.max(x.length, y.length)
    let out = 0

    for (let i = 0; i < n; i++) {
      let vx = x[i]
      let vy = y[i]

      if (!isNumber(vx)) return NaN
      if (!isNumber(vy)) return NaN

      if (typeof vx === "bigint") {
        vx = Number(vx)
      }

      if (typeof vy === "bigint") {
        vy = Number(vy)
      }

      out += (vx - mx) * (vy - my)
    }

    if (shouldAlsoReturnStatsObjects) {
      return [out / x.length, xstats, ystats]
    } else {
      return out / x.length
    }
  } catch (e) {
    return NaN
  }
}

export default covariance
