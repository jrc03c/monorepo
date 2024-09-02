const stats = require("./stats")

function max(arr, dropNaNs) {
  return stats(arr, { dropNaNs }).max
}

module.exports = max
