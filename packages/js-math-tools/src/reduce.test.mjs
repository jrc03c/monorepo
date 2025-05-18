import { DataFrame, Series } from "./dataframe/index.mjs"
import { distance } from "./distance.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { reduce } from "./reduce.mjs"
import { time } from "./time.mjs"

test("tests that the `reduce` function works as expected", () => {
  const x = range(0, 100).map(() => Math.random())
  const sum1 = x.reduce((s, v) => s + v, 0)
  const sum2 = reduce(x, (s, v) => s + v, 0)
  expect(sum2).toBe(sum1)

  const a = new DataFrame(normal([10, 10]))
  const btrue = a.values.reduce((arr, row) => arr.concat([row[0]]), [])
  const bpred = reduce(a, (arr, row) => arr.concat([row.values[0]]), [])
  expect(distance(bpred, btrue)).toBeCloseTo(0)

  const c = new Series(normal(100))
  const dtrue = c.values.reduce((sum, v) => sum + v, 0)
  const dpred = reduce(c, (sum, v) => sum + v, 0)
  expect(dpred).toBe(dtrue)
})

test(
  "tests that the `reduce` function is faster than `Array.prototype.reduce`",
  () => {
    const x = range(0, 1e7).map(() => Math.random())
    const t1 = time(() => x.reduce((s, v) => s * v, 1))
    const t2 = time(() => reduce(x, (s, v) => s * v, 1))
    expect(t2).toBeLessThan(t1)
  },
)
