const { DataFrame, Series } = require("./dataframe")
const flatten = require("./flatten")
const mean = require("./mean")
const normal = require("./normal")

test("tests that the mean of arrays, series, and dataframes can be computed correctly", () => {
  expect(mean([2, 3, 4])).toBe(3)
  expect(mean([2, 3, 4, 5])).toBe(3.5)
  expect(mean([2, [3, [4, [5]]]])).toBe(3.5)

  const a = normal([2, 3, 4, 5])
  expect(mean(a)).toBe(mean(flatten(a)))

  const b = new Series({ hello: normal(100) })
  expect(mean(b)).toBe(mean(b.values))

  const c = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(mean(c)).toBe(mean(flatten(c)))

  const d = [2n, 3n, 3n, 3n, 4n, 17n]
  const e = [2, 3, 3, 3, 4, 17]
  expect(mean(d)).toBe(mean(e))

  expect(mean([2n, 3n, 4n])).toBe(3n)

  const f = normal(100)
  f[0] = "uh-oh!"
  expect(mean(f)).toBeNaN()
  expect(mean(f, true)).not.toBeNaN()

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
    expect(() => mean(item)).toThrow()
  })
})
