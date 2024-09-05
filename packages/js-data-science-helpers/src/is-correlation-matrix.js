const { stats } = require("@jrc03c/js-math-tools")

function isCorrelationMatrix(x) {
  try {
    const prop = "@jrc03c/js-data-science-helpers/get-correlation-matrix"

    if (x[prop] === Symbol.for(prop)) {
      return true
    }

    const s = stats(x, { shouldDropNaNs: true })
    return s.min >= -1 && s.max <= 1
  } catch (e) {
    return false
  }
}

module.exports = isCorrelationMatrix
