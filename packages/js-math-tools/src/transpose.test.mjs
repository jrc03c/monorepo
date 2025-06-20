import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { reverse } from "./reverse.mjs"
import { shape } from "./shape.mjs"
import { transpose } from "./transpose.mjs"

test("tests that vectors and matrices can be transposed correctly", () => {
  const a = normal(100)
  const bTrue = reverse(a)
  const bPred = transpose(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal([100, 50])
  expect(isEqual(shape(transpose(c)), [50, 100])).toBe(true)
  expect(isEqual(transpose(transpose(c)), c)).toBe(true)

  const d = new Series({ hello: normal(100) })
  const eTrue = d.copy()
  eTrue.values = reverse(eTrue.values)
  eTrue.index = reverse(eTrue.index)
  const ePred = transpose(d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new DataFrame({ foo: normal(100), bar: normal(100) })
  const gTrue = f.copy()
  const gTrueColumns = gTrue.index.slice()
  const gTrueIndex = gTrue.columns.slice()
  const gTrueValues = transpose(gTrue.values)
  gTrue._columns = gTrueColumns
  gTrue._index = gTrueIndex
  gTrue._values = gTrueValues
  const gPred = transpose(f)
  expect(isEqual(gPred, gTrue)).toBe(true)

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
    // [2, [3, [4, [5]]]],
  ]

  forEach(wrongs, item => {
    expect(() => transpose(item)).toThrow()
  })
})
