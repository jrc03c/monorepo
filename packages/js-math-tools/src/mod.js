import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function mod(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (typeof a === "bigint" || typeof b === "bigint") {
      const out = mod(Number(a), Number(b))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return a % b
  } catch (e) {
    return NaN
  }
}

export default vectorize(mod)
