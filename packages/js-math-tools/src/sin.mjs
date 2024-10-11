import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function sin(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.sin(x)
  } catch (e) {
    return NaN
  }
}

const vsin = vectorize(sin)
export { vsin as sin }
