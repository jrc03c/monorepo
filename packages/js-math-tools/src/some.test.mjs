import { DataFrame, Series } from "./dataframe/index.mjs"
import { flatten } from "./flatten.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isFunction } from "./is-function.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { random } from "./random.mjs"
import { some } from "./some.mjs"

test("tests that the `some` function works as expected", () => {
  const a = [234, ["foo", [true, [{ hello: "world" }]]]]

  expect(some(a, v => isUndefined(v))).toBe(false)
  expect(some(flatten(a), v => isUndefined(v))).toBe(false)
  expect(some(a, v => isNumber(v))).toBe(true)
  expect(some(flatten(a), v => isNumber(v))).toBe(true)

  const b = random([2, 3, 4, 5])
  expect(some(b, v => v < 0 || v > 1)).toBe(false)
  expect(some(b, v => v > 0.5)).toBe(true)

  const c = new DataFrame(random([100, 5]))
  expect(some(c, v => v < 0 || v > 1)).toBe(false)

  let counter = 0

  some(c, () => {
    counter++
    return false
  })

  expect(counter).toBe(500)

  const d = new Series(random(100))
  expect(some(d, v => v > 0.5)).toBe(true)

  counter = 0

  some(d, () => {
    counter++
    return false
  })

  expect(counter).toBe(100)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    234n,
    -234n,
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
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Date(),
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(v1 => {
    wrongs.forEach(v2 => {
      if (
        (!isArray(v1) && !isDataFrame(v1) && !isSeries(v1)) ||
        !isFunction(v2)
      ) {
        expect(() => some(v1, v2)).toThrow()
      }
    })
  })
})