const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function arccos(x) {
  try {
    if (!isNumber(x)) return NaN

    if (typeof x === "bigint") {
      x = Number(x)
    }

    return Math.acos(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(arccos)
