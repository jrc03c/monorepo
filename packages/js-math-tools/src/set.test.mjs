import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { round } from "./round.mjs"
import { set } from "./set.mjs"
import { sort } from "./sort.mjs"

test("tests that sets of values can be correctly selected", () => {
  expect(set([2, 2, 2, 3, 4])).toStrictEqual([2, 3, 4])
  expect(sort(set([4, [3, 3, [2, 2, 2]]]))).toStrictEqual([2, 3, 4])

  const a = set(round(normal(100)))

  forEach(a.slice(0, -1), (u, i) => {
    forEach(a.slice(i + 1), v => {
      expect(u).not.toBe(v)
    })
  })

  const b = new Series({ hello: round(normal(100)) })
  expect(isEqual(set(b), set(b.values))).toBe(true)

  const c = new DataFrame({ foo: normal(100), bar: normal(100) })
  expect(isEqual(set(c), set(c.values))).toBe(true)

  const d = [234n, -567.89, true, false, null, 234n, -567.89, true, false, null]
  const eTrue = [234n, -567.89, true, false, null]
  const ePred = set(d)
  expect(isEqual(eTrue, ePred)).toBe(true)

  const others = [
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

  forEach(others, item => {
    expect(() => set(item)).toThrow()
  })
})
