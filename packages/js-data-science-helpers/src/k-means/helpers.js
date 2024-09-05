const {
  add,
  apply,
  argmin,
  assert,
  flatten,
  int,
  isArray,
  isDataFrame,
  isEqual,
  isNumber,
  isSeries,
  normal,
  pow,
  random,
  range,
  scale,
  seed,
  shape,
  subtract,
  sum,
} = require("@jrc03c/js-math-tools")

const rScore = require("../r-score")
const trainTestSplit = require("../train-test-split")

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

function createGenericTest(Model) {
  test(`tests that the \`${Model.name}\` model works correctly`, () => {
    !(() => {
      const centroidsTrue = normal([5, 3]).map(row =>
        row.map(v => v * 100 + normal() * 100),
      )

      const labels = []

      const x = range(0, 50).map(() => {
        const index = int(random() * centroidsTrue.length)
        const c = centroidsTrue[index]
        labels.push(index)
        return add(c, scale(5, normal(shape(c))))
      })

      const [xTrain, xTest, labelsTrain, labelsTest] = trainTestSplit(x, labels)
      const model = new Model({ k: centroidsTrue.length })
      model.fit(xTrain)
      model.centroids = orderCentroids(centroidsTrue, model.centroids)

      const labelsTrainPred = model.predict(xTrain)
      const labelsTestPred = model.predict(xTest)

      expect(accuracy(labelsTrain, labelsTrainPred)).toBeGreaterThan(0.95)
      expect(accuracy(labelsTest, labelsTestPred)).toBeGreaterThan(0.95)
    })()

    !(() => {
      const xBigInts = apply(normal([50, 4]), v => BigInt(Math.round(v * 100)))
      const xFloats = apply(xBigInts, v => Number(v))

      seed(12345)

      const model1 = new Model({ k: 3 })
      model1.fit(xBigInts)

      seed(12345)

      const model2 = new Model({ k: 3 })
      model2.fit(xFloats)

      expect(rScore(model2.centroids, model1.centroids)).toBeGreaterThan(0.9999)
    })()

    !(() => {
      const xWithNaNs = normal([50, 5])

      for (let i = 0; i < 15; i++) {
        xWithNaNs[Math.floor(random() * xWithNaNs.length)][
          Math.floor(random() * xWithNaNs[0].length)
        ] = "uh-oh!"
      }

      const modelForNaNs = new Model({ k: 3 })
      modelForNaNs.fit(xWithNaNs)
      const labelsForNaNs = modelForNaNs.predict(xWithNaNs)

      expect(modelForNaNs.centroids.some(c => c.some(v => isNumber(v)))).toBe(
        true,
      )

      expect(labelsForNaNs.every(v => isNumber(v))).toBe(true)
    })()
  })
}

function isMatrix(x) {
  return isArray(x) && shape(x).length === 2
}

function isWholeNumber(x) {
  return isNumber(x) && x >= 0 && Math.floor(x) === x
}

function orderCentroids(ctrue, cpred) {
  return ctrue.map(c1 => {
    return cpred[argmin(cpred.map(c2 => sse(c1, c2)))]
  })
}

function sse(xtrue, xpred) {
  const shouldDropNaNs = true
  return sum(pow(subtract(xtrue, xpred), 2), shouldDropNaNs)
}

module.exports = {
  accuracy,
  createGenericTest,
  isMatrix,
  isWholeNumber,
  orderCentroids,
  sse,
}
