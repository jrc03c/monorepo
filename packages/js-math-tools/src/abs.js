import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function abs(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      return x < 0 ? -x : x
    } else {
      return Math.abs(x)
    }
  } catch (e) {
    return NaN
  }
}

export default vectorize(abs)
