const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")
const vectorize = require("./vectorize")

function log(x, base) {
  try {
    base = isUndefined(base) ? Math.E : base
    if (!isNumber(x)) return NaN
    if (!isNumber(base)) return NaN

    if (typeof x === "bigint" || typeof base === "bigint") {
      const out = log(Number(x), Number(base))

      try {
        return BigInt(out)
      } catch (e) {
        return out
      }
    }

    return Math.log(x) / Math.log(base)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(log)
