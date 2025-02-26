import { DataFrame, Series } from "./dataframe/index.mjs"
import { decycle } from "./copy.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"

test("tests that cyclic objects can be decycled correctly", () => {
  const a = [2, 3, 4]
  a.push(a)
  const bTrue = [2, 3, 4, '<reference to "/">']
  const bPred = decycle(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = { foo: { bar: { baz: "hello" } } }
  c.foo.bar.self = c.foo.bar

  const dTrue = {
    foo: { bar: { baz: "hello", self: '<reference to "/foo/bar">' } },
  }

  const dPred = decycle(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new DataFrame(normal([100, 5]))
  e.values[0][0] = e
  const fTrue = new DataFrame()
  fTrue._values = structuredClone(e.values)
  fTrue._values[0][0] = '<reference to "/">'
  fTrue._columns = e.columns
  fTrue._index = e.index
  const fPred = decycle(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series(normal(100))
  g.name = "foobar"
  g.values[g.values.length - 1] = g
  const hTrue = new Series()
  hTrue.name = g.name
  hTrue._values = g.values
  hTrue.values[hTrue.values.length - 1] = '<reference to "/">'
  hTrue._index = g.index
  const hPred = decycle(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const others = [
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
  ]

  others.forEach(value => {
    expect(isEqual(decycle(value), value)).toBe(true)
  })
})
