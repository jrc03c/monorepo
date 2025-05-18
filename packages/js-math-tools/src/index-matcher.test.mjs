import { expect, test } from "@jrc03c/fake-jest"
import { filter } from "./filter.mjs"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { IndexMatcher } from "./index-matcher.mjs"
import { isEqual } from "./is-equal.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"
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
    hello: map(normal(100), v => (Math.random() < 0.05 ? null : v)),
  })

  const d = new Series({
    goodbye: map(normal(100), v => (Math.random() < 0.05 ? null : v)),
  })

  const eTrue = [
    filter(c, (v, i) => !isUndefined(v) && !isUndefined(d.values[i])),
    filter(d, (v, i) => !isUndefined(v) && !isUndefined(c.values[i])),
  ]

  const ePred = new IndexMatcher(
    IndexMatcher.DROP_MISSING_MODE,
  ).fitAndTransform(c, d)

  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new DataFrame({
    foo: map(normal(100), v => (Math.random() < 0.1 ? "yes" : v)),
    bar: map(normal(100), v => (Math.random() < 0.1 ? "no" : v)),
  })

  const g = new DataFrame({
    baz: map(normal(100), v => (Math.random() < 0.1 ? "hi" : v)),
    goodbye: map(normal(100), v => (Math.random() < 0.1 ? "bye" : v)),
  })

  const hTrue1 = [
    filter(
      f,
      (row, i) =>
        row.values.every(v => !isUndefined(v)) &&
        g.values[i].every(v => !isUndefined(v)),
    ),
    filter(
      g,
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
    filter(
      f,
      (row, i) =>
        row.values.every(v => !isNaN(v)) && g.values[i].every(v => !isNaN(v)),
    ),
    filter(
      g,
      (row, i) =>
        row.values.every(v => !isNaN(v)) && f.values[i].every(v => !isNaN(v)),
    ),
  ]

  const hPred2 = new IndexMatcher().fitAndTransform(f, g)

  expect(isEqual(hPred2, hTrue2)).toBe(true)

  const iBigInts = new Series(
    map(normal(100), v => BigInt(Math.round(v * 100))),
  )

  iBigInts.values[0] = null

  const jBigInts = new Series(
    map(normal(100), v => BigInt(Math.round(v * 100))),
  )

  jBigInts.values[1] = null

  const iFloats = new Series(map(iBigInts.values, v => Number(v)))
  iFloats.values[0] = null

  const jFloats = new Series(map(jBigInts.values, v => Number(v)))
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
      map(iBigIntsTransformed.values, v => Number(v)),
      iFloatsTransformed.values,
    ),
  ).toBe(true)

  expect(
    isEqual(
      map(jBigIntsTransformed.values, v => Number(v)),
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
      map(
        new IndexMatcher().fitAndTransform(new Series(k), new Series(m)),
        v => v.values,
      ),
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
      map(
        new IndexMatcher().fitAndTransform(new DataFrame(n), new DataFrame(p)),
        v => v.values,
      ),
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

  forEach(range(0, 100), () => {
    const vars = map(
      range(0, Math.random() * 10 + 5),
      () => wrongs[parseInt(Math.random() * wrongs.length)],
    )

    expect(() => new IndexMatcher().fitAndTransform(...vars)).toThrow()
  })
})
