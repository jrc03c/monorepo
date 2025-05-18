import { DataFrame, Series } from "./dataframe/index.mjs"
import { dropMissing } from "./drop-missing.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { filter } from "./filter.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"
import { random } from "./random.mjs"

test("tests that missing values can be dropped correctly", () => {
  const a = normal(100)
  expect(isEqual(dropMissing(a), a)).toBe(true)

  const b = []
  const cTrue = []

  for (let i = 0; i < 100; i++) {
    const v = normal()

    if (random() < 0.1) {
      b.push(null)
    } else {
      b.push(v)
      cTrue.push(v)
    }
  }

  const cPred = dropMissing(b)
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = [
    [2, 3, 4],
    [5, 6, null, 8],
    [9, null, 11, null, null],
  ]

  const eTrue = [
    [2, 3, 4],
    [5, 6, 8],
    [9, 11],
  ]

  const ePred = dropMissing(d)
  expect(isEqual(ePred, eTrue)).toBe(true)

  const f = new Series(map(normal(100), v => (random() < 0.5 ? null : v)))
  const gTrue = new Series(filter(f.values, v => !isUndefined(v)))
  const gPred = dropMissing(f)
  gTrue._index = gPred._index
  expect(isEqual(gPred, gTrue)).toBe(true)

  const g = new DataFrame(
    map(normal([10, 10]), row => map(row, v => (random() < 0.05 ? null : v))),
  )

  const hTrue = new DataFrame(
    filter(g.values, row => row.every(v => !isUndefined(v))),
  )

  const hPred = dropMissing(g)
  hTrue._index = hPred._index
  expect(isEqual(hPred, hTrue)).toBe(true)

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

  forEach(wrongs, item => {
    expect(() => dropMissing(item)).toThrow()
  })
})
