import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

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

export default vectorize(multiply)
