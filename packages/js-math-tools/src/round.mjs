import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function round(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.round(x)
  } catch (e) {
    return NaN
  }
}

const vround = vectorize(round)
export { vround as round }
