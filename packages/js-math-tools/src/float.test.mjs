import { apply } from "./apply.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { float } from "./float.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that values can be correctly cast to floats", () => {
  const a = map(normal(100), v => v.toString())
  const bTrue = map(a, v => parseFloat(v))
  const bPred = float(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = apply(normal([2, 3, 4, 5]), v => v.toString())
  const dTrue = apply(c, v => parseFloat(v))
  const dPred = float(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: map(normal(100), v => v.toString()) })
  const fTrue = e.copy().apply(v => parseFloat(v))
  const fPred = float(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({
    foo: map(normal(100), v => v.toString()),
    bar: map(normal(100), v => v.toString()),
  })

  const hTrue = g.copy().apply(col => col.apply(v => parseFloat(v)))
  const hPred = float(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  expect(float(234n)).toBe(234)
  expect(float(-234n)).toBe(-234)
  expect(float([2n, 3n, 4n])).toStrictEqual([2, 3, 4])

  const rights = [0, 1, 2.3, -2.3, Infinity, -Infinity]

  forEach(rights, item => {
    expect(float(item.toString())).toBe(item)
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
    expect(float(item)).toBeNaN()
  })
})
