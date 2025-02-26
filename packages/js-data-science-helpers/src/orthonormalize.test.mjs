import {
  DataFrame,
  identity,
  isEqual,
  isNumber,
  normal,
  range,
  Series,
  transpose,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getCorrelationMatrix } from "./get-correlation-matrix.mjs"
import { orthonormalize } from "./orthonormalize.mjs"
import { rSquared } from "./r-squared.mjs"

test("tests that matrices can be correctly orthonormalized", () => {
  const a = normal([1000, 5])
  const bTrue = identity(5)
  const bPred = getCorrelationMatrix(orthonormalize(a))
  expect(rSquared(bTrue, bPred)).toBeGreaterThan(0.99)

  const c = normal(1000)

  const d = new DataFrame(
    transpose(range(0, 5).map(() => c.map(v => v + 1e-5 * normal()))),
  )

  const eTrue = new DataFrame(identity(5))
  eTrue.index = eTrue.columns.slice()
  const ePred = getCorrelationMatrix(orthonormalize(d))
  expect(rSquared(eTrue, ePred)).toBeGreaterThan(0.99)

  const fBigInts = normal([100, 5]).map(row =>
    row.map(v => BigInt(Math.round(v * 100))),
  )

  const fFloats = fBigInts.map(row => row.map(v => Number(v)))
  expect(isEqual(orthonormalize(fBigInts), orthonormalize(fFloats))).toBe(true)

  const g = normal([10, 10])
  g[0][0] = "uh-oh!"
  const h = orthonormalize(g)
  expect(h.some(row => row.some(v => isNaN(v)))).toBe(true)
  expect(h.some(row => row.some(v => isNumber(v)))).toBe(true)

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

  wrongs.forEach(item => {
    expect(() => orthonormalize(item)).toThrow()
  })
})
