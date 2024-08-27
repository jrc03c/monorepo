const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function pow(x, p) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(p)) return NaN

    if (typeof x === "bigint" || typeof p === "bigint") {
      const out = pow(Number(x), Number(p))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.pow(x, p)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(pow)
