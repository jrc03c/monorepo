const stats = require("./stats")

function mean(arr, dropNaNs) {
  return stats(arr, { dropNaNs }).mean
}

module.exports = mean
