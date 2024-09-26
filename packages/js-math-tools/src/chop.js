import abs from "./abs.js"
import isNumber from "./is-number.js"
import isUndefined from "./is-undefined.js"
import vectorize from "./vectorize.js"

function chop(x, threshold) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x

    if (isUndefined(threshold)) {
      threshold = 1e-10
    } else if (!isNumber(threshold)) {
      return NaN
    }

    return abs(x) < threshold ? 0 : x
  } catch (e) {
    return NaN
  }
}

export default vectorize(chop)
