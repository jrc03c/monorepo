import { DataFrame, Series } from "./dataframe/index.mjs"
import { distance } from "./distance.mjs"
import { flatten } from "./flatten.mjs"
import { normal } from "./normal.mjs"
import { pow } from "./pow.mjs"
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
      d.values
        .map((v, i) => pow(v - e.values[i], 2))
        .reduce((a, b) => a + b, 0),
    ),
  )

  const f = new DataFrame(normal([10, 10]))
  const g = new DataFrame(normal([10, 10]))
  const fFlat = flatten(f)
  const gFlat = flatten(g)

  expect(distance(f, g)).toBe(
    sqrt(fFlat.map((v, i) => pow(v - gFlat[i], 2)).reduce((a, b) => a + b, 0)),
  )

  const i = normal([2, 3, 4, 5])
  const j = normal([2, 3, 4, 5])
  const iFlat = flatten(i)
  const jFlat = flatten(j)

  expect(distance(i, j)).toBe(
    sqrt(iFlat.map((v, i) => pow(v - jFlat[i], 2)).reduce((a, b) => a + b, 0)),
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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(distance(a, b)).toBeNaN()
    })
  })
})