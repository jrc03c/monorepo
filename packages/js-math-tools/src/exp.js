import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function exp(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      if (x === 0n) {
        return 1n
      } else {
        x = Number(x)
      }
    }

    return Math.exp(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(exp)
