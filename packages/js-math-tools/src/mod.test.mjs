import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { isEqual } from "./is-equal.mjs"
import { mod } from "./mod.mjs"
import { normal } from "./normal.mjs"
import { reshape } from "./reshape.mjs"

test("tests that the modulo function works as expected", () => {
  expect(mod(5, 2)).toBe(1)
  expect(mod(5, 3)).toBe(2)

  const a = normal(100)
  const b = 0.1

  expect(
    isEqual(
      mod(a, b),
      a.map(v => v % b),
    ),
  ).toBe(true)

  expect(
    isEqual(
      mod(b, a),
      a.map(v => b % v),
    ),
  ).toBe(true)

  const c = normal([2, 3, 4, 5])
  const d = normal([2, 3, 4, 5])
  const cFlat = flatten(c)
  const dFlat = flatten(d)
  const eFlat = cFlat.map((v, i) => v % dFlat[i])
  const eTrue = reshape(eFlat, [2, 3, 4, 5])
  const ePred = mod(c, d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new Series({ hello: normal(100) })
  const g = new Series({ goodbye: normal(100) })
  expect(isEqual(mod(f, g), new Series(mod(f.values, g.values)))).toBe(true)

  const h = new DataFrame(normal([10, 10]))
  const i = new DataFrame(normal([10, 10]))
  expect(isEqual(mod(h, i), new DataFrame(mod(h.values, i.values)))).toBe(true)

  expect(mod(8n, 2n)).toBe(0n)
  expect(mod(8n, 2)).toBe(0n)
  expect(mod(8, 2n)).toBe(0n)
  expect(mod(8, 2)).toBe(0)

  const wrongs = [
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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(mod(a, b)).toBeNaN()
    })
  })
})
