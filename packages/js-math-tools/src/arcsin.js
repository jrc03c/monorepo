const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function arcsin(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.asin(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arcsin)
