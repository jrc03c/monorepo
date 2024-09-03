const stats = require("./stats")

function median(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, median: true }).median
}

module.exports = median
