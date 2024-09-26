import { DataFrame, Series } from "./dataframe.js"
import { random } from "./random.js"
import apply from "./apply.js"
import floor from "./floor.js"
import isEqual from "./is-equal.js"
import normal from "./normal.js"

test("tests that values can be correctly floored", () => {
  const a = random(100)
  expect(floor(a).every(v => v === 0)).toBe(true)

  const b = apply(random([2, 3, 4, 5]), v => v * -1)
  const cTrue = apply(b, () => -1)
  const cPred = floor(b)
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = new Series({ hello: normal(100) })
  const eTrue = d.copy().apply(v => Math.floor(v))
  const ePred = floor(d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new DataFrame({ foo: normal(100), bar: normal(100) })
  const gTrue = f.copy().apply(col => col.apply(v => Math.floor(v)))
  const gPred = floor(f)
  expect(isEqual(gPred, gTrue)).toBe(true)

  expect(floor(234n)).toBe(234n)
  expect(floor(-234n)).toBe(-234n)
  expect(floor([2n, -3n, 4n, -5n])).toStrictEqual([2n, -3n, 4n, -5n])

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
    expect(floor(item)).toBeNaN()
  })
})
