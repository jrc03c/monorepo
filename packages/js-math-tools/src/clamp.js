const int = require("./int")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function clamp(x, a, b) {
  try {
    if (!isNumber(x)) return NaN
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN

    if (typeof x === "bigint") {
      return BigInt(clamp(int(x), a, b))
    }

    if (x < a) return a
    if (x > b) return b
    return x
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(clamp)
