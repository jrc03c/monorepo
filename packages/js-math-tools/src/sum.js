const stats = require("./stats")

function sum(arr, dropNaNs) {
  return stats(arr, { dropNaNs }).sum
}

module.exports = sum
