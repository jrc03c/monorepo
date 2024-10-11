import { isArray } from "./is-array.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { stats } from "./stats.mjs"
import { vectorize } from "./vectorize.mjs"

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

export { remap }
