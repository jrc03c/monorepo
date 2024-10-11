import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function arctan(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.atan(x)
  } catch (e) {
    return NaN
  }
}

const varctan = vectorize(arctan)
export { varctan as arctan }
