import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function tan(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.tan(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(tan)
