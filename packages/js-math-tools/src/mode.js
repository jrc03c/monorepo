const stats = require("./stats")

function mode(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, mode: true }).mode
}

module.exports = mode
