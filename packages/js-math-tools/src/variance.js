const stats = require("./stats")

function variance(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, variance: true }).variance
}

module.exports = variance
