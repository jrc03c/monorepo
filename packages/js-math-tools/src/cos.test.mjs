import { cos } from "./cos.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that cosines can be computed correctly", () => {
  const r = normal([50, 50])
  const s = new Series({ hello: normal(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.cos(-1)],
    [-0.5, Math.cos(-0.5)],
    [0, Math.cos(0)],
    [0.5, Math.cos(0.5)],
    [1, Math.cos(1)],
    [234n, Math.cos(234)],
    [-234n, Math.cos(-234)],
    [r, map(r, row => map(row, v => Math.cos(v)))],
    [s, s.copy().apply(v => Math.cos(v))],
    [d, d.copy().apply(col => col.apply(v => Math.cos(v)))],
  ]

  forEach(rights, pair => {
    expect(isEqual(cos(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [Infinity, NaN],
    [-Infinity, NaN],
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],
    [x => x, NaN],
    [
      [2, "3", 4],
      [Math.cos(2), NaN, Math.cos(4)],
    ],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
  ]

  forEach(wrongs, pair => {
    expect(isEqual(cos(pair[0]), pair[1])).toBe(true)
  })
})
