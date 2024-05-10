const { dot } = require("@jrc03c/js-math-tools")

function twoNorm(x) {
  return Math.sqrt(dot(x, x))
}

module.exports = twoNorm
