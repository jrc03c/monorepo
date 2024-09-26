import isNumber from "./is-number.js"
import isUndefined from "./is-undefined.js"
import vectorize from "./vectorize.js"

function log(x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN

    if (typeof x === "bigint" || typeof base === "bigint") {
      const out = log(Number(x), Number(base))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
}

export default vectorize(log)
