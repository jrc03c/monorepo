const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function round(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.round(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(round)
