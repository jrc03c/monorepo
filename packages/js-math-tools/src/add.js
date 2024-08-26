const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function add() {
  try {
    let out = 0
    let resultShouldBeABigInt = false
    const x = Object.values(arguments)

    for (let v of x) {
      if (!isNumber(v)) return NaN

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = float(v)
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

module.exports = vectorize(add)
