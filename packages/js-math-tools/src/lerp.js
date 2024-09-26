import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function lerp(a, b, f) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(f)) return NaN

    if (typeof a === "bigint" || typeof b === "bigint") {
      const out = lerp(Number(a), Number(b), f)

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return f * (b - a) + a
  } catch (e) {
    return NaN
  }
}

export default vectorize(lerp)
