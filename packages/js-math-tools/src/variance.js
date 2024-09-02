const stats = require("./stats")

function variance(arr, dropNaNs) {
  return stats(arr, { dropNaNs, variance: true }).variance
}

module.exports = variance
