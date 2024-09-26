import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function arccos(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.acos(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(arccos)
