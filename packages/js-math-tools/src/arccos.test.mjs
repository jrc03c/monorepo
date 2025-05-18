import { arccos } from "./arccos.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"
import { random } from "./random.mjs"

test("tests that the inverse cosine can be computed correctly", () => {
  const r = random([2, 3])
  const s = new Series({ hello: random(100) })
  const d = new DataFrame({ foo: normal(100), bar: normal(100) })

  const rights = [
    [-1, Math.acos(-1)],
    [-0.5, Math.acos(-0.5)],
    [0, Math.acos(0)],
    [0.5, Math.acos(0.5)],
    [1, Math.acos(1)],
    [0n, Math.acos(0)],
    [-1n, Math.acos(-1)],
    [r, map(r, row => map(row, v => Math.acos(v)))],
    [s, s.copy().apply(v => Math.acos(v))],
    [d, d.copy().apply(col => col.apply(v => Math.acos(v)))],
  ]

  forEach(rights, pair => {
    expect(isEqual(arccos(pair[0]), pair[1])).toBe(true)
  })

  const wrongs = [
    [2.3, NaN],
    [-2.3, NaN],
    [Infinity, NaN],
    [-Infinity, NaN],
    [NaN, NaN],
    ["foo", NaN],
    [true, NaN],
    [false, NaN],
    [null, NaN],
    [undefined, NaN],
    [Symbol.for("Hello, world!"), NaN],
    [
      [2, 3, 4],
      [NaN, NaN, NaN],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [NaN, NaN, NaN],
        [NaN, NaN, NaN],
      ],
    ],
    [map(random(100), v => v * 100 + 100), map(random(100), () => NaN)],
    [x => x, NaN],
    [
      function (x) {
        return x
      },
      NaN,
    ],
    [{ hello: "world" }, NaN],
    [
      new Series({ hello: [10, 20, 30, 40, 50] }),
      new Series({ hello: [NaN, NaN, NaN, NaN, NaN] }),
    ],
    [
      new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
      new DataFrame({
        foo: [0, NaN, NaN, NaN, NaN],
        bar: [0, NaN, NaN, NaN, NaN],
      }),
    ],
  ]

  forEach(wrongs, pair => {
    expect(isEqual(arccos(pair[0]), pair[1])).toBe(true)
  })
})
