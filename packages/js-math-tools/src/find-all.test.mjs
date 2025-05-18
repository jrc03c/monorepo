import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { filter } from "./filter.mjs"
import { findAll } from "./find-all.mjs"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { isObject } from "./is-object.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

function makeKey(n) {
  const alpha = "1234567890abcdef"
  let out = ""
  while (out.length < n) out += alpha[parseInt(Math.random() * alpha.length)]
  return out
}

test("tests that all items matching a certain function can be found", () => {
  const a = [1, 2, 3, 4, 5, 6]
  const bTrue = [2, 4, 6]
  const bPred = findAll(a, v => v % 2 === 0)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal(100)
  const dTrue = filter(c, v => v > 0)
  const dPred = findAll(c, v => v > 0)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = normal([5, 5, 5, 5])
  const fTrue = filter(flatten(e), v => v < 0)
  const fPred = findAll(e, v => v < 0)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series({
    hello: map(normal(100), v => (Math.random() < 0.5 ? makeKey(8) : v)),
  })

  const hTrue = filter(g.values, v => typeof v === "string")
  const hPred = findAll(g, v => typeof v === "string")
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = new DataFrame({
    foo: map(normal(100), v => (Math.random() < 0.5 ? { hello: "world" } : v)),
    bar: normal(100),
  })

  const jTrue = filter(flatten(i.values), v => isObject(v))
  const jPred = findAll(i, v => isObject(v))
  expect(isEqual(jPred, jTrue)).toBe(true)

  const k = { a: { b: { c: [2, null, "foo"] } } }
  const lTrue = [2]
  const lPred = findAll(k, v => typeof v === "number")
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = [[[2, 3, 4], 2, 3, 4], 2, 3, 4]
  const nTrue = [3, 3, 3]
  const nPred = findAll(m, 3)
  expect(isEqual(nPred, nTrue)).toBe(true)

  const o = { a: { b: { c: { [Symbol.for("hello")]: "world" } } } }
  const pTrue = ["world"]

  const pPred = findAll(o, v => {
    try {
      return v.startsWith("w")
    } catch (e) {
      return false
    }
  })

  expect(isEqual(pPred, pTrue)).toBe(true)

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
  ]

  forEach(wrongs, item => {
    expect(() => findAll(item, () => true)).toThrow()
  })

  forEach(wrongs, item1 => {
    forEach(wrongs, item2 => {
      expect(() => findAll(item1, item2)).toThrow()
    })
  })
})
