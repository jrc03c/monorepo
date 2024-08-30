const stats = require("./stats")

function max(arr) {
  return stats(arr).max
}

module.exports = max
