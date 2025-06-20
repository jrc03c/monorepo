import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { normal } from "./normal.mjs"
import { reshape } from "./reshape.mjs"
import { shape } from "./shape.mjs"

test("tests that arrays can be reshaped correctly", () => {
  expect(shape(reshape(normal(100), [2, 5, 10]))).toStrictEqual([2, 5, 10])

  expect(shape(reshape(normal([2, 3, 4, 5]), [5, 4, 3, 2]))).toStrictEqual([
    5, 4, 3, 2,
  ])

  expect(shape(reshape(normal([2, 3, 4, 5]), 2 * 3 * 4 * 5))).toStrictEqual([
    2 * 3 * 4 * 5,
  ])

  expect(shape(reshape(normal([6, 4]), [8n, 3n]))).toStrictEqual([8, 3])

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

  const x = normal(100)

  forEach(wrongs, item => {
    expect(() => reshape(x, item)).toThrow()
  })

  forEach(wrongs, item => {
    expect(() => reshape(item, [2, 3, 4])).toThrow()
  })
})
