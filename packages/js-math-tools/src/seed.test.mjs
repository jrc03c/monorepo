import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { random, seed } from "./random.mjs"

test("tests that random numbers can be seeded correctly", () => {
  const a = random()
  const b = random()
  expect(a).not.toBe(b)

  seed(1234567)
  const c = random()
  seed(1234567)
  const d = random()
  expect(c).toBe(d)

  seed(7654321)
  const e = random([2, 3, 4, 5])
  seed(7654321)
  const f = random([2, 3, 4, 5])
  expect(isEqual(e, f)).toBe(true)

  seed(7654321n)
  const g = random([2, 3, 4, 5])
  expect(isEqual(f, g)).toBe(true)

  const wrongs = [
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    Symbol.for("Hello, world!"),
    [2, 3, 4],
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
    expect(() => seed(item)).toThrow()
  })
})
