import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function floor(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      return x
    }

    return Math.floor(x)
  } catch (e) {
    return NaN
  }
}

const vfloor = vectorize(floor)
export { vfloor as floor }
