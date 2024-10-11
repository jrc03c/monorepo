import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function float(x) {
  try {
    if (x === "Infinity") {
      return Infinity
    }

    if (x === "-Infinity") {
      return -Infinity
    }

    const out = JSON.parse(x)
    if (isNumber(out)) return out
    return NaN
  } catch (e) {
    return NaN
  }
}

const vfloat = vectorize(float)
export { vfloat as float }
