const stats = require("./stats")

function sum(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).sum
}

module.exports = sum
