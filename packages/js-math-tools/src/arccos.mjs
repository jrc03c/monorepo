import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function arccos(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.acos(x)
  } catch (e) {
    return NaN
  }
}

const varccos = vectorize(arccos)
export { varccos as arccos }
