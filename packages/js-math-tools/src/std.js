const stats = require("./stats")

function std(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, stdev: true }).stdev
}

module.exports = std
