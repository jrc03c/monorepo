const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function exp(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      if (x === 0n) {
        return 1n
      } else {
        x = Number(x)
      }
    }

    return Math.exp(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(exp)
