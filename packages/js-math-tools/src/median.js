const stats = require("./stats")

function median(arr, dropNaNs) {
  return stats(arr, { dropNaNs, median: true }).median
}

module.exports = median
