import { expect, test } from "@jrc03c/fake-jest"
import { filter } from "./filter.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { range } from "./range.mjs"
import { time } from "./time.mjs"

test("tests that the `filter` function works as expected", () => {
  const x = map(range(0, 100), () => Math.random())
  const ytrue = x.filter(v => v > 0.5)
  const ypred = filter(x, v => v > 0.5)
  expect(isEqual(ypred, ytrue)).toBe(true)
})

test(
  "tests that the `filter` function is faster than `Array.prototype.filter`",
  () => {
    const x = map(range(0, 1e7), () => Math.random())
    const t1 = time(() => x.filter(v => v > 0.5))
    const t2 = time(() => filter(x, v => v > 0.5))
    expect(t2).toBeLessThan(t1)
  },
)
