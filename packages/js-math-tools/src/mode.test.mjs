import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { mode } from "./mode.mjs"
import { normal } from "./normal.mjs"
import { round } from "./round.mjs"
import { set } from "./set.mjs"
import { sort } from "./sort.mjs"

test("tests that the mode of an array, series, or dataframe can be found correctly", () => {
  expect(mode([2, 2, 2, 3, 4])[0]).toBe(2)
  expect(mode([2, 3, 3, 3, 4])[0]).toBe(3)
  expect(mode([2, 3, 4, 4, 4])[0]).toBe(4)
  expect(mode([2, 2, 3, 3])).toStrictEqual([2, 3])

  const a = round(normal([2, 3, 4, 5]))
  expect(mode(a)).toStrictEqual(mode(flatten(a)))

  const b = set(normal(100))
  expect(sort(mode(b))).toStrictEqual(sort(b))

  const c = new Series({ hello: round(normal(100)) })
  expect(mode(c)).toStrictEqual(mode(c.values))

  const d = new DataFrame({ foo: round(normal(100)), bar: round(normal(100)) })
  expect(mode(d)).toStrictEqual(mode(d.values))

  expect(mode([2n, 2n, 2n, 3n, 4n])).toStrictEqual([2n])
  expect(mode([2n, 2n, 2n, 3, 4])).toStrictEqual([2n])
  expect(mode([2n, 2n, 3n, 3n, 4n, 4n])).toStrictEqual([2n, 3n, 4n])

  const e = [2, 2, 2, 2, 2, "uh-oh!", 3, 4]
  expect(mode(e)).toStrictEqual([2])
  expect(mode(e, true)).toStrictEqual([2])

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
    expect(() => mode(item)).toThrow()
  })
})
