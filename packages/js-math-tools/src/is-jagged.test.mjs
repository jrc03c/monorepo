import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isJagged } from "./is-jagged.mjs"
import { normal } from "./normal.mjs"

test("tests that jagged arrays can be identified correctly", () => {
  const a = normal(100)
  expect(isJagged(a)).toBe(false)

  const b = normal(100)
  b[parseInt(Math.random() * b.length)] = normal(100)
  expect(isJagged(b)).toBe(true)

  const c = normal([2, 3, 4, 5])
  expect(isJagged(c)).toBe(false)

  const d = normal([2, 3, 4, 5])
  d[0][0][0].splice(0, 1)
  expect(isJagged(d)).toBe(true)

  const e = new Series(normal(100))
  expect(isJagged(e)).toBe(false)

  const f = new DataFrame(normal([10, 10]))
  expect(isJagged(f)).toBe(false)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    // selfReferencer,
  ]

  forEach(wrongs, item => {
    expect(isJagged(item)).toBe(false)
  })
})
