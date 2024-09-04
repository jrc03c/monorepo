const isInteger = require("./is-integer")

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

module.exports = isWholeNumber
