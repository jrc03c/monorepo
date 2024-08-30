const stats = require("./stats")

function min(arr) {
  return stats(arr).min
}

module.exports = min
