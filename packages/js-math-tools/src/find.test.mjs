import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { find } from "./find.mjs"
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

test("tests that items matching a certain function can be found", () => {
  const a = [1, 2, 3, 4, 5, 6]
  const bTrue = 2
  const bPred = find(a, v => v % 2 === 0)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = normal(100)
  const dTrue = c.find(v => v > 0)
  const dPred = find(c, v => v > 0)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = normal([5, 5, 5, 5])
  const fTrue = flatten(e).find(v => v < 0)
  const fPred = find(e, v => v < 0)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new Series({
    hello: map(normal(100), v => (Math.random() < 0.5 ? makeKey(8) : v)),
  })

  const hTrue = g.values.find(v => typeof v === "string")
  const hPred = find(g, v => typeof v === "string")
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = new DataFrame({
    foo: map(normal(100), v => (Math.random() < 0.5 ? { hello: "world" } : v)),
    bar: normal(100),
  })

  const jTrue = i.get("foo").values.find(v => isObject(v))
  const jPred = find(i, v => isObject(v))
  expect(isEqual(jPred, jTrue)).toBe(true)

  const k = { a: { b: { c: [2, null, "foo"] } } }
  const lTrue = 2
  const lPred = find(k, v => typeof v === "number")
  expect(isEqual(lPred, lTrue)).toBe(true)

  const m = [[[2, 3, 4], 2, 3, 4], 2, 3, 4]
  const nTrue = 3
  const nPred = find(m, 3)
  expect(isEqual(nPred, nTrue)).toBe(true)

  const o = { a: { b: { c: { [Symbol.for("hello")]: "world" } } } }
  const pTrue = "world"

  const pPred = find(o, v => {
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
    expect(() => find(item, () => true)).toThrow()
  })

  forEach(wrongs, item1 => {
    forEach(wrongs, item2 => {
      expect(() => find(item1, item2)).toThrow()
    })
  })
})
