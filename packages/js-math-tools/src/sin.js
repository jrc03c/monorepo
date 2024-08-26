const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function sin(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = float(x)
    }

    return Math.sin(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(sin)
