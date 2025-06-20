import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isDate } from "./is-date.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { round } from "./round.mjs"

test("tests that dates can be identified correctly", () => {
  expect(isDate(new Date())).toBe(true)

  forEach(range(0, 100), () => {
    const d = new Date(round(normal() * 10e13))
    expect(isDate(d)).toBe(true)
  })

  expect(isDate(new Date("foobar!"))).toBe(false)

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
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, value => {
    expect(isDate(value)).toBe(false)
  })
})
