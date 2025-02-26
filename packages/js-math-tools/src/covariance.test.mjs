import { abs } from "./abs.mjs"
import { add } from "./add.mjs"
import { covariance } from "./covariance.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { normal } from "./normal.mjs"
import { scale } from "./scale.mjs"

test("tests that covariances can be computed correctly", () => {
  const a = [2, 3, 4]
  const b = [1, 1, 1]
  expect(covariance(a, b)).toBe(0)

  const c = normal(10000)
  const d = normal(10000)
  expect(abs(covariance(c, d))).toBeLessThan(0.15)

  const e = normal(10000)
  expect(covariance(e, e)).toBeGreaterThan(0.85)

  expect(covariance([], [])).toBeNaN()

  const h = normal(1000)
  const i = add(h, scale(1e-10, normal(1000)))
  expect(covariance(h, h)).toBeGreaterThan(0.85)
  expect(covariance(h, i)).toBeGreaterThan(0.85)

  const j = add(h, scale(0.1, normal(1000)))
  expect(covariance(h, j)).toBeGreaterThan(0.75)

  const k = normal(1000)
  expect(covariance(h, k)).toBeGreaterThan(-0.25)
  expect(covariance(h, k)).toBeLessThan(0.25)

  const l = new Series(h)
  const m = new Series(i)
  expect(covariance(l, m)).toBeGreaterThan(0.85)

  expect(covariance([2, 3, 4], ["five", "six", "seven"])).toBeNaN()
  expect(covariance([2n, 3n, 4n], [5n, 6n, 7n])).toBeCloseTo(0.6666666666666666)

  const n = normal(100)
  n[0] = "uh-oh!"
  const p = normal(100)
  p[1] = "uh-oh!"
  expect(covariance(n, p)).toBeNaN()
  expect(covariance(n, p, true)).not.toBeNaN()

  const wrongs = [
    [0, 1],
    [Infinity, NaN],
    ["foo", true],
    [false, null],
    [undefined, Symbol.for("Hello, world!")],
    [
      x => x,
      function (x) {
        return x
      },
    ],
    [{ hello: "world" }, { goodbye: "world" }],
    [normal(100), normal(200)],
    [new Series(normal(100)), new Series(normal(101))],
    [new DataFrame(normal([100, 2])), new DataFrame(normal([100, 2]))],
  ]

  wrongs.forEach(pair => {
    expect(() => covariance(pair[0], pair[1])).toThrow()
  })
})
