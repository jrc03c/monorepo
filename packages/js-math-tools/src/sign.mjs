import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

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

const vsign = vectorize(sign)
export { vsign as sign }
