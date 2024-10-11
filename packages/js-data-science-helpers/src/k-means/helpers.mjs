import {
  argmin,
  assert,
  flatten,
  isArray,
  isDataFrame,
  isEqual,
  isSeries,
  pow,
  shape,
  subtract,
  sum,
} from "@jrc03c/js-math-tools"

function accuracy(yTrue, yPred) {
  if (isDataFrame(yTrue) || isSeries(yTrue)) {
    yTrue = yTrue.values
  }

  if (isDataFrame(yPred) || isSeries(yPred)) {
    yPred = yPred.values
  }

  assert(
    isEqual(shape(yTrue), shape(yPred)),
    "`yPred` and `yTrue` must have the same shape!",
  )

  const yTrueFlat = flatten(yTrue)
  const yPredFlat = flatten(yPred)
  let correct = 0

  yTrueFlat.forEach((v, i) => {
    if (v === yPredFlat[i]) correct++
  })

  return correct / yTrueFlat.length
}

function isMatrix(x) {
  return isArray(x) && shape(x).length === 2
}

function orderCentroids(ctrue, cpred) {
  return ctrue.map(c1 => {
    return cpred[argmin(cpred.map(c2 => sse(c1, c2)))]
  })
}

function sse(xtrue, xpred) {
  const shouldIgnoreNaNs = true
  return sum(pow(subtract(xtrue, xpred), 2), shouldIgnoreNaNs)
}

export { accuracy, isMatrix, orderCentroids, sse }
