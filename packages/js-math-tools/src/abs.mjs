import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function abs(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      return x < 0 ? -x : x
    } else {
      return Math.abs(x)
    }
  } catch (e) {
    return NaN
  }
}

const vabs = vectorize(abs)
export { vabs as abs }
