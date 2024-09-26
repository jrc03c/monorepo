import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

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

export default vectorize(float)
