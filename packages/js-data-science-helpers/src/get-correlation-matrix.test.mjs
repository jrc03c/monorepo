import {
  apply,
  DataFrame,
  distance,
  forEach,
  identity,
  isEqual,
  normal,
  ones,
  Series,
  set,
  shape,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getCorrelationMatrix } from "./get-correlation-matrix.mjs"
import { orthonormalize } from "./orthonormalize.mjs"

test("tests that correlation matrices can be correctly computed", () => {
  const a = [
    [2, 3],
    [4, 5],
    [6, 7],
  ]

  expect(distance(getCorrelationMatrix(a), ones([2, 2]))).toBeLessThan(0.01)

  const b = normal([1000, 5])
  const bTrue = identity(5)
  const bPred = getCorrelationMatrix(orthonormalize(b))
  expect(distance(bPred, bTrue)).toBeLessThan(0.01)

  expect(
    isEqual(
      shape(getCorrelationMatrix(normal([10, 5]), normal([10, 7]))),
      [5, 7],
    ),
  ).toBe(true)

  const c = new DataFrame(normal([100, 5]))
  const d = new DataFrame(normal([100, 7]))

  expect(
    isEqual(
      getCorrelationMatrix(c, d).values,
      getCorrelationMatrix(c.values, d.values),
    ),
  ).toBe(true)

  const e = normal([10, 10])
  forEach(e, (row, i) => (row[i] = "foo"))

  const fPred1 = set(getCorrelationMatrix(e))
  expect(fPred1.length).toBe(1)
  expect(fPred1[0]).toBeNaN()

  const fPred2 = set(getCorrelationMatrix(e, e, true))
  expect(fPred2.length).toBeGreaterThan(1)

  forEach(fPred2, v => {
    expect(v).not.toBeNaN()
  })

  const gBigInts = apply(normal([10, 10]), v => BigInt(Math.round(v * 100)))
  const gFloats = apply(gBigInts, v => Number(v))

  expect(
    isEqual(getCorrelationMatrix(gBigInts), getCorrelationMatrix(gFloats)),
  ).toBe(true)

  const hFloats = normal([10, 10])

  expect(
    isEqual(
      getCorrelationMatrix(gBigInts, hFloats),
      getCorrelationMatrix(gFloats, hFloats),
    ),
  )

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
      expect(() => getCorrelationMatrix(a, b)).toThrow()
    })
  })
})
