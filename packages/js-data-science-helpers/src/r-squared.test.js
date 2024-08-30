const { apply, DataFrame, normal, Series } = require("@jrc03c/js-math-tools")
const rScore = require("./r-score")
const rSquared = require("./r-squared")

test("gets the r-score of various arrays", () => {
  const a = normal(100)
  expect(rSquared(a, a)).toBe(1)

  const b = normal([2, 3, 4, 5, 6])
  const c = apply(b, v => v + 1e-5 * normal())
  expect(rSquared(b, c)).toBeGreaterThan(0.99)

  const d = new Series({ hello: normal(100) })
  const e = new Series({ goodbye: normal(100) })
  expect(rSquared(d, e)).toBe(rSquared(d.values, e.values))

  const f = new DataFrame(normal([100, 5]))
  const g = new DataFrame(normal([100, 5]))
  expect(rSquared(f, g)).toBe(rSquared(f.values, g.values))

  const hBigInts = normal(100).map(v => BigInt(Math.round(v)))
  const iBigInts = normal(100).map(v => BigInt(Math.round(v)))

  const hFloats = hBigInts.map(v => Number(v))
  const iFloats = iBigInts.map(v => Number(v))

  expect(rSquared(hBigInts, iBigInts)).toBe(rSquared(hFloats, iFloats))
  expect(rSquared(hBigInts, iFloats)).toBe(rSquared(hFloats, iBigInts))

  const j = normal(100)
  const k = j.map(v => v + 0.1 * normal())
  expect(rSquared(j, k)).toBeLessThan(rScore(j, k))

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
      expect(() => rSquared(a, b)).toThrow()
    })
  })
})
