const stats = require("./stats")

function mode(arr, dropNaNs) {
  return stats(arr, { dropNaNs, mode: true }).mode
}

module.exports = mode
