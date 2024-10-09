import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function arcsin(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.asin(x)
  } catch (e) {
    return NaN
  }
}

const varcsin = vectorize(arcsin)
export { varcsin as arcsin }
