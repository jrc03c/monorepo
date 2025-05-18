import {
  DataFrame,
  forEach,
  isEqual,
  map,
  normal,
  round,
  Series,
  set,
  sort,
  transpose,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getOneHotEncodings } from "./get-one-hot-encodings.mjs"

test("tests that values can be correctly one-hot-encoded", () => {
  const a = [2, 3, 4]
  const bTrue = { foo_2: [1, 0, 0], foo_3: [0, 1, 0] }
  const bPred = getOneHotEncodings("foo", a)
  expect(isEqual(bPred, bTrue)).toBe(true)

  const c = ["a", "a", "a", "b", "b", "b"]
  const dTrue = { hello_a: [1, 1, 1, 0, 0, 0] }
  const dPred = getOneHotEncodings("hello", c)
  expect(isEqual(dPred, dTrue)).toBe(true)

  const e = new Series({ hello: round(sort(normal(100))) })
  const fTypes = sort(set(e.values))

  const fTrue = new DataFrame(
    transpose(
      map(fTypes.slice(0, -1), v => map(e.values, x => (x === v ? 1 : 0))),
    ),
  )

  fTrue.columns = map(fTypes.slice(0, -1), v => "hello_" + v.toString())
  fTrue.index = e.index.slice()
  const fPred = getOneHotEncodings(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = ["foo", "bar", NaN, null, undefined, "foo", "baz", "bar"]

  const hTrue = new DataFrame({
    test_bar: [0, 1, NaN, NaN, NaN, 0, 0, 1],
    test_foo: [1, 0, NaN, NaN, NaN, 1, 0, 0],
  })

  const hPred = new DataFrame(getOneHotEncodings("test", g))
  expect(isEqual(hTrue, hPred)).toBe(true)

  const i = [2n, 3n, 4n, 2n, 3n, 4n]

  const jTrue = new DataFrame({
    i_2n: [1, 0, 0, 1, 0, 0],
    i_3n: [0, 1, 0, 0, 1, 0],
  })

  const jPred = new DataFrame(getOneHotEncodings("i", i))
  expect(isEqual(jTrue, jPred)).toBe(true)

  const k = [234n, "foo", true]

  const lTrue = new DataFrame({
    k_234n: [1, 0, 0],
    k_foo: [0, 1, 0],
  })

  const lPred = new DataFrame(getOneHotEncodings("k", k))
  expect(isEqual(lPred, lTrue)).toBe(true)

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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(wrongs, item => {
    expect(() => getOneHotEncodings(item)).toThrow()
  })

  forEach(wrongs, a => {
    forEach(wrongs, b => {
      expect(() => getOneHotEncodings(a, b)).toThrow()
    })
  })
})
