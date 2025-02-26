import { count } from "./count.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "./is-equal.mjs"
import { max } from "./max.mjs"
import { mean } from "./mean.mjs"
import { median } from "./median.mjs"
import { min } from "./min.mjs"
import { mode } from "./mode.mjs"
import { normal } from "./normal.mjs"
import { set } from "./set.mjs"
import { sort } from "./sort.mjs"
import { stats } from "./stats.mjs"
import { stdev } from "./stdev.mjs"
import { sum } from "./sum.mjs"
import { variance } from "./variance.mjs"

test("tests that basic stats can be computed for datasets", () => {
  const a = normal(100)

  const results = stats(a, {
    median: true,
    mode: true,
    stdev: true,
    variance: true,
  })

  expect(isEqual(results.counts, count(a))).toBe(true)
  expect(isEqual(results.max, max(a))).toBe(true)
  expect(isEqual(results.mean, mean(a))).toBe(true)
  expect(isEqual(results.median, median(a))).toBe(true)
  expect(isEqual(results.min, min(a))).toBe(true)
  expect(isEqual(results.mode, mode(a))).toBe(true)
  expect(isEqual(results.stdev, stdev(a))).toBe(true)
  expect(isEqual(results.sum, sum(a))).toBe(true)
  expect(isEqual(results.variance, variance(a))).toBe(true)

  const b = normal(100)

  for (let i = 0; i < 0.1 * b.length; i++) {
    b[Math.round(Math.random() * b.length)] = "foo"
  }

  const results2 = stats(b, {
    median: true,
    mode: true,
    stdev: true,
    variance: true,
  })

  expect(results2.max).toBeNaN()
  expect(results2.mean).toBeNaN()
  expect(results2.median).toBeNaN()
  expect(results2.min).toBeNaN()
  expect(results2.stdev).toBeNaN()
  expect(results2.sum).toBeNaN()
  expect(results2.variance).toBeNaN()
  expect(isEqual(sort(set(b)), sort(results2.counts.values)))

  const results3 = stats(b, {
    shouldDropNaNs: true,
    median: true,
    mode: true,
    stdev: true,
    variance: true,
  })

  expect(results3.max).not.toBeNaN()
  expect(results3.mean).not.toBeNaN()
  expect(results3.median).not.toBeNaN()
  expect(results3.min).not.toBeNaN()
  expect(results3.stdev).not.toBeNaN()
  expect(results3.sum).not.toBeNaN()
  expect(results3.variance).not.toBeNaN()
  expect(isEqual(sort(set(b)), sort(results3.counts.values)))
})
