import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { ndarray } from "./ndarray.mjs"
import { shape } from "./shape.mjs"

test("tests that arrays of any (non-jagged) shape can be created successfully", () => {
  expect(
    isEqual(ndarray(5), [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ]),
  ).toBe(true)

  expect(shape(ndarray([2, 3, 4, 5]))).toStrictEqual([2, 3, 4, 5])
  expect(flatten(ndarray([2, 3, 4, 5])).length).toBe(2 * 3 * 4 * 5)
  expect(isEqual(ndarray([2n, 3n, 4n]), ndarray([2, 3, 4]))).toBe(true)

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
    expect(() => ndarray(item)).toThrow()
  })
})
