import { apply } from "./apply.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { dot } from "./dot.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { float } from "./float.mjs"
import { forEach } from "./for-each.mjs"
import { int } from "./int.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that the dot products of vectors and matrices can be computed correctly", () => {
  const a = [2, 3, 4]
  const b = [5, 6, 7]
  expect(dot(a, b)).toBe(2 * 5 + 3 * 6 + 4 * 7)

  const c = [2, 3, 4]

  const d = [
    [5, 6],
    [7, 8],
    [9, 10],
  ]

  expect(
    isEqual(dot(c, d), [2 * 5 + 3 * 7 + 4 * 9, 2 * 6 + 3 * 8 + 4 * 10]),
  ).toBe(true)

  const e = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  const f = [8, 9, 10]

  expect(
    isEqual(dot(e, f), [2 * 8 + 3 * 9 + 4 * 10, 5 * 8 + 6 * 9 + 7 * 10]),
  ).toBe(true)

  const g = [
    [2, 3, 4],
    [5, 6, 7],
  ]

  const h = [
    [8, 9],
    [10, 11],
    [12, 13],
  ]

  const iTrue = [
    [2 * 8 + 3 * 10 + 4 * 12, 2 * 9 + 3 * 11 + 4 * 13],
    [5 * 8 + 6 * 10 + 7 * 12, 5 * 9 + 6 * 11 + 7 * 13],
  ]

  const iPred = dot(g, h)
  expect(isEqual(iPred, iTrue)).toBe(true)

  const j = new Series({ foo: normal(100) })
  const k = new Series({ bar: normal(100) })
  const lTrue = dot(j.values, k.values)
  const lPred = dot(j, k)
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = new Series({ hello: normal(100) })
  const n = new DataFrame({ foo: normal(100), bar: normal(100) })
  const oTrue = new Series(dot(m.values, n.values))
  oTrue.name = m.name
  oTrue.index = n.columns.slice()
  const oPred = dot(m, n)
  expect(isEqual(oPred, oTrue)).toBe(true)

  const p = new DataFrame(normal([5, 100]))
  p.columns = map(p.columns, (v, i) => "p" + i)
  p.index = map(p.index, (v, i) => "p_row" + i)
  const q = new Series({ hello: normal(100) })
  const rTrue = new Series(dot(p.values, q.values))
  rTrue.name = q.name
  rTrue.index = p.index.slice()
  const rPred = dot(p, q)
  expect(isEqual(rTrue, rPred)).toBe(true)

  const s = apply(normal([5, 10]), v => BigInt(int(v * 10)))
  const t = apply(normal([10, 15]), v => BigInt(int(v * 10)))
  const u1 = dot(s, t)
  const u2 = dot(float(s), float(t))

  expect(
    isEqual(
      apply(u1, v => int(v)),
      u2,
    ),
  )

  const v = normal([10, 10])
  const w = normal([10, 10])

  for (let i = 0; i < v.length; i++) {
    v[i][i] = "uh-oh!"
    w[i][i] = "uh-oh!"
  }

  expect(dot(v, w).every(row => row.every(v => isNaN(v)))).toBe(true)

  const wrongs = [
    [0, 1],
    [2.3, -2.3],
    [Infinity, -Infinity],
    [NaN, "foo"],
    [true, false],
    [null, undefined],
    [Symbol.for("Hello, world!"), x => x],
    [
      function (x) {
        return x
      },
      { hello: "world" },
    ],
    [normal([100, 25]), normal([100, 25])],
  ]

  forEach(wrongs, pair => {
    expect(() => dot(pair[0], pair[1])).toThrow()
  })
})
