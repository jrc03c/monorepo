import { DataFrame, Series } from "./dataframe.js"
import apply from "./apply.js"
import int from "./int.js"
import isEqual from "./is-equal.js"
import normal from "./normal.js"

test("tests that values can be correctly cast to integers", () => {
  const a = normal(100).map(v => v.toString())
  const bTrue = a.map(v => parseInt(v))
  const bPred = int(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = apply(normal([2, 3, 4, 5]), v => v.toString())
  const dTrue = apply(c, v => parseInt(v))
  const dPred = int(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: normal(100).map(v => v.toString()) })
  const fTrue = e.copy().apply(v => parseInt(v))
  const fPred = int(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({
    foo: normal(100).map(v => v.toString()),
    bar: normal(100).map(v => v.toString()),
  })

  const hTrue = g.copy().apply(col => col.apply(v => parseInt(v)))
  const hPred = int(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  expect(int(234n)).toBe(234)
  expect(int(-234n)).toBe(-234)

  const rights = [0, 1, 2.3, -2.3, Infinity, -Infinity]

  rights.forEach(item => {
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

  wrongs.forEach(item => {
    expect(int(item)).toBeNaN()
  })
})
