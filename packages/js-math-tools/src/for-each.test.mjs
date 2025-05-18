import { copy } from "./copy.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
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

  const c = new DataFrame(normal([10, 10]))
  const rowNames = []
  forEach(c, v => rowNames.push(v.name))
  expect(isEqual(rowNames, c.index)).toBe(true)

  const d = new Series(normal(100))
  const values = []
  forEach(d, v => values.push(v))
  expect(isEqual(values, d.values)).toBe(true)
})

test(
  "tests that the `forEach` function is faster than `Array.prototype.forEach`",
  () => {
    const x = map(range(0, 1e7), () => Math.random())
    const t1 = time(() => x.forEach(v => Math.sqrt(v)))
    const t2 = time(() => forEach(x, v => Math.sqrt(v)))
    expect(t2).toBeLessThan(t1)
  },
)
