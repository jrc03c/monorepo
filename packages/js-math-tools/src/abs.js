const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function abs(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      return x < 0 ? -x : x
    } else {
      return Math.abs(x)
    }
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(abs)
