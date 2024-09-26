import isArray from "./is-array.js"
import isNumber from "./is-number.js"
import isUndefined from "./is-undefined.js"
import stats from "./stats.js"
import vectorize from "./vectorize.js"

const helper = vectorize((x, a, b, c, d) => {
  try {
    let resultShouldBeABigInt = false

    for (const v of [x, a, b, c, d]) {
      if (!isNumber(v)) {
        return NaN
      }

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
      }
    }

    if (resultShouldBeABigInt) {
      x = Number(x)
      a = Number(a)
      b = Number(b)
      c = Number(c)
      d = Number(d)
    }

    const num = (d - c) * (x - a)
    const den = b - a

    if (den === 0) return NaN

    const out = num / den + c

    if (resultShouldBeABigInt) {
      try {
        return BigInt(out)
      } catch (e) {}
    }

    return out
  } catch (e) {
    return NaN
  }
})

function remap(x, a, b, c, d) {
  if (isArray(x) && isUndefined(c) && isUndefined(d)) {
    c = a
    d = b

    const results = stats(x)
    a = results.min
    b = results.max
  }

  return helper(x, a, b, c, d)
}

export default remap
