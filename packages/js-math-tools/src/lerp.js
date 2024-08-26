const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function lerp(a, b, f) {
  try {
    if (!isNumber(a)) return NaN
    if (!isNumber(b)) return NaN
    if (!isNumber(f)) return NaN

    if (typeof a === "bigint" || typeof b === "bigint") {
      const out = lerp(float(a), float(b), f)

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return f * (b - a) + a
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(lerp)
