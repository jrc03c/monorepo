const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function sqrt(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      const out = sqrt(float(x))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.sqrt(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sqrt)
