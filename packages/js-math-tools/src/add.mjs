import { isNumber } from "./is-number.mjs"
import { vectorize } from "./vectorize.mjs"

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

const vadd = vectorize(add)
export { vadd as add }
