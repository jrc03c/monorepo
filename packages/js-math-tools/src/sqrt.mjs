import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      const out = sqrt(Number(x))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

const vsqrt = vectorize(sqrt)
export { vsqrt as sqrt }
