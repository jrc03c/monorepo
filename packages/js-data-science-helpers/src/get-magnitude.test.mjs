import {
  DataFrame,
  flatten,
  forEach,
  normal,
  reduce,
  Series,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getMagnitude } from "./get-magnitude.mjs"

test("tests that the magnitudes of various arrays, Series, and DataFrames can be correctly computed", () => {
  expect(getMagnitude([3])).toBe(3)
  expect(getMagnitude([3, 4])).toBe(5)
  expect(getMagnitude([10, 24])).toBe(26)

  const a = normal(100)
  expect(getMagnitude(a)).toBe(Math.sqrt(reduce(a, (a, b) => a + b * b, 0)))

  const b = normal([2, 3, 4, 5])

  expect(getMagnitude(b)).toBe(
    Math.sqrt(reduce(flatten(b), (a, b) => a + b * b, 0)),
  )

  const c = new Series({ hello: normal(100) })
  expect(getMagnitude(c)).toBe(getMagnitude(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(getMagnitude(d)).toBe(getMagnitude(d.values))

  expect(getMagnitude([3, 4, "five"])).toBeNaN()
  expect(getMagnitude([3, 4, "five"], true)).toBe(5)

  expect(getMagnitude(234n)).toBe(234n)
  expect(getMagnitude(-234n)).toBe(234n)
  expect(getMagnitude([3n, 4n])).toBe(5n)
  expect(getMagnitude([3n, 4.5])).toBeCloseTo(5.408326913)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(getMagnitude(e)).toBeNaN()
  expect(getMagnitude(e, true)).not.toBeNaN()

  const wrongs = [
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  forEach(wrongs, item => {
    expect(getMagnitude(item)).toBeNaN()
  })
})
