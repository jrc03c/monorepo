import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

function multiply() {
  try {
    const x = Object.values(arguments)
    if (x.length === 0) return NaN

    let resultShouldBeABigInt = false
    let out = 1

    for (let v of x) {
      if (!isNumber(v)) return NaN

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = Number(v)
      }

      out *= v
    }

    if (resultShouldBeABigInt) {
      try {
        return BigInt(out)
      } catch (e) {}
    }

    return out
  } catch (e) {
    return NaN
  }
}

const vmultiply = vectorize(multiply)
export { vmultiply as multiply }
