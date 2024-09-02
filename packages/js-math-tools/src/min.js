const stats = require("./stats")

function min(arr, dropNaNs) {
  return stats(arr, { dropNaNs }).min
}

module.exports = min
