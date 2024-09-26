import isNumber from "./is-number.js"
import vectorize from "./vectorize.js"

function add() {
  try {
    let out = 0
    let resultShouldBeABigInt = false
    const x = Object.values(arguments)

    for (let v of x) {
      if (!isNumber(v)) return NaN

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = Number(v)
      }

      out += v
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

export default vectorize(add)
