const stats = require("./stats")

function sum(arr) {
  return stats(arr).sum
}

module.exports = sum
