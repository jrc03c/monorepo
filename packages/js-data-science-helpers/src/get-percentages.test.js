const {
  DataFrame,
  isEqual,
  normal,
  round,
  Series,
  sort,
  stats,
  sum,
} = require("@jrc03c/js-math-tools")

const getPercentages = require("./get-percentages")

test("tests that percentages of values in an array can be computed correctly", () => {
  const a = [2, 3, 3, 4]

  const bTrue = [
    { value: 2, count: 1, percentage: 0.25 },
    { value: 3, count: 2, percentage: 0.5 },
    { value: 4, count: 1, percentage: 0.25 },
  ]

  const bPred = getPercentages(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = round(normal([2, 3, 4, 5]))
  const cstats = stats(c)
  const cvalues = cstats.counts.values
  const ctotal = sum(cstats.counts.counts)

  const dTrue = sort(
    cvalues.map(v => {
      const vcount = cstats.counts.get(v)
      const percentage = vcount / ctotal
      return { value: v, count: vcount, percentage }
    }),
    (a, b) => a.value - b.value,
  )

  const dPred = sort(getPercentages(c), (a, b) => a.value - b.value)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: round(normal(100)) })
  expect(isEqual(getPercentages(e), getPercentages(e.values))).toBe(true)

  const f = new DataFrame({ foo: round(normal(100)), bar: round(normal(100)) })
  expect(isEqual(getPercentages(f), getPercentages(f.values))).toBe(true)

  const g = [2n, 3n, 3n, 4n]

  const hTrue = [
    { value: 2n, count: 1, percentage: 0.25 },
    { value: 3n, count: 2, percentage: 0.5 },
    { value: 4n, count: 1, percentage: 0.25 },
  ]

  const hPred = getPercentages(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = [2, 2, 2, 2, 2, 3, 3, 3, "foo", "bar"]

  const jTrue1 = [
    { value: 2, count: 5, percentage: 0.5 },
    { value: 3, count: 3, percentage: 0.3 },
    { value: "foo", count: 1, percentage: 0.1 },
    { value: "bar", count: 1, percentage: 0.1 },
  ]

  const jPred1 = getPercentages(i)
  expect(isEqual(jPred1, jTrue1)).toBe(true)

  const jTrue2 = [
    { value: 2, count: 5, percentage: 0.625 },
    { value: 3, count: 3, percentage: 0.375 },
  ]

  const jPred2 = getPercentages(i, true)
  expect(isEqual(jPred2, jTrue2)).toBe(true)

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    Infinity,
    -Infinity,
    NaN,
    "foo",
    true,
    false,
    null,
    undefined,
    Symbol.for("Hello, world!"),
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  wrongs.forEach(value => {
    expect(() => getPercentages(value)).toThrow()
  })
})
