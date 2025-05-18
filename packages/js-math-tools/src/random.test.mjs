import { abs } from "./abs.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { mean } from "./mean.mjs"
import { random, seed } from "./random.mjs"
import { shape } from "./shape.mjs"
import { std } from "./std.mjs"

test("tests that random numbers can be generated correctly", () => {
  expect(typeof random()).toBe("number")
  expect(random(5) instanceof Array).toBe(true)

  const a = random(10000)
  expect(abs(mean(a) - 0.5)).toBeLessThan(0.05)
  expect(abs(std(a) - 0.25)).toBeLessThan(0.05)

  const b = random([10, 10, 10, 10])
  expect(abs(mean(b) - 0.5)).toBeLessThan(0.05)
  expect(abs(std(b) - 0.28869)).toBeLessThan(0.05)

  seed(1234567)
  const c = random(100)
  seed(1234567)
  const d = random(100)
  expect(c).toStrictEqual(d)

  expect(shape(random([2n, 3n, 4n]))).toStrictEqual(shape(random([2, 3, 4])))

  const wrongs = [
    2.3,
    -2.3,
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

  forEach(wrongs, item => {
    expect(() => random(item)).toThrow()
  })
})
