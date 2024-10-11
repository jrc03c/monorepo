import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function tan(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.tan(x)
  } catch (e) {
    return NaN
  }
}

const vtan = vectorize(tan)
export { vtan as tan }
