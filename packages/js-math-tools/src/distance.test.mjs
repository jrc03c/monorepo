import { DataFrame, Series } from "./dataframe/index.mjs"
import { distance } from "./distance.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"
import { pow } from "./pow.mjs"
import { reduce } from "./reduce.mjs"
import { sqrt } from "./sqrt.mjs"

test("gets the distance between two vectors", () => {
  const a = [3, 4]
  const b = [-3, -4]
  expect(distance(a, b)).toBe(10)

  const c = normal([2, 3, 4, 5])
  expect(distance(c, c)).toBe(0)

  const d = new Series(normal(100))
  const e = new Series(normal(100))

  expect(distance(d, e)).toBe(
    sqrt(
      reduce(
        map(d.values, (v, i) => pow(v - e.values[i], 2)),
        (a, b) => a + b,
        0,
      ),
    ),
  )

  const f = new DataFrame(normal([10, 10]))
  const g = new DataFrame(normal([10, 10]))
  const fFlat = flatten(f)
  const gFlat = flatten(g)

  expect(distance(f, g)).toBe(
    sqrt(
      reduce(
        map(fFlat, (v, i) => pow(v - gFlat[i], 2)),
        (a, b) => a + b,
        0,
      ),
    ),
  )

  const i = normal([2, 3, 4, 5])
  const j = normal([2, 3, 4, 5])
  const iFlat = flatten(i)
  const jFlat = flatten(j)

  expect(distance(i, j)).toBe(
    sqrt(
      reduce(
        map(iFlat, (v, i) => pow(v - jFlat[i], 2)),
        (a, b) => a + b,
        0,
      ),
    ),
  )

  expect(distance(-3, 3)).toBe(6)
  expect(distance(-Infinity, Infinity)).toBe(Infinity)

  expect(() => distance(normal([2, 3, 4]), normal([4, 3, 2]))).toThrow()

  expect(distance(-5n, 5n)).toBe(10n)
  expect(distance([3n, 4n], [6n, 8n])).toBe(5n)

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

  forEach(wrongs, a => {
    forEach(wrongs, b => {
      expect(distance(a, b)).toBeNaN()
    })
  })
})
