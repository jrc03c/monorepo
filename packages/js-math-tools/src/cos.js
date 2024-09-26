import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function cos(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.cos(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(cos)
