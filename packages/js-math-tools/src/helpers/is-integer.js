const isNumber = require("../is-number")

function isInteger(x) {
  return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x)
}

module.exports = isInteger
