import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { range } from "./range.mjs"
import { time } from "./time.mjs"

test("tests that the `map` function works as expected", () => {
  const x = range(0, 100).map(() => Math.random())
  const ytrue = x.map(v => v * v)
  const ypred = map(x, v => v * v)
  expect(isEqual(ypred, ytrue)).toBe(true)
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
