import { abs } from "./abs.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { mean } from "./mean.mjs"
import { normal } from "./normal.mjs"
import { seed } from "./random.mjs"
import { shape } from "./shape.mjs"
import { std } from "./std.mjs"

test("tests that normally-distributed random numbers can be generated correctly", () => {
  expect(typeof normal()).toBe("number")
  expect(normal(5) instanceof Array).toBe(true)

  const a = normal(10000)
  expect(abs(mean(a))).toBeLessThan(0.05)
  expect(abs(std(a) - 1)).toBeLessThan(0.05)

  const b = normal([10, 10, 10, 10])
  expect(abs(mean(b))).toBeLessThan(0.05)
  expect(abs(std(b) - 1)).toBeLessThan(0.05)

  seed(1234567)
  const c = normal(100)
  seed(1234567)
  const d = normal(100)
  expect(c).toStrictEqual(d)

  expect(shape(normal([2n, 3n, 4n]))).toStrictEqual(shape(normal([2, 3, 4])))

  const wrongs = [
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    Symbol.for("Hello, world!"),
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(item => {
    expect(() => normal(item)).toThrow()
  })
})
