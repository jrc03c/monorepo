import { apply } from "./apply.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { log } from "./log.mjs"
import { map } from "./map.mjs"
import { random } from "./random.mjs"

test("tests that the log of various values can be computed correctly", () => {
  const a = map(random(100), v => v * 100 + 1)
  const bTrue = map(a, v => Math.log(v))
  const bPred = log(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = random([2, 3, 4, 5])
  const dTrue = apply(c, v => Math.log(v))
  const dPred = log(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: random(100) })
  const fTrue = e.copy().apply(v => Math.log(v))
  const fPred = log(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame({ foo: random(100), bar: random(100) })
  const hTrue = g.copy().apply(col => col.apply(v => Math.log(v)))
  const hPred = log(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  expect(log(234n)).toBe(log(234))
  expect(log(-234n)).toBeNaN()
  expect(log(100n, 10)).toBe(2n)
  expect(log(100, 10n)).toBe(2n)
  expect(log(100n, 10n)).toBe(2n)

  const wrongs = [
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
    expect(log(item)).toBeNaN()
  })
})
