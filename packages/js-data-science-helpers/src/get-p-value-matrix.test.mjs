import {
  assert,
  DataFrame,
  flatten,
  forEach,
  isArray,
  isDataFrame,
  isEqual,
  isNumber,
  isSeries,
  map,
  normal,
  range,
  Series,
  set,
  transpose,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getPValueMatrix } from "./get-p-value-matrix.mjs"

function containsOnlyNumbers(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return containsOnlyNumbers(x.values)
  }

  assert(
    isArray(x),
    "The `containsOnlyNumbers` function only works on arrays, Series, and DataFrames!",
  )

  const temp = flatten(x)

  for (let i = 0; i < temp.length; i++) {
    if (!isNumber(temp[i])) {
      return false
    }
  }

  return true
}

test("tests that a p-value matrix can be computed correctly", () => {
  const a = normal(100)
  const b = transpose(map(range(0, 5), () => a))
  const c = getPValueMatrix(b)
  const cSet = set(c)
  expect(cSet.length).toBe(1)
  expect(cSet[0]).toBe(1)

  const d = transpose([normal(100), map(normal(100), v => v + 100)])

  const eTrue = [
    [1, 0],
    [0, 1],
  ]
  const ePred = getPValueMatrix(d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new DataFrame(normal([100, 5]))
  const g = new DataFrame(normal([100, 7]))

  expect(
    isEqual(getPValueMatrix(f, g).values, getPValueMatrix(f.values, g.values)),
  ).toBe(true)

  const h = normal([10, 10])
  forEach(h, (row, i) => (row[i] = "uh-oh"))
  const gPred1 = getPValueMatrix(h)
  expect(set(gPred1).length).toBe(1)
  expect(set(gPred1)[0]).toBeNaN()

  const gPred2 = getPValueMatrix(h, h, true)
  expect(set(gPred2).length).toBeGreaterThan(1)

  forEach(gPred2, row => {
    forEach(row, v => {
      expect(isNumber(v)).toBe(true)
    })
  })

  const hBigInts = map(normal([100, 5]), row =>
    map(row, v => BigInt(Math.round(v * 100))),
  )

  const hFloats = map(hBigInts, row => map(row, v => Number(v)))

  expect(isEqual(getPValueMatrix(hBigInts), getPValueMatrix(hFloats))).toBe(
    true,
  )

  const i = normal([100, 5])
  i[0][0] = "uh-oh!"
  const j = normal([100, 5])
  j[1][1] = "uh-oh!"
  expect(containsOnlyNumbers(getPValueMatrix(i, j))).toBe(false)
  expect(containsOnlyNumbers(getPValueMatrix(i, j, true))).toBe(true)

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    [2, 3, 4],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  forEach(wrongs, a => {
    forEach(wrongs, b => {
      expect(() => getPValueMatrix(a, b)).toThrow()
    })
  })
})
