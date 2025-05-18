import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { filter } from "./filter.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { time } from "./time.mjs"

test("tests that the `filter` function works as expected", () => {
  const x = range(0, 100).map(() => Math.random())
  const ytrue = x.filter(v => v > 0.5)
  const ypred = filter(x, v => v > 0.5)
  expect(isEqual(ypred, ytrue)).toBe(true)

  const c = new DataFrame(normal([10, 10]))
  const dtrue = c.values.filter(v => v[0] > 0)
  const dpred = filter(c, v => v.values[0] > 0).values
  expect(isEqual(dpred, dtrue)).toBe(true)

  const e = new Series(normal(100))
  const ftrue = e.values.filter(v => v < 0)
  const fpred = filter(e, v => v < 0).values
  expect(isEqual(fpred, ftrue)).toBe(true)
})

test(
  "tests that the `filter` function is faster than `Array.prototype.filter`",
  () => {
    const x = range(0, 1e7).map(() => Math.random())
    const t1 = time(() => x.filter(v => v > 0.5))
    const t2 = time(() => filter(x, v => v > 0.5))
    expect(t2).toBeLessThan(t1)
  },
)
