import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { IndexMatcher } from "./index-matcher.mjs"
import { isEqual } from "./is-equal.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { Series, DataFrame } from "./dataframe/index.mjs"

function containsOnlyNumbers(x) {
  return flatten(x).every(v => isNumber(v))
}

test("tests that indices in Series and DataFrames can be correctly matched after dropping missing and/or NaN values", () => {
  const a = new Series({ hello: [2, 3, null, 4] })
  const bTrue = a.get([0, 1, 3], null)

  const bPred = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(a)

  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = new Series({
    hello: normal(100).map(v => (Math.random() < 0.05 ? null : v)),
  })

  const d = new Series({
    goodbye: normal(100).map(v => (Math.random() < 0.05 ? null : v)),
  })

  const eTrue = [
    c.filter((v, i) => !isUndefined(v) && !isUndefined(d.values[i])),
    d.filter((v, i) => !isUndefined(v) && !isUndefined(c.values[i])),
  ]

  const ePred = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(c, d)

  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new DataFrame({
    foo: normal(100).map(v => (Math.random() < 0.1 ? "yes" : v)),
    bar: normal(100).map(v => (Math.random() < 0.1 ? "no" : v)),
  })

  const g = new DataFrame({
    baz: normal(100).map(v => (Math.random() < 0.1 ? "hi" : v)),
    goodbye: normal(100).map(v => (Math.random() < 0.1 ? "bye" : v)),
  })

  const hTrue1 = [
    f.filter(
      (row, i) =>
        row.values.every(v => !isUndefined(v)) &&
        g.values[i].every(v => !isUndefined(v)),
    ),
    g.filter(
      (row, i) =>
        row.values.every(v => !isUndefined(v)) &&
        f.values[i].every(v => !isUndefined(v)),
    ),
  ]

  const hPred1 = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(f, g)

  expect(isEqual(hPred1, hTrue1)).toBe(true)

  const hTrue2 = [
    f.filter(
      (row, i) =>
        row.values.every(v => !isNaN(v)) && g.values[i].every(v => !isNaN(v)),
    ),
    g.filter(
      (row, i) =>
        row.values.every(v => !isNaN(v)) && f.values[i].every(v => !isNaN(v)),
    ),
  ]

  const hPred2 = new IndexMatcher().fitAndTransform(f, g)

  expect(isEqual(hPred2, hTrue2)).toBe(true)

  const iBigInts = new Series(normal(100).map(v => BigInt(Math.round(v * 100))))
  iBigInts.values[0] = null

  const jBigInts = new Series(normal(100).map(v => BigInt(Math.round(v * 100))))
  jBigInts.values[1] = null

  const iFloats = new Series(iBigInts.values.map(v => Number(v)))
  iFloats.values[0] = null

  const jFloats = new Series(jBigInts.values.map(v => Number(v)))
  jFloats.values[1] = null

  const [iBigIntsTransformed, jBigIntsTransformed] = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(iBigInts, jBigInts)

  const [iFloatsTransformed, jFloatsTransformed] = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(iFloats, jFloats)

  expect(isEqual(iBigIntsTransformed.index, iFloatsTransformed.index)).toBe(
    true,
  )

  expect(isEqual(jBigIntsTransformed.index, jFloatsTransformed.index)).toBe(
    true,
  )

  expect(isEqual(iBigIntsTransformed.index, jBigIntsTransformed.index)).toBe(
    true,
  )

  expect(
    isEqual(
      iBigIntsTransformed.values.map(v => Number(v)),
      iFloatsTransformed.values,
    ),
  ).toBe(true)

  expect(
    isEqual(
      jBigIntsTransformed.values.map(v => Number(v)),
      jFloatsTransformed.values,
    ),
  ).toBe(true)

  const k = normal(100)
  k[0] = "uh-oh!"
  const m = normal(100)
  m[1] = "uh-oh!"

  expect(
    isEqual(
      new IndexMatcher().fitAndTransform(k, m),
      new IndexMatcher()
        .fitAndTransform(new Series(k), new Series(m))
        .map(v => v.values),
    ),
  ).toBe(true)

  const n = normal([100, 5])
  n[0][0] = "uh-oh!"
  const p = normal([100, 5])
  p[1][1] = "uh-oh!"

  const [q, r] = new IndexMatcher().fitAndTransform(n, p)

  expect(
    isEqual(
      [q, r],
      new IndexMatcher()
        .fitAndTransform(new DataFrame(n), new DataFrame(p))
        .map(v => v.values),
    ),
  ).toBe(true)

  expect(containsOnlyNumbers(n)).toBe(false)
  expect(containsOnlyNumbers(p)).toBe(false)
  expect(containsOnlyNumbers(q)).toBe(true)
  expect(containsOnlyNumbers(r)).toBe(true)
  expect(q.length < n.length).toBe(true)
  expect(r.length < p.length).toBe(true)

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
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
  ]

  range(0, 100).forEach(() => {
    const vars = range(0, Math.random() * 10 + 5).map(
      () => wrongs[parseInt(Math.random() * wrongs.length)],
    )

    expect(() => new IndexMatcher().fitAndTransform(...vars)).toThrow()
  })
})
