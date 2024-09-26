import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function floor(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      return x
    }

    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(floor)
