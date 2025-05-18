import {
  abs,
  DataFrame,
  forEach,
  isEqual,
  map,
  mean,
  normal,
  random,
  range,
  Series,
  std,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { normalize } from "./normalize.mjs"

test("tests that data can be normalized correctly", () => {
  const a = map(range(0, 1000), () => random())
  const b = normalize(a)
  expect(abs(std(b) - 1)).toBeLessThan(0.01)
  expect(abs(mean(b))).toBeLessThan(0.01)

  const c = map(normal(1000), v => v * 100 + 100)
  const d = normalize(c)
  expect(abs(std(d) - 1)).toBeLessThan(0.01)
  expect(abs(mean(d))).toBeLessThan(0.01)

  const e = random([2, 3, 4, 5, 6])
  const f = normalize(e)
  expect(abs(std(f) - 1)).toBeLessThan(0.01)
  expect(abs(mean(f))).toBeLessThan(0.01)

  const g = new Series({ hello: random(100) })
  const hTrue = g.copy()
  hTrue.values = normalize(hTrue.values)
  const hPred = normalize(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  const i = new DataFrame({
    foo: random(100),
    bar: random(100),
    baz: random(100),
  })

  const jTrue = i.copy()
  jTrue.values = normalize(jTrue.values)
  const jPred = normalize(i)
  expect(isEqual(jPred, jTrue)).toBe(true)

  const kBigInts = map(normal(100), v => BigInt(Math.round(v * 100)))
  const kFloats = map(kBigInts, v => Number(v))
  expect(isEqual(normalize(kBigInts), normalize(kFloats))).toBe(true)

  const m = normal(100)
  m[0] = "uh-oh!"
  expect(normalize(m).every(v => isNaN(v))).toBe(true)
  expect(normalize(m, true).every(v => isNaN(v))).toBe(false)

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
    expect(() => normalize(item)).toThrow()
  })
})
