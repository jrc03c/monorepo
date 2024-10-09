import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function mod(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (typeof a === "bigint" || typeof b === "bigint") {
      const out = mod(Number(a), Number(b))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return a % b
  } catch (e) {
    return NaN
  }
}

const vmod = vectorize(mod)
export { vmod as mod }
