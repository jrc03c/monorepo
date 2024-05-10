const { clamp, dot } = require("@jrc03c/js-math-tools")
const twoNorm = require("./two-norm")

function cosineSimilarity(a, b) {
  return clamp(dot(a, b) / (twoNorm(a) * twoNorm(b)), 0, 1)
}

module.exports = cosineSimilarity
