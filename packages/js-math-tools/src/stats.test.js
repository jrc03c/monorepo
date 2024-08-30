const count = require("./count")
const isEqual = require("./is-equal")
const max = require("./max")
const mean = require("./mean")
const median = require("./median")
const min = require("./min")
const mode = require("./mode")
const normal = require("./normal")
const stats = require("./stats")
const stdev = require("./stdev")
const sum = require("./sum")
const variance = require("./variance")

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
})
