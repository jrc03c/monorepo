import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { isEqual } from "./is-equal.mjs"
import { max } from "./max.mjs"
import { min } from "./min.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { remap } from "./remap.mjs"
import { reshape } from "./reshape.mjs"

test("tests that values can be remapped correctly from one range to another", () => {
  expect(remap(5, 0, 10, 0, 100)).toBe(50)
  expect(remap(2.5, -10, 10, 64, 104)).toBe(89)
  expect(remap(1, 0, 10, 10, 0)).toBe(9)

  const a = normal(100)
  const b = normal()
  const c = normal()
  const d = normal()
  const e = normal()

  expect(
    isEqual(
      remap(a, b, c, d, e),
      a.map(v => remap(v, b, c, d, e)),
    ),
  ).toBe(true)

  expect(remap(1, 1, 1, 1, 1)).toBeNaN()

  const f = normal([2, 3, 4, 5])
  const g = normal([2, 3, 4, 5])
  const h = normal([2, 3, 4, 5])
  const i = normal([2, 3, 4, 5])
  const j = normal([2, 3, 4, 5])

  expect(
    isEqual(
      remap(f, g, h, i, j),
      reshape(remap(...[f, g, h, i, j].map(flatten)), [2, 3, 4, 5]),
    ),
  )

  const series = range(0, 5).map(() => new Series(normal(100)))

  expect(
    isEqual(remap(...series), new Series(remap(...series.map(s => s.values)))),
  ).toBe(true)

  const dataframes = range(0, 5).map(() => new DataFrame(normal([10, 10])))

  expect(
    isEqual(
      remap(...dataframes),
      new DataFrame(remap(...dataframes.map(v => v.values))),
    ),
  )

  const k = normal([2, 3, 4, 5])
  const kMin = min(k)
  const kMax = max(k)

  const lTrue = reshape(
    flatten(k).map(v => remap(v, kMin, kMax, 50, 100)),
    [2, 3, 4, 5],
  )

  const lPred = remap(k, 50, 100)
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = normal([2, 3, 4, 5])
  const n = remap(m, 0, 1)
  expect(min(n)).toBeGreaterThanOrEqualTo(0)
  expect(max(n)).toBeLessThanOrEqualTo(1)

  expect(remap(5n, 0n, 10n, 0n, 100n)).toBe(50n)
  expect(remap(5.234, 0n, 10n, 0n, 100n)).toBeCloseTo(52.34)

  const wrongs = [
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

  for (let i = 0; i < 100; i++) {
    const vals = range(0, 5).map(
      () => wrongs[parseInt(Math.random() * wrongs.length)],
    )

    expect(remap(...vals)).toBeNaN()
  }
})
