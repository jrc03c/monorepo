import {
  copy,
  DataFrame,
  forEach,
  map,
  normal,
  random,
  Series,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getCorrelationMatrix } from "./get-correlation-matrix.mjs"
import { isCorrelationMatrix } from "./is-correlation-matrix.mjs"

test("tests that correlation matrices can be correctly identified", () => {
  const a = normal([100, 5])
  const b = normal([100, 7])
  const c = getCorrelationMatrix(a, b)
  const d = copy(c)
  expect(isCorrelationMatrix(c)).toBe(true)
  expect(isCorrelationMatrix(d)).toBe(true)

  const e = new DataFrame(normal([100, 5]))
  const f = new DataFrame(normal([100, 7]))
  const g = getCorrelationMatrix(e, f)
  const h = g.copy()
  expect(isCorrelationMatrix(g)).toBe(true)
  expect(isCorrelationMatrix(h)).toBe(true)

  expect(isCorrelationMatrix(normal([25, 25]))).toBe(false)
  expect(isCorrelationMatrix(random([25, 25]))).toBe(true)

  expect(
    isCorrelationMatrix(
      getCorrelationMatrix([
        [2n, 3n],
        [-4n, -5n],
      ]),
    ),
  ).toBe(true)

  expect(
    isCorrelationMatrix(
      getCorrelationMatrix(
        map(normal([100, 5]), row =>
          map(row, v => BigInt(Math.round(v * 100))),
        ),
      ),
    ),
  ).toBe(true)

  const i = random([10, 10])
  i[0][0] = "uh-oh!"
  expect(isCorrelationMatrix(i)).toBe(true)

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
    expect(isCorrelationMatrix(item)).toBe(false)
  })
})
