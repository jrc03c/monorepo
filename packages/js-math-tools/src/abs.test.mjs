import { abs } from "./abs.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { normal } from "./normal.mjs"

test("tests that absolute values can be computed correctly", () => {
  const x = normal(100)
  const y = normal(100)
  const z = normal(100)

  const xPos = map(x, v => Math.abs(v))
  const yPos = map(y, v => Math.abs(v))
  const zPos = map(z, v => Math.abs(v))

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 2.3],
    [-2.3, 2.3],
    [Infinity, Infinity],
    [-Infinity, Infinity],
    [234n, 234n],
    [-234n, 234n],
    [
      [2, -3, 4],
      [2, 3, 4],
    ],
    [
      [
        [-2, 3, -4],
        [5, -6, 7],
      ],
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
    ],
    [
      [2n, -3n, 4n, -5n],
      [2n, 3n, 4n, 5n],
    ],
    [new Series({ stuff: x }), new Series({ stuff: xPos })],
    [new DataFrame({ x, y, z }), new DataFrame({ x: xPos, y: yPos, z: zPos })],
  ]

  forEach(rights, pair => {
    expect(isEqual(abs(pair[0]), pair[1]))
  })

  const wrongs = [
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
    expect(abs(v)).toBeNaN()
  })
})
