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

function getMagnitude(x, shouldIgnoreNaNs) {
  if (isDataFrame(x) || isSeries(x)) {
    return getMagnitude(x.values)
  }

  if (isNumber(x)) {
    return abs(x)
  }

  if (isArray(x)) {
    if (shouldIgnoreNaNs) {
      x = dropNaN(x)
    }

    return sqrt(sum(pow(x, 2)))
  }

  return NaN
}

module.exports = getMagnitude
