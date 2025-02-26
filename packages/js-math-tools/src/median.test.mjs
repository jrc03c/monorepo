import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { median } from "./median.mjs"
import { normal } from "./normal.mjs"
import { shuffle } from "./shuffle.mjs"
import { sort } from "./sort.mjs"

test("tests that the median of arrays, series, and dataframes can be computed correctly", () => {
  expect(median([2, 3, 4])).toBe(3)
  expect(median([2, 3, 4, 5])).toBe(3.5)
  expect(median([2, 2, 2, 3, 3])).toBe(2)

  const a = normal(100)
  expect(median(shuffle(a))).toBe(median(sort(a)))

  const b = normal([2, 3, 4, 5])
  expect(median(b)).toBe(median(flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(median(c)).toBe(median(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(median(d)).toBe(median(d.values))

  expect(median([2n, 3n, 4n, 5n, 4n, 4n, 4n, 4n, 4n])).toBe(4n)
  expect(median([2.34, 3n, 5.67])).toBe(3n)
  expect(median([2n, 3.1, 4n])).toBe(3.1)
  expect(median([2n, 2n, 3n, 3n])).toBe(2.5)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(median(e)).toBeNaN()
  expect(median(e, true)).not.toBeNaN()

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

  wrongs.forEach(item => {
    expect(() => median(item)).toThrow()
  })
})
