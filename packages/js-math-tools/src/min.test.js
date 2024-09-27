import { DataFrame, Series } from "./dataframe/index.js"
import flatten from "./flatten.js"
import min from "./min.js"
import normal from "./normal.js"

test("tests that the minimum value in arrays, series, and dataframes can be found correctly", () => {
  expect(min([2, 3, 4])).toBe(2)
  expect(min([-2, -3, -4])).toBe(-4)

  const a = normal(100)
  expect(min(a)).toBe(Math.min(...a))

  const b = normal([2, 3, 4, 5])
  expect(min(b)).toBe(Math.min(...flatten(b)))

  const c = new Series({ hello: normal(100) })
  expect(min(c)).toBe(min(c.values))

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(min(d)).toBe(min(d.values))

  expect(min([2, 3, 4n])).toBe(2)
  expect(min([2n, 3n, 4])).toBe(2n)
  expect(min([234n, 234])).toBe(234n)
  expect(min([234, 234n])).toBe(234)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(min(e)).toBeNaN()
  expect(min(e, true)).not.toBeNaN()

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
    expect(() => min(item)).toThrow()
  })
})
