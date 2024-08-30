const stats = require("./stats")

function mode(arr) {
  return stats(arr, { mode: true }).mode
}

module.exports = mode
