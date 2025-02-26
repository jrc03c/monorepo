import { apply } from "./apply.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { round } from "./round.mjs"

test("tests that values can be rounded correctly", () => {
  expect(round(2.3)).toBe(2)
  expect(round(2.7)).toBe(3)
  expect(round(-2.3)).toBe(-2)
  expect(round(-2.7)).toBe(-3)

  const a = normal(100)
  expect(isEqual(round(a), apply(a, round))).toBe(true)

  const b = normal([2, 3, 4, 5])
  expect(isEqual(round(b), apply(b, round))).toBe(true)

  const c = new Series({ hello: normal(100) })
  const dTrue = c.copy().apply(round)
  const dPred = round(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new DataFrame({ foo: normal(100), bar: normal(100) })
  const fTrue = e.copy().apply(col => col.apply(round))
  const fPred = round(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  expect(round(234n)).toBe(234n)
  expect(round(-234n)).toBe(-234n)
  expect(round([2n, -3n, 4n, -5n])).toStrictEqual([2n, -3n, 4n, -5n])

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

  wrongs.forEach(item => {
    expect(round(item)).toBeNaN()
  })
})
