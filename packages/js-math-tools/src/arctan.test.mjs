import { arctan } from "./arctan.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that the inverse sine can be computed correctly", () => {
  const r = normal([2, 3])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.atan(-1)],
    [-0.5, Math.atan(-0.5)],
    [0, Math.atan(0)],
    [0.5, Math.atan(0.5)],
    [1, Math.atan(1)],
    [2.3, Math.atan(2.3)],
    [-2.3, Math.atan(-2.3)],
    [234n, Math.atan(234)],
    [-234n, Math.atan(-234)],
    [Infinity, Math.atan(Infinity)],
    [-Infinity, Math.atan(-Infinity)],
    [
      [2, 3, 4],
      [Math.atan(2), Math.atan(3), Math.atan(4)],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [Math.atan(2), Math.atan(3), Math.atan(4)],
        [Math.atan(5), Math.atan(6), Math.atan(7)],
      ],
    ],

    [r, map(r, row => map(row, v => Math.atan(v)))],
    [s, s.copy().apply(v => Math.atan(v))],
    [d, d.copy().apply(col => col.apply(v => Math.atan(v)))],
  ]

  forEach(rights, pair => {
    expect(isEqual(arctan(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],

    [x => x, NaN],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
  ]

  forEach(wrongs, pair => {
    expect(isEqual(arctan(pair[0]), pair[1])).toBe(true)
  })
})
