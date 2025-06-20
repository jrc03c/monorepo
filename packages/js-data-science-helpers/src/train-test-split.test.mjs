import {
  DataFrame,
  filter,
  isEqual,
  map,
  normal,
  range,
  seed,
  Series,
  shuffle,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { rScore } from "./r-score.mjs"
import { trainTestSplit } from "./train-test-split.mjs"

test("tests that `trainTestSplit` splits data correctly", () => {
  const a = normal([250, 2, 3, 4])
  const b = new DataFrame({ a: normal(250), b: normal(250), c: normal(250) })
  b.index = map(range(0, b.shape[0]), i => "b" + i)
  const c = new Series({ hello: normal(250) })
  c.index = map(range(0, c.shape[0]), i => "cee" + i)

  seed(12345)
  const index = shuffle(range(0, c.shape[0]))
  const testSize = 0.1
  const split = Math.floor((1 - testSize) * index.length)
  const trainIndex = index.slice(0, split)
  const testIndex = index.slice(split)

  const aTrainTrue = filter(a, (v, i) => trainIndex.indexOf(i) > -1)
  const aTestTrue = filter(a, (v, i) => testIndex.indexOf(i) > -1)

  const bTrainTrue = b.get(trainIndex, null)
  const bTestTrue = b.get(testIndex, null)

  const cTrainTrue = c.get(trainIndex)
  const cTestTrue = c.get(testIndex)

  seed(12345)

  const [aTrainPred, aTestPred, bTrainPred, bTestPred, cTrainPred, cTestPred] =
    trainTestSplit(a, b, c, { shouldShuffle: true, testSize: 0.1 })

  expect(rScore(aTrainTrue, aTrainPred)).toBeGreaterThan(0.99)
  expect(rScore(aTestTrue, aTestPred)).toBeGreaterThan(0.99)

  expect(rScore(bTrainTrue, bTrainPred)).toBeGreaterThan(0.99)
  expect(isEqual(bTrainTrue.index, bTrainPred.index)).toBe(true)
  expect(isEqual(bTrainTrue.columns, bTrainPred.columns)).toBe(true)
  expect(rScore(bTestTrue, bTestPred)).toBeGreaterThan(0.99)
  expect(isEqual(bTestTrue.index, bTestPred.index)).toBe(true)
  expect(isEqual(bTestTrue.columns, bTestPred.columns)).toBe(true)

  expect(rScore(cTrainTrue, cTrainPred)).toBeGreaterThan(0.99)
  expect(isEqual(cTrainTrue.index, cTrainPred.index)).toBe(true)
  expect(cTrainTrue.name).toBe(cTrainPred.name)
  expect(rScore(cTestTrue, cTestPred)).toBeGreaterThan(0.99)
  expect(isEqual(cTestTrue.index, cTestPred.index)).toBe(true)
  expect(cTestTrue.name).toBe(cTestPred.name)

  const dBigInts = map(normal(100), v => BigInt(Math.floor(v * 100)))
  const dFloats = map(dBigInts, v => Number(v))
  const results = trainTestSplit(dBigInts, dFloats)
  const dBigIntsTrain = map(results[0], v => Number(v))
  const dBigIntsTest = map(results[1], v => Number(v))
  const dFloatsTrain = results[2]
  const dFloatsTest = results[3]
  expect(isEqual(dBigIntsTrain, dFloatsTrain)).toBe(true)
  expect(isEqual(dBigIntsTest, dFloatsTest)).toBe(true)

  const e = normal(100)
  e[0] = "uh-oh!"
  const [eTrain, eTest] = trainTestSplit(e)
  expect(isEqual(eTrain.concat(eTest).toSorted(), e.toSorted()))
})

test("tests that `trainTestSplit` throws errors at the right times", () => {
  // no data sets at all
  expect(() => trainTestSplit({ testSize: 0.1, shouldShuffle: true })).toThrow()

  // data sets of different lengths
  const a = normal(100)
  const b = normal(200)
  expect(() => trainTestSplit(a, b)).toThrow()

  // wrong test size
  const c = normal(100)
  const d = normal(100)
  expect(() => trainTestSplit(c, d, { testSize: 234 })).toThrow()
})
