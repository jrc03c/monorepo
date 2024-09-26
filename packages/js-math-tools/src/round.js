import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function round(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.round(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(round)
