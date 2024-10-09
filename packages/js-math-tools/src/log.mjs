import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { vectorize } from "./vectorize.mjs"

function log(x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN

    if (typeof x === "bigint" || typeof base === "bigint") {
      const out = log(Number(x), Number(base))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
}

const vlog = vectorize(log)
export { vlog as log }
