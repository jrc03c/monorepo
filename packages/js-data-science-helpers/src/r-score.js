const { abs, sign, sqrt } = require("@jrc03c/js-math-tools")
const rSquared = require("./r-squared")

function rScore(yTrue, yPred, shouldDropNaNs) {
  const r2 = rSquared(yTrue, yPred, shouldDropNaNs)
  return sign(r2) * sqrt(abs(r2))
}

module.exports = rScore
