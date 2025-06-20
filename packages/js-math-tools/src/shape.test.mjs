import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"
import { shape } from "./shape.mjs"

test("gets the shape of some non-jagged arrays, Series, and DataFrames", () => {
  expect(shape(normal(500))).toStrictEqual([500])
  expect(shape(normal([2, 3, 4]))).toStrictEqual([2, 3, 4])
  expect(shape(new Series(normal(100)))).toStrictEqual([100])
  expect(shape(new DataFrame(normal([10, 10])))).toStrictEqual([10, 10])
  expect(isEqual(shape([[[2n, 3n, 4n]]]), shape([[[2, 3, 4]]]))).toBe(true)
})

// test("gets the shape of some jagged arrays", () => {
//   const x = [2, [3, 4], 5]
//   const yTrue = [3, [undefined, 2, undefined]]
//   const yPred = shape(x)
//   expect(isEqual(yPred, yTrue)).toBe(true)

//   const x2 = normal([5, 5])
//   x2[0].splice(0, 1)
//   const yTrue2 = [5, [4, 5, 5, 5, 5]]
//   const yPred2 = shape(x2)
//   expect(isEqual(yPred2, yTrue2)).toBe(true)
// })

test("throws errors for non-arrays", () => {
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
    expect(() => shape(item)).toThrow()
  })
})
