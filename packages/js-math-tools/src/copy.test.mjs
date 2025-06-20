import { arrayTypes } from "./helpers/array-types.mjs"
import { copy, decycle } from "./copy.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { normal } from "./normal.mjs"

function isACopy(a, b) {
  if (typeof a === "object" && typeof b === "object" && a !== null) {
    return isEqual(a, b) && a !== b
  } else {
    return isEqual(a, b)
  }
}

test("tests that values can be copied correctly", () => {
  const simples = [
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

  forEach(simples, v => {
    expect(isEqual(v, copy(v))).toBe(true)
  })

  const complexes = [
    [2, 3, 4, Symbol.for("bug")],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  forEach(complexes, v => {
    const c = copy(v)
    expect(isACopy(v, c)).toBe(true)
  })
})

test("tests that typed arrays are copied correctly", () => {
  const buffer = new ArrayBuffer(32)

  ;(() => {
    const x = new Float64Array(buffer)

    for (let i = 0; i < x.length; i++) {
      x[i] = normal()
    }
  })()

  expect(isACopy(buffer, copy(buffer))).toBe(true)

  forEach(arrayTypes, T => {
    if (T !== ArrayBuffer) {
      const x = new T(buffer)
      expect(isACopy(x, copy(x))).toBe(true)
    }
  })
})

test("tests that decycling works as expected", () => {
  const x = [2, 3, 4]
  x.push(x)
  const yTrue = [2, 3, 4, '<reference to "/">']
  const yPred = decycle(x)
  expect(isEqual(yPred, yTrue)).toBe(true)
})

test("tests that symbols-as-keys are copied as well", () => {
  const aTrue = { [Symbol.for("hello")]: "world" }
  const aPred = copy(aTrue)
  expect(isEqual(aPred, aTrue))

  const bTrue = { [Symbol.for("@hello")]: "@world" }
  const bPred = decycle(bTrue)
  expect(isEqual(bPred, bTrue)).toBe(true)
})
