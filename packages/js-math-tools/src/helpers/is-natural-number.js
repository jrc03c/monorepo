const isInteger = require("./is-integer")

function isNaturalNumber(x) {
  return isInteger(x) && x > 0
}

module.exports = isNaturalNumber
