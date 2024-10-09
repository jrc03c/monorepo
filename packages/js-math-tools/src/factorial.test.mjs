import { DataFrame, Series } from "./dataframe/index.mjs"
import { factorial } from "./factorial.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { round } from "./round.mjs"

test("tests that factorial values can be computed correctly", () => {
  expect(factorial(5)).toBe(5 * 4 * 3 * 2)
  expect(factorial(0)).toBe(1)
  expect(factorial(-100)).toBe(1)

  const a = [1, 2, 3, 4, 5]
  const bTrue = [1, 2, 6, 24, 120]
  const bPred = factorial(a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = [2, [3, [4, [5]]]]
  const dTrue = [2, [6, [24, [120]]]]
  const dPred = factorial(c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: round(normal(100).map(v => v * 10)) })
  const fTrue = e.copy().apply(v => factorial(v))
  const fPred = factorial(e)
  expect(isEqual(fPred, fTrue))

  const g = new DataFrame({
    foo: round(normal(100).map(v => v * 100)),
    bar: round(normal(100).map(v => v * 100)),
  })

  const hTrue = g.copy().apply(col => col.apply(v => factorial(v)))
  const hPred = factorial(g)
  expect(isEqual(hPred, hTrue)).toBe(true)

  expect(factorial(7n)).toBe(5040n)
  expect(factorial(0n)).toBe(1n)
  expect(factorial([2n, 3n, 4n])).toStrictEqual([2n, 6n, 24n])

  const wrongs = [
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

  wrongs.forEach(item => {
    expect(factorial(item)).toBeNaN()
  })
})
