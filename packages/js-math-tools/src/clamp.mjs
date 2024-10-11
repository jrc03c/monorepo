import { int } from "./int.mjs"
import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function clamp(x, a, b) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (typeof x === "bigint") {
      return BigInt(clamp(int(x), a, b))
    }

    if (x < a) return a
    if (x > b) return b
    return x
  } catch (e) {
    return NaN
  }
}

const vclamp = vectorize(clamp)
export { vclamp as clamp }
