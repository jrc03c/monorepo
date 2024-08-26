const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function ceil(x) {
  try {
    if (!isNumber(x)) return NaN
    if (typeof x === "bigint") return x
    return Math.ceil(x)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(ceil)
