import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { product } from "./product.mjs"
import { reduce } from "./reduce.mjs"

test("tests that the products of values can be computed correctly", () => {
  expect(product([2, 3, 4])).toBe(24)
  expect(product([2, [3, [4]]])).toBe(24)

  const a = normal(100)

  expect(
    isEqual(
      product(a),
      reduce(a, (a, b) => a * b, 1),
    ),
  ).toBe(true)

  const b = normal([2, 3, 4, 5])

  expect(
    isEqual(
      product(b),
      reduce(flatten(b), (a, b) => a * b, 1),
    ),
  ).toBe(true)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(product(c), product(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(product(d), product(d.values))).toBe(true)

  expect(product([2n, 3n, 4n])).toBe(24n)
  expect(product([2n, 3n, 4.1])).toBe(product([2, 3, 4.1]))

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(product(e)).toBeNaN()
  expect(product(e, true)).not.toBeNaN()

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
    expect(() => product(item)).toThrow()
  })
})
