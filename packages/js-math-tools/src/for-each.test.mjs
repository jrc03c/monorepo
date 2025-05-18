import { copy } from "./copy.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { time } from "./time.mjs"

test("tests that the `forEach` function works as expected", () => {
  const a = normal(100)
  const b = copy(a)
  forEach(b, (v, i) => b[i] *= 2)
  expect(a.length).toBe(100)
  expect(b.length).toBe(100)

  a.forEach((v, i) => {
    expect(b[i]).toBeCloseTo(a[i] * 2)
  })
})

test(
  "tests that the `forEach` function is faster than `Array.prototype.forEach`",
  () => {
    const x = range(0, 1e7).map(() => Math.random())
    const t1 = time(() => x.forEach(v => Math.sqrt(v)))
    const t2 = time(() => forEach(x, v => Math.sqrt(v)))
    expect(t2).toBeLessThan(t1)
  },
)
