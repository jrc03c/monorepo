const {
  abs,
  dropNaN,
  isArray,
  isDataFrame,
  isNumber,
  isSeries,
  pow,
  sqrt,
  sum,
} = require("@jrc03c/js-math-tools")

function getMagnitude(x, shouldDropNaNs) {
  if (isDataFrame(x) || isSeries(x)) {
    return getMagnitude(x.values)
  }

  if (isNumber(x)) {
    return abs(x)
  }

  if (isArray(x)) {
    if (shouldDropNaNs) {
      x = dropNaN(x)
    }

    return sqrt(sum(pow(x, 2)))
  }

  return NaN
}

module.exports = getMagnitude
