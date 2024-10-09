import { DataFrame, Series } from "./dataframe/index.mjs"
import { argmin } from "./argmin.mjs"
import { normal } from "./normal.mjs"
import { range } from "./range.mjs"
import { shuffle } from "./shuffle.mjs"

test("gets the argmin of various kinds of containers", () => {
  const a = shuffle(range(0, 100))
  expect(argmin(a)).toStrictEqual(a.indexOf(0))

  const b = normal([50, 50])
  let minRow = 0
  let minCol = 0
  let min = Infinity

  b.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v < min) {
        min = v
        minRow = i
        minCol = j
      }
    })
  })

  expect(argmin(b)).toStrictEqual([minRow, minCol])

  const c = new Series(normal(100))
  expect(argmin(c)).toBe(c.index[c.values.indexOf(Math.min(...c.values))])

  const d = new DataFrame(normal([50, 50]))
  minRow = 0
  minCol = 0
  min = Infinity

  d.values.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v < min) {
        min = v
        minRow = i
        minCol = j
      }
    })
  })

  expect(argmin(d)).toStrictEqual([d.index[minRow], d.columns[minCol]])

  expect(argmin([432n, 324n, 342n, 234n, 243n, 423n])).toBe(3)
  expect(argmin([-2n, -3n, -4n, -234n, -23n])).toBe(3)

  const e = normal(100)
  e[0] = "uh-oh!"
  expect(argmin(e)).toBe(undefined)
  expect(argmin(e, true)).not.toBe(undefined)

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

  wrongs.forEach(v => {
    expect(() => argmin(v)).toThrow()
  })
})
