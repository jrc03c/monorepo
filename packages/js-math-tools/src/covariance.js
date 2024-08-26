const assert = require("./assert")
const float = require("./float")
const isArray = require("./is-array")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const mean = require("./mean")
const shape = require("./shape")

function covariance(x, y) {
  if (isSeries(x)) {
    return covariance(x.values, y)
  }

  if (isSeries(y)) {
    return covariance(x, y.values)
  }

  assert(
    isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
    "The `covariance` function only works on 1-dimensional arrays and Series!",
  )

  assert(
    x.length === y.length,
    "The two arrays or Series passed into the `covariance` function must have the same length!",
  )

  try {
    const mx = float(mean(x))
    const my = float(mean(y))

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
        vx = float(vx)
      }

      if (typeof vy === "bigint") {
        vy = float(vy)
      }

      out += (vx - mx) * (vy - my)
    }

    return out / x.length
  } catch (e) {
    return NaN
  }
}

module.exports = covariance
