const stats = require("./stats")

function max(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).max
}

module.exports = max
