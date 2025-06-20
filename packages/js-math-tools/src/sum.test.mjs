import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { reduce } from "./reduce.mjs"
import { sum } from "./sum.mjs"

test("tests that the sums of values can be computed correctly", () => {
  expect(sum([2, 3, 4])).toBe(9)
  expect(sum([2, [3, [4]]])).toBe(9)

  const a = normal(100)

  expect(
    isEqual(
      sum(a),
      reduce(a, (a, b) => a + b, 0),
    ),
  ).toBe(true)

  const b = normal([2, 3, 4, 5])

  expect(
    isEqual(
      sum(b),
      reduce(flatten(b), (a, b) => a + b, 0),
    ),
  ).toBe(true)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(sum(c), sum(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(sum(d), sum(d.values))).toBe(true)

  expect(sum([2n, 3n, 4n])).toBe(9n)
  expect(sum([2n, 3n, 4n, 5.5])).toBe(14.5)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(sum(e)).toBeNaN()
  expect(sum(e, true)).not.toBeNaN()

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
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  forEach(wrongs, item => {
    expect(() => sum(item)).toThrow()
  })
})
