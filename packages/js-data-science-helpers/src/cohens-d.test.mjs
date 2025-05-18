import { cohensd } from "./cohens-d.mjs"

import {
  DataFrame,
  float,
  forEach,
  map,
  normal,
  Series,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"

test("tests that Cohen's D can be correctly calculated", () => {
  const a = normal(100)
  expect(cohensd(a, a)).toBe(0)

  const b = normal(10000)
  const c = normal(10000)
  expect(Math.abs(cohensd(b, c))).toBeLessThan(0.1)

  const d = new Series(normal(100))
  const e = new Series(map(normal(100), v => v + 110))
  expect(Math.abs(cohensd(d, e))).toBeGreaterThan(100)

  const f = [2, 3, 4]
  const g = [5, 6, "seven"]
  expect(cohensd(f, g)).toBeNaN()
  expect(cohensd(f, g, true)).not.toBeNaN()

  const h = map(normal(100), v => BigInt(Math.round(v)))
  const i = map(normal(100), v => BigInt(Math.round(v)))
  expect(cohensd(h, i)).toBeCloseTo(cohensd(float(h), float(i)))

  const j = normal(100)
  j[0] = "uh-oh!"
  const k = normal(100)
  k[1] = "uh-oh!"
  expect(cohensd(j, k)).toBeNaN()
  expect(cohensd(j, k, true)).not.toBeNaN()

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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, a => {
    forEach(wrongs, b => {
      expect(() => cohensd(a, b)).toThrow()
    })
  })
})
