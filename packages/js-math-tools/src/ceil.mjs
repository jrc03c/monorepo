import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function ceil(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
}

const vceil = vectorize(ceil)
export { vceil as ceil }
