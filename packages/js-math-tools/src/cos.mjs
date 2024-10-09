import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function cos(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.cos(x)
  } catch (e) {
    return NaN
  }
}

const vcos = vectorize(cos)
export { vcos as cos }
