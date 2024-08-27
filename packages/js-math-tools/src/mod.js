const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function mod(a, b) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (typeof a === "bigint" || typeof b === "bigint") {
      const out = mod(Number(a), Number(b))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return a % b
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(mod)
