import { DataFrame, forEach, Series } from "@jrc03c/js-math-tools"
import { expect, test } from "@jrc03c/fake-jest"
import { isWholeNumber } from "./is-whole-number.mjs"

test("tests that the `isWholeNumber` function works as expected", () => {
  expect(isWholeNumber(234)).toBe(true)
  expect(isWholeNumber(0)).toBe(true)
  expect(isWholeNumber(-234)).toBe(false)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, v => {
    expect(isWholeNumber(v)).toBe(false)
  })
})
