import {
  add,
  DataFrame,
  forEach,
  isDataFrame,
  isEqual,
  isNumber,
  isUndefined,
  map,
  normal,
  range,
  scale,
  shape,
  Series,
  transpose,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getHighlyCorrelatedColumns } from "./get-highly-correlated-columns.mjs"
import { orthonormalize } from "./orthonormalize.mjs"

test("tests that highly correlated columns in matrices can be correctly identified", () => {
  const a = normal(100)
  const b = new DataFrame({ foo: a, bar: a, baz: a })

  const cTrue = {
    foo: ["bar", "baz"],
    bar: ["baz", "foo"],
    baz: ["bar", "foo"],
  }

  const cPred = getHighlyCorrelatedColumns(b)

  forEach(
    Object.keys(cPred),
    key => (cPred[key] = map(cPred[key], v => v.column)),
  )

  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = normal(100)

  const e = new DataFrame({
    d1: d,
    d2: add(d, scale(1e-5, normal(100))),
    d3: add(d, normal(100)),
    d4: add(d, scale(1e5, normal(100))),
  })

  const fTrue = { d1: ["d2"], d2: ["d1"] }
  const fPred = getHighlyCorrelatedColumns(e)

  forEach(
    Object.keys(fPred),
    key => (fPred[key] = map(fPred[key], v => v.column)),
  )

  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame(normal([100, 5]))

  expect(
    isEqual(
      getHighlyCorrelatedColumns(g),
      getHighlyCorrelatedColumns(g.values),
    ),
  ).toBe(true)

  const h = new DataFrame(orthonormalize(normal([100, 10])))
  const iTrue = {}
  const iPred = getHighlyCorrelatedColumns(h)
  expect(isEqual(iPred, iTrue)).toBe(true)

  const j = normal(100)

  const k = new DataFrame(
    transpose(map(range(0, 5), () => add(j, scale(1e-20, normal(100))))),
  )

  const mTrue = getHighlyCorrelatedColumns(k)

  forEach(
    Object.keys(mTrue),
    key => (mTrue[key] = map(mTrue[key], v => v.column)),
  )

  k.values[Math.floor(Math.random() * k.shape[0])][
    Math.floor(Math.random() * k.shape[1])
  ] = "uh-oh"

  const mPred1 = getHighlyCorrelatedColumns(k)

  forEach(
    Object.keys(mPred1),
    key => (mPred1[key] = map(mPred1[key], v => v.column)),
  )

  expect(isEqual(mPred1, mTrue)).toBe(false)

  const mPred2 = getHighlyCorrelatedColumns(k, null, true)

  forEach(
    Object.keys(mPred2),
    key => (mPred2[key] = map(mPred2[key], v => v.column)),
  )

  expect(isEqual(mPred2, mTrue)).toBe(true)

  const n = new DataFrame({ a: [2n, 3n, 4n], b: [5n, 6n, 7n] })
  const p = n.apply(col => col.apply(v => Number(v)))
  const qTrue = { a: ["b"], b: ["a"] }

  expect(
    isEqual(getHighlyCorrelatedColumns(n), getHighlyCorrelatedColumns(p)),
  ).toBe(true)

  const qPred = getHighlyCorrelatedColumns(n)

  forEach(
    Object.keys(qPred),
    key => (qPred[key] = map(qPred[key], v => v.column)),
  )

  expect(isEqual(qPred, qTrue)).toBe(true)

  const q = normal(100)

  const r = transpose(
    map(range(0, 5), () => add(q, scale(0.0001, normal(100)))),
  )

  forEach(range(0, shape(r)[1]), j => {
    r[j][j] = "uh-oh!"
  })

  expect(isEqual(getHighlyCorrelatedColumns(r), {})).toBe(true)
  expect(isEqual(getHighlyCorrelatedColumns(r, null, true), {})).not.toBe(true)

  const s = normal(100)

  const t = transpose(
    map(range(0, 5), () => add(s, scale(0.0001, normal(shape(s))))),
  )

  const uPred = getHighlyCorrelatedColumns(t)

  expect(Object.keys(uPred).length).toBeGreaterThan(0)

  forEach(Object.keys(uPred), key => {
    const results = uPred[key]
    expect(results instanceof Array).toBe(true)
    expect(results.every(v => typeof v.column === "string")).toBe(true)
    expect(results.every(v => typeof v.correlation === "number")).toBe(true)
    expect(results.every(v => v.correlation >= 0.99)).toBe(true)
  })

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
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  forEach(wrongs, a => {
    forEach(wrongs, b => {
      if (!isDataFrame(a) && !isNumber(b) && !isUndefined(b)) {
        expect(() => getHighlyCorrelatedColumns(a, b)).toThrow()
      }
    })
  })
})
