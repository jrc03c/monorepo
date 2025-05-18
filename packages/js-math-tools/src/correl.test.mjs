import { add } from "./add.mjs"
import { correl } from "./correl.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { normal } from "./normal.mjs"
import { scale } from "./scale.mjs"

test("tests that correlations can be computed correctly", () => {
  const a = normal(1000)
  const b = add(a, scale(0.0001, normal(1000)))
  expect(correl(a, a)).toBeCloseTo(1)
  expect(correl(a, b)).toBeGreaterThan(0.99)

  const c = add(a, scale(0.1, normal(1000)))
  expect(correl(a, c)).toBeGreaterThan(0.75)

  const d = normal(1000)
  expect(correl(a, d)).toBeGreaterThan(-0.25)
  expect(correl(a, d)).toBeLessThan(0.25)

  const e = new Series(a)
  const f = new Series(b)
  expect(correl(e, f)).toBeGreaterThan(0.99)

  expect(correl([2, 3, 4], ["five", "six", "seven"])).toBeNaN()
  expect(correl([2n, 3n, 4n], [5n, 6n, 7n])).toBeCloseTo(1)
  expect(correl([2n, 3n, 4n], [7n, 6n, 5n])).toBeCloseTo(-1)

  const g = normal(100)
  g[0] = "uh-oh!"
  const h = normal(100)
  h[1] = "uh-oh!"
  expect(correl(g, h)).toBeNaN()
  expect(correl(g, h, true)).not.toBeNaN()

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

  forEach(wrongs, pair => {
    expect(() => correl(pair[0], pair[1])).toThrow()
  })
})
