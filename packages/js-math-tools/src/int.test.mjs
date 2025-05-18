import { apply } from "./apply.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { int } from "./int.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that values can be correctly cast to integers", () => {
  const a = map(normal(100), v => v.toString())
  const bTrue = map(a, v => parseInt(v))
  const bPred = int(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = apply(normal([2, 3, 4, 5]), v => v.toString())
  const dTrue = apply(c, v => parseInt(v))
  const dPred = int(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: map(normal(100), v => v.toString()) })
  const fTrue = e.copy().apply(v => parseInt(v))
  const fPred = int(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({
    foo: map(normal(100), v => v.toString()),
    bar: map(normal(100), v => v.toString()),
  })

  const hTrue = g.copy().apply(col => col.apply(v => parseInt(v)))
  const hPred = int(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  expect(int(234n)).toBe(234)
  expect(int(-234n)).toBe(-234)

  const rights = [0, 1, 2.3, -2.3, Infinity, -Infinity]

  forEach(rights, item => {
    expect(int(item.toString())).toBe(parseInt(item.toString()))
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
    expect(int(item)).toBeNaN()
  })
})
