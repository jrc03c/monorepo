const {
  add,
  assert,
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

const containsOnlyNumbers = require("./contains-only-numbers")
const subtract = (a, b) => add(a, scale(b, -1))

function rSquared(xTrue, xPred) {
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

  assert(
    containsOnlyNumbers(xTrue),
    "You must pass two same-shaped numerical arrays into the `rSquared` function!",
  )

  assert(
    containsOnlyNumbers(xPred),
    "You must pass two same-shaped numerical arrays into the `rSquared` function!",
  )

  const num = Number(sum(pow(subtract(xTrue, xPred), 2)))
  const den = Number(sum(pow(subtract(xTrue, mean(xTrue)), 2)))
  if (den === 0) return NaN
  return 1 - num / den
}

module.exports = rSquared