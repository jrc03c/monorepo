import { argmax } from "./argmax.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { shuffle } from "./shuffle.mjs"

test("gets the argmax of various kinds of containers", () => {
  const a = shuffle(range(0, 100))
  expect(argmax(a)).toStrictEqual(a.indexOf(99))

  const b = normal([50, 50])
  let maxRow = 0
  let maxCol = 0
  let max = -Infinity

  forEach(b, (row, i) => {
    forEach(row, (v, j) => {
      if (v > max) {
        max = v
        maxRow = i
        maxCol = j
      }
    })
  })

  expect(argmax(b)).toStrictEqual([maxRow, maxCol])

  const c = new Series(normal(100))
  expect(argmax(c)).toBe(c.index[c.values.indexOf(Math.max(...c.values))])

  const d = new DataFrame(normal([50, 50]))
  maxRow = 0
  maxCol = 0
  max = -Infinity

  forEach(d.values, (row, i) => {
    forEach(row, (v, j) => {
      if (v > max) {
        max = v
        maxRow = i
        maxCol = j
      }
    })
  })

  expect(argmax(d)).toStrictEqual([d.index[maxRow], d.columns[maxCol]])

  expect(argmax([234n, 243n, 423n, 432n, 324n, 342n])).toBe(3)
  expect(argmax([-234n, -23n, -2n, -3n, -4n])).toBe(2)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(argmax(e)).toBe(undefined)
  expect(argmax(e, true)).not.toBe(undefined)

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

  forEach(wrongs, v => {
    expect(() => argmax(v)).toThrow()
  })
})
