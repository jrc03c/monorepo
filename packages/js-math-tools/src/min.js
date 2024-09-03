const stats = require("./stats")

function min(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).min
}

module.exports = min
