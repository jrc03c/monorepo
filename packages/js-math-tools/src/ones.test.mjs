import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { ones } from "./ones.mjs"
import { shape } from "./shape.mjs"

test("tests that arrays of 1s can be generated correctly", () => {
  expect(ones(5)).toStrictEqual([1, 1, 1, 1, 1])

  expect(ones([2, 3])).toStrictEqual([
    [1, 1, 1],
    [1, 1, 1],
  ])

  expect(shape(ones([2, 3, 4, 5]))).toStrictEqual([2, 3, 4, 5])
  expect(ones([2n, 3n, 4n])).toStrictEqual(ones([2, 3, 4]))

  const wrongs = [
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
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
    expect(() => ones(item)).toThrow()
  })
})
