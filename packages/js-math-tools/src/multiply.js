const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

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
        v = float(v)
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

module.exports = vectorize(multiply)
