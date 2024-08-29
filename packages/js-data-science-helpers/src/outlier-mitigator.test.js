const {
  DataFrame,
  flatten,
  isEqual,
  log,
  median,
  min,
  normal,
  ones,
  random,
  range,
  reshape,
  Series,
  zeros,
} = require("@jrc03c/js-math-tools")

const OutlierMitigator = require("./outlier-mitigator")
const common = require("./common")

test("tests that outliers can be correctly clipped", () => {
  const gator1 = new OutlierMitigator()
  expect(isEqual(gator1.fitTransform(zeros(100)), zeros(100))).toBe(true)
  expect(isEqual(gator1.fitTransform(ones(100)), ones(100))).toBe(true)
  expect(isEqual(gator1.fitTransform(range(0, 100)), range(0, 100))).toBe(true)

  expect(
    isEqual(
      gator1.fitTransform(range(0, 10).concat([1000])),
      range(0, 10).concat([1000]),
    ),
  ).toBe(false)

  const a = [1, 2, 3, 4, 1000]
  const aMed = median(a)
  const aMad = median(a.map(v => Math.abs(v - aMed)))
  const bTrue = [1, 2, 3, 4, aMed + 5 * aMad]
  const bPred = new OutlierMitigator().fitTransform(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = random(1000)
  expect(isEqual(new OutlierMitigator().fitTransform(c), c)).toBe(true)

  const d = reshape(
    normal(1000).map(v => (Math.random() < 0.05 ? 1e20 : v)),
    [10, 10, 10],
  )

  const dMed = median(d)
  const dMad = median(flatten(d).map(v => Math.abs(v - dMed)))

  flatten(new OutlierMitigator().fitTransform(d)).forEach(v => {
    expect(v <= dMed + 5 * dMad).toBe(true)
    expect(v >= dMed - 5 * dMad).toBe(true)
  })

  const e = new Series({ hello: normal(100) })
  const fTrue = new OutlierMitigator().fitTransform(e)
  const fPred = new OutlierMitigator().fitTransform(e.values)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: normal(100), bar: normal(100) })
  const hTrue = new OutlierMitigator().fitTransform(g)
  const hPred = new OutlierMitigator().fitTransform(g.values)
  expect(isEqual(hTrue, hPred)).toBe(true)

  const i = [2, 3, 4, 1000, "foo"]

  common.shouldIgnoreNaNValues = false

  expect(
    isEqual(new OutlierMitigator().fitTransform(i), [NaN, NaN, NaN, NaN, NaN]),
  ).toBe(true)

  common.shouldIgnoreNaNValues = true

  expect(
    isEqual(new OutlierMitigator().fitTransform(i), [NaN, NaN, NaN, NaN, NaN]),
  ).not.toBe(true)

  const j = normal(100).concat([10000])
  const jmin = min(j)

  const kTrue = new OutlierMitigator()
    .fitTransform(j)
    .map(v => log(v - jmin + 1))

  const kPred = new OutlierMitigator({
    isAllowedToTakeTheLog: true,
  }).fitTransform(j)

  expect(isEqual(kTrue, kPred)).toBe(true)

  const m = normal(100).concat([10000])
  const mmin = min(m)
  const nTrue = log(m.map(v => v - mmin + 1))

  const nPred = new OutlierMitigator({
    isAllowedToClip: false,
    isAllowedToTakeTheLog: true,
  }).fitTransform(m)

  expect(isEqual(nTrue, nPred)).toBe(true)

  const p = normal(100).concat([10000])
  const qTrue = p.slice()
  const qPred = new OutlierMitigator({ isAllowedToClip: false }).fitTransform(p)
  expect(isEqual(qTrue, qPred)).toBe(true)

  throw new Error("Add BigInt unit tests!")

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

  wrongs.forEach(item => {
    expect(() => new OutlierMitigator().fitTransform(item)).toThrow()
  })
})
