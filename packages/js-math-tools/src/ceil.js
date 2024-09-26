import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function ceil(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
}

export default vectorize(ceil)
