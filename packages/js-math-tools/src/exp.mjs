import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function exp(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      if (x === 0n) {
        return 1n
      } else {
        x = Number(x)
      }
    }

    return Math.exp(x)
  } catch (e) {
    return NaN
  }
}

const vexp = vectorize(exp)
export { vexp as exp }
