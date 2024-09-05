const {
  add,
  assert,
  dropNaNPairwise,
  isArray,
  isDataFrame,
  isEqual,
  isSeries,
  mean,
  pow,
  scale,
  shape,
  sum,
} = require("@jrc03c/js-math-tools")

const subtract = (a, b) => add(a, scale(b, -1))

function rSquared(xTrue, xPred, shouldIgnoreNaNs) {
  if (isDataFrame(xTrue) || isSeries(xTrue)) {
    return rSquared(xTrue.values, xPred)
  }

  if (isDataFrame(xPred) || isSeries(xPred)) {
    return rSquared(xTrue, xPred.values)
  }

  assert(
    isArray(xTrue),
    "You must pass two same-shaped numerical arrays into the `rSquared` function!",
  )

  assert(
    isArray(xPred),
    "You must pass two same-shaped numerical arrays into the `rSquared` function!",
  )

  assert(
    isEqual(shape(xTrue), shape(xPred)),
    "You must pass two same-shaped numerical arrays into the `rSquared` function!",
  )

  if (shouldIgnoreNaNs) {
    const results = dropNaNPairwise(xTrue, xPred)
    xTrue = results[0]
    xPred = results[1]
  }

  const num = Number(sum(pow(subtract(xTrue, xPred), 2)))
  const den = Number(sum(pow(subtract(xTrue, mean(xTrue)), 2)))
  if (den === 0) return NaN
  return 1 - num / den
}

module.exports = rSquared
