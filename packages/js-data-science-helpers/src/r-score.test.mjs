import { apply, DataFrame, normal, Series } from "@jrc03c/js-math-tools"
import { rScore } from "./r-score.mjs"

test("gets the r-score of various arrays", () => {
  const a = normal(100)
  expect(rScore(a, a)).toBe(1)

  const b = normal([2, 3, 4, 5, 6])
  const c = apply(b, v => v + 1e-5 * normal())
  expect(rScore(b, c)).toBeGreaterThan(0.99)

  const d = new Series({ hello: normal(100) })
  const e = new Series({ goodbye: normal(100) })
  expect(rScore(d, e)).toBe(rScore(d.values, e.values))

  const f = new DataFrame(normal([100, 5]))
  const g = new DataFrame(normal([100, 5]))
  expect(rScore(f, g)).toBe(rScore(f.values, g.values))

  const hBigInts = normal(100).map(v => BigInt(Math.round(v)))
  const iBigInts = normal(100).map(v => BigInt(Math.round(v)))

  const hFloats = hBigInts.map(v => Number(v))
  const iFloats = iBigInts.map(v => Number(v))

  expect(rScore(hBigInts, iBigInts)).toBe(rScore(hFloats, iFloats))
  expect(rScore(hBigInts, iFloats)).toBe(rScore(hFloats, iBigInts))

  const j = normal(100)
  j[0] = "uh-oh!"
  const k = normal(100)
  k[1] = "uh-oh!"
  expect(rScore(j, k)).toBeNaN()
  expect(rScore(j, k, true)).not.toBeNaN()

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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(() => rScore(a, b)).toThrow()
    })
  })
})