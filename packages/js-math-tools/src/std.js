const stats = require("./stats")

function std(arr, dropNaNs) {
  return stats(arr, { dropNaNs, stdev: true }).stdev
}

module.exports = std
