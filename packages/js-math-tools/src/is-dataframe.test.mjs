import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { normal } from "./normal.mjs"

class SubDataFrame extends DataFrame {}

test("tests that dataframes can be identified correctly", () => {
  expect(isDataFrame(new DataFrame(normal([10, 10])))).toBe(true)
  expect(isDataFrame(new SubDataFrame(normal([10, 10])))).toBe(true)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  forEach(wrongs, item => {
    expect(isDataFrame(item)).toBe(false)
  })
})
