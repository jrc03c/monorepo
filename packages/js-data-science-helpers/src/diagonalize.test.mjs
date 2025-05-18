import {
  DataFrame,
  flatten,
  forEach,
  isDataFrame,
  isEqual,
  isNumber,
  normal,
  Series,
} from "@jrc03c/js-math-tools"

import { diagonalize } from "./diagonalize.mjs"
import { expect, test } from "@jrc03c/fake-jest"

test("tests that an array can be correctly diagonalized", () => {
  const a = [2, 3, 4]

  const bTrue = [
    [2, 0, 0],
    [0, 3, 0],
    [0, 0, 4],
  ]

  const bPred = diagonalize(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal(100)
  const dPred = diagonalize(c)

  forEach(dPred, (row, i) => {
    expect(row[i]).toBe(c[i])
  })

  const e = new Series({ hello: normal(100) })
  const fPred = diagonalize(e)
  expect(isDataFrame(fPred)).toBe(true)
  expect(isEqual(fPred.index, fPred.columns)).toBe(true)
  expect(isEqual(fPred.values, diagonalize(e.values))).toBe(true)

  const g = [2n, -3n, 4n, -5n]

  const hTrue = [
    [2n, 0n, 0n, 0n],
    [0n, -3n, 0n, 0n],
    [0n, 0n, 4n, 0n],
    [0n, 0n, 0n, -5n],
  ]

  const hPred = diagonalize(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = normal(10)
  i[0] = "uh-oh!"
  const j = diagonalize(i)

  expect(
    flatten(j)
      .slice(1)
      .every(v => isNumber(v)),
  ).toBe(true)

  expect(isNumber(j[0][0])).toBe(false)

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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, item => {
    expect(() => diagonalize(item)).toThrow()
  })
})
