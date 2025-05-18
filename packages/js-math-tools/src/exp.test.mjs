import { apply } from "./apply.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { exp } from "./exp.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that values to the power of E can be computed correctly", () => {
  const a = normal(100)
  const b = normal([10, 10])
  const c = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  const e = normal([5, 5, 5, 5])

  const rights = [
    [5, Math.exp(5)],
    [-234.567, Math.exp(-234.567)],
    [a, map(a, v => Math.exp(v))],
    [b, map(b, row => map(row, v => Math.exp(v)))],
    [c, c.copy().apply(v => Math.exp(v))],
    [d, d.copy().apply(col => col.apply(v => Math.exp(v)))],
    [e, apply(e, Math.exp)],
    [Infinity, Infinity],
    [-Infinity, 0],
    [2n, Math.exp(2)],
    [0n, 1n],
    [-2n, Math.exp(-2)],
  ]

  forEach(rights, pair => {
    expect(isEqual(exp(pair[0]), pair[1])).toBe(true)
  })

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

  forEach(wrongs, item => {
    expect(exp(item)).toBeNaN()
  })
})
