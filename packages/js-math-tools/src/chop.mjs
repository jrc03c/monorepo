import { abs } from "./abs.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { vectorize } from "./vectorize.mjs"

function chop(x, threshold) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x

    if (isUndefined(threshold)) {
      threshold = 1e-10
    } else if (!isNumber(threshold)) {
      return NaN
    }

    return abs(x) < threshold ? 0 : x
  } catch (e) {
    return NaN
  }
}

const vchop = vectorize(chop)
export { vchop as chop }
