import {
  add,
  DataFrame,
  divide,
  int,
  isEqual,
  isNumber,
  max,
  min,
  normal,
  random,
  range,
  remap,
  Series,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getCorrelationMatrix } from "./get-correlation-matrix.mjs"
import { hunterChainSort } from "./hunter-chain-sort.mjs"

test("sorts a random correlation matrix", () => {
  const a = normal([1000, 5])
  const b = getCorrelationMatrix(a)
  expect(() => hunterChainSort(b)).not.toThrow()

  const c = new DataFrame(b)
  c.index = c.columns.slice()

  const d = hunterChainSort(c)
  expect(isEqual(hunterChainSort(b), d.values)).toBe(true)

  d.values.forEach((row, i) => {
    if (i < d.shape[0] - 2) {
      const r1 = d.values[(i + 1, i)]
      const r2 = d.values[(i + 2, i + 1)]

      if (!isNaN(r1) && !isNaN(r2)) {
        expect(r2).toBeGreaterThanOrEqual(r1)
      }
    }
  })

  // make sure that NaNs are handled correctly
  const e = new DataFrame(normal([10, 10]))
  e.index = e.columns
  e.values = divide(add(e.values, e.transpose().values), 2)
  e.values = remap(e.values, min(e.values), max(e.values), -1, 1)

  e.values.forEach((row, i) => {
    e.values[i][i] = 1
  })

  const possibles = [
    NaN,
    null,
    undefined,
    true,
    false,
    "Hello, world!",
    { foo: "bar" },
    Symbol.for("friend"),
    x => x,
  ]

  range(0, 0.1 * e.shape[0] * e.shape[1]).forEach(() => {
    const i = int(random() * e.shape[0])
    const j = int(random() * e.shape[1])
    const v = possibles[int(random() * possibles.length)]

    if (isNumber(e.values[i][j])) {
      e.values[i][j] = v
      e.values[j][i] = v
    }
  })

  const f = hunterChainSort(e).values

  expect(
    f.some(row =>
      row.some(v => {
        try {
          return isNaN(v)
        } catch (e) {
          return true
        }
      }),
    ),
  ).toBe(true)

  expect(f.some(row => row.some(v => isNumber(v)))).toBe(true)

  const g = normal([10, 10]).map(row =>
    row.map(v => BigInt(Math.round(v * 100))),
  )

  const h = hunterChainSort(g)
  expect(h.every(row => row.every(v => isNumber(v)))).toBe(true)

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
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  wrongs.forEach(item => {
    expect(() => hunterChainSort(item)).toThrow()
  })
})
