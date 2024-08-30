const stats = require("./stats")

function std(arr) {
  return stats(arr, { stdev: true }).stdev
}

module.exports = std
