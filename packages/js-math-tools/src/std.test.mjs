import { DataFrame, Series } from "./dataframe/index.mjs"
import { random } from "./random.mjs"
import { abs } from "./abs.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { std } from "./std.mjs"

test("tests that standard deviations can be correctly computed", () => {
  const a = normal(10000)
  expect(abs(std(a) - 1)).toBeLessThan(0.05)

  const b = random(10000)
  expect(abs(std(b) - 0.28)).toBeLessThan(0.05)

  const c = new Series({ hello: normal(100) })
  expect(isEqual(std(c), std(c.values))).toBe(true)

  const d = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(std(d), std(d.values))).toBe(true)

  expect(std([2n, 3n, 4n, 5n, 6n])).toBe(std([2, 3, 4, 5, 6]))

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(std(e)).toBeNaN()
  expect(std(e, true)).not.toBeNaN()

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
    expect(() => std(item)).toThrow()
  })
})
