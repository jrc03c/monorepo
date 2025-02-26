import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { max } from "./max.mjs"
import { normal } from "./normal.mjs"

test("tests that the maximum value in arrays, series, and dataframes can be found correctly", () => {
  const a = normal(100)
  expect(max(a)).toBe(Math.max(...a))

  const b = normal([2, 3, 4, 5])
  expect(max(b)).toBe(Math.max(...flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(max(c)).toBe(max(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(max(d)).toBe(max(d.values))

  expect(max([2, 3, 4n])).toBe(4n)
  expect(max([2n, 3n, 4])).toBe(4)
  expect(max([234n, 234])).toBe(234n)
  expect(max([234, 234n])).toBe(234)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(max(e)).toBeNaN()
  expect(max(e, true)).not.toBeNaN()

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
    expect(() => max(item)).toThrow()
  })
})
