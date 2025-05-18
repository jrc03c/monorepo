import { DataFrame, Series } from "./dataframe/index.mjs"
import { distance } from "./distance.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { time } from "./time.mjs"

test("tests that the `map` function works as expected", () => {
  const x = range(0, 100).map(() => Math.random())
  const ytrue = x.map(v => v * v)
  const ypred = map(x, v => v * v)
  expect(isEqual(ypred, ytrue)).toBe(true)

  const a = new DataFrame(normal([10, 10]))
  const btrue = new DataFrame(a.values.map(row => row.map(v => v * 2)))
  const bpred = map(a, row => row.values.map(v => v * 2))
  expect(distance(bpred, btrue)).toBeCloseTo(0)

  const c = new Series(normal(100))
  const dtrue = new Series(c.values.map(v => v * v))
  const dpred = map(c, v => v * v)
  expect(distance(dpred, dtrue)).toBeCloseTo(0)
})

test(
  "tests that the `map` function is faster than `Array.prototype.map`",
  () => {
    const x = range(0, 1e7).map(() => Math.random())
    const t1 = time(() => x.map(v => v * v))
    const t2 = time(() => map(x, v => v * v))
    expect(t2).toBeLessThan(t1)
  },
)
