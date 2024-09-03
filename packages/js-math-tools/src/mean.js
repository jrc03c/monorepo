const stats = require("./stats")

function mean(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).mean
}

module.exports = mean
