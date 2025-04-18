import { accuracy, orderCentroids } from "./helpers.mjs"

import {
  add,
  apply,
  int,
  isNumber,
  normal,
  random,
  range,
  scale,
  seed,
  shape,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { KMeansMeta } from "./k-means-meta.mjs"
import { rScore } from "../r-score.mjs"
import { trainTestSplit } from "../train-test-split.mjs"

test(`tests that the KMeansMeta model works correctly`, () => {
  !(() => {
    const centroidsTrue = normal([5, 3]).map(row =>
      row.map(v => v * 100 + normal() * 100),
    )

    const labels = []

    const x = range(0, 100).map(() => {
      const index = int(random() * centroidsTrue.length)
      const c = centroidsTrue[index]
      labels.push(index)
      return add(c, scale(5, normal(shape(c))))
    })

    const [xTrain, xTest, labelsTrain, labelsTest] = trainTestSplit(x, labels)
    const model = new KMeansMeta()
    model.fit(xTrain)
    model.centroids = orderCentroids(centroidsTrue, model.centroids)

    const labelsTrainPred = model.predict(xTrain)
    const labelsTestPred = model.predict(xTest)

    expect(model.k).toBe(5)
    expect(rScore(centroidsTrue, model.centroids)).toBeGreaterThan(0.95)
    expect(accuracy(labelsTrain, labelsTrainPred)).toBeGreaterThan(0.95)
    expect(accuracy(labelsTest, labelsTestPred)).toBeGreaterThan(0.95)
  })()

  !(() => {
    const xBigInts = apply(normal([50, 4]), v => BigInt(Math.round(v * 100)))
    const xFloats = apply(xBigInts, v => Number(v))

    seed(12345)

    const model1 = new KMeansMeta()
    model1.fit(xBigInts)

    seed(12345)

    const model2 = new KMeansMeta()
    model2.fit(xFloats)

    expect(rScore(model2.centroids, model1.centroids)).toBeGreaterThan(0.9999)
  })()

  !(() => {
    const xWithNaNs = normal([50, 5])

    for (let i = 0; i < 50; i++) {
      xWithNaNs[Math.floor(random() * xWithNaNs.length)][
        Math.floor(random() * xWithNaNs[0].length)
      ] = "uh-oh!"
    }

    const modelForNaNs = new KMeansMeta({ ks: [3, 4, 5] })
    modelForNaNs.fit(xWithNaNs)
    const labelsForNaNs = modelForNaNs.predict(xWithNaNs)

    expect(modelForNaNs.centroids.some(c => c.some(v => isNumber(v)))).toBe(
      true,
    )

    expect(labelsForNaNs.every(v => isNumber(v))).toBe(true)
  })()
})
