import { expect, test } from "@jrc03c/fake-jest"
import { map } from "./map.mjs"
import { range } from "./range.mjs"
import { reduce } from "./reduce.mjs"
import { time } from "./time.mjs"

test("tests that the `reduce` function works as expected", () => {
  const x = map(range(0, 100), () => Math.random())
  const sum1 = x.reduce((s, v) => s + v, 0)
  const sum2 = reduce(x, (s, v) => s + v, 0)
  expect(sum2).toBe(sum1)
})

test(
  "tests that the `reduce` function is faster than `Array.prototype.reduce`",
  () => {
    const x = map(range(0, 1e7), () => Math.random())
    const t1 = time(() => x.reduce((s, v) => s * v, 1))
    const t2 = time(() => reduce(x, (s, v) => s * v, 1))
    expect(t2).toBeLessThan(t1)
  },
)
