import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { reverse } from "./reverse.mjs"

test("tests that arrays can be correctly reversed", () => {
  expect(reverse([2, 3, 4])).toStrictEqual([4, 3, 2])
  expect(reverse(range(0, 100))).toStrictEqual(range(99, -1))

  const a = normal([2, 3, 4, 5])
  const bTrue = a.slice().reverse()
  const bPred = reverse(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = new Series({ hello: normal(100) })
  const dTrue = c.copy()
  dTrue.values.reverse()
  dTrue.index.reverse()
  const dPred = reverse(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new DataFrame({ foo: normal(100), bar: normal(100) })
  const fTrue = e.copy()
  fTrue.values.reverse()
  fTrue.index.reverse()
  const fPred = reverse(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

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
    expect(() => reverse(item)).toThrow()
  })
})
