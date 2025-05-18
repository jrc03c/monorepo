import {
  DataFrame,
  forEach,
  identity,
  map,
  ones,
  random,
  round,
  Series,
  zeros,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { isBinary } from "./is-binary.mjs"

test("tests that arrays, Series, and DataFrames can be correctly identified as binary", () => {
  expect(isBinary(0)).toBe(true)
  expect(isBinary(1)).toBe(true)
  expect(isBinary(-1)).toBe(false)
  expect(isBinary([])).toBe(false)
  expect(isBinary([0])).toBe(true)
  expect(isBinary([1])).toBe(true)
  expect(isBinary(round(random(100)))).toBe(true)
  expect(isBinary(round(random([2, 3, 4, 5])))).toBe(true)
  expect(isBinary(random(100))).toBe(false)
  expect(isBinary(new Series(round(random(100))))).toBe(true)
  expect(isBinary(new DataFrame(round(random([100, 5]))))).toBe(true)
  expect(isBinary(new Series(random(100)))).toBe(false)
  expect(isBinary(new DataFrame(random([100, 5])))).toBe(false)
  expect(isBinary(map(random(100), v => round(v * 2 - 1)))).toBe(false)
  expect(isBinary(zeros([2, 3, 4, 5]))).toBe(true)
  expect(isBinary(ones([2, 3, 4, 5]))).toBe(true)
  expect(isBinary(identity(10))).toBe(true)

  expect(isBinary([0n, 1n])).toBe(true)
  expect(isBinary([0n, -1n])).toBe(false)
  expect(isBinary([0n, 1])).toBe(true)
  expect(isBinary([0, 1n])).toBe(true)
  expect(isBinary([2n, 3n, 4n])).toBe(false)

  const x = [0, 1, 0, 1, "foo"]
  expect(isBinary(x)).toBe(false)
  expect(isBinary(x, true)).toBe(true)

  const wrongs = [
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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, item => {
    expect(isBinary(item)).toBe(false)
  })
})
