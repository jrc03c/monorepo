const stats = require("./stats")

function median(arr) {
  return stats(arr, { median: true }).median
}

module.exports = median
