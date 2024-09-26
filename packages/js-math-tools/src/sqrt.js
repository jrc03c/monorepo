import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      const out = sqrt(Number(x))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(sqrt)
