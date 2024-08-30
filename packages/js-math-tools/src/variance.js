const stats = require("./stats")

function variance(arr) {
  return stats(arr, { variance: true }).variance
}

module.exports = variance
