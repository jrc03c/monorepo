import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function sign(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return BigInt(sign(Number(x)))
    if (x < 0) return -1
    if (x > 0) return 1
    return 0
  } catch (e) {
    return NaN
  }
}

export default vectorize(sign)
