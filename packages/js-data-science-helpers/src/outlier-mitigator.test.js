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

test("tests that outliers can be correctly clipped", () => {
  const gator1 = new OutlierMitigator()
  expect(isEqual(gator1.fitAndTransform(zeros(100)), zeros(100))).toBe(true)
  expect(isEqual(gator1.fitAndTransform(ones(100)), ones(100))).toBe(true)
  expect(isEqual(gator1.fitAndTransform(range(0, 100)), range(0, 100))).toBe(
    true,
  )

  expect(
    isEqual(
      gator1.fitAndTransform(range(0, 10).concat([1000])),
      range(0, 10).concat([1000]),
    ),
  ).toBe(false)

  const a = [1, 2, 3, 4, 1000]
  const aMed = median(a)
  const aMad = median(a.map(v => Math.abs(v - aMed)))
  const bTrue = [1, 2, 3, 4, aMed + 5 * aMad]
  const bPred = new OutlierMitigator().fitAndTransform(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = random(1000)
  expect(isEqual(new OutlierMitigator().fitAndTransform(c), c)).toBe(true)

  const d = reshape(
    normal(1000).map(v => (Math.random() < 0.05 ? 1e20 : v)),
    [10, 10, 10],
  )

  const dMed = median(d)
  const dMad = median(flatten(d).map(v => Math.abs(v - dMed)))

  flatten(new OutlierMitigator().fitAndTransform(d)).forEach(v => {
    expect(v <= dMed + 5 * dMad).toBe(true)
    expect(v >= dMed - 5 * dMad).toBe(true)
  })

  const e = new Series({ hello: normal(100) })
  const fTrue = new OutlierMitigator().fitAndTransform(e)
  const fPred = new OutlierMitigator().fitAndTransform(e.values)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: normal(100), bar: normal(100) })
  const hTrue = new OutlierMitigator().fitAndTransform(g)
  const hPred = new OutlierMitigator().fitAndTransform(g.values)
  expect(isEqual(hTrue, hPred)).toBe(true)

  const j = normal(100).concat([10000])
  const jmin = min(j)

  const kTrue = new OutlierMitigator()
    .fitAndTransform(j)
    .map(v => log(v - jmin + 1))

  const kPred = new OutlierMitigator({
    isAllowedToTakeTheLog: true,
  }).fitAndTransform(j)

  expect(isEqual(kTrue, kPred)).toBe(true)

  const m = normal(100).concat([10000])
  const mmin = min(m)
  const nTrue = log(m.map(v => v - mmin + 1))

  const nPred = new OutlierMitigator({
    isAllowedToClip: false,
    isAllowedToTakeTheLog: true,
  }).fitAndTransform(m)

  expect(isEqual(nTrue, nPred)).toBe(true)

  const p = normal(100).concat([10000])
  const qTrue = p.slice()

  const qPred = new OutlierMitigator({
    isAllowedToClip: false,
  }).fitAndTransform(p)

  expect(isEqual(qTrue, qPred)).toBe(true)

  const r = [2n, 3n, 4n, 5n, 10000n]

  expect(
    isEqual(
      new OutlierMitigator().fitAndTransform(r),
      new OutlierMitigator().fitAndTransform(r.map(v => Number(v))),
    ),
  ).toBe(true)

  const s = normal(100)
  s[0] = "uh-oh!"

  expect(
    isEqual(
      new OutlierMitigator().fitAndTransform(s),
      new OutlierMitigator().fitAndTransform([s[0]].concat(s.slice(1))),
    ),
  ).toBe(true)

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
    expect(() => new OutlierMitigator().fitAndTransform(item)).toThrow()
  })
})
