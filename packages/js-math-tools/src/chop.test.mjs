import { chop } from "./chop.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { flatten } from "./flatten.mjs"
import { forEach } from "./for-each.mjs"
import { isEqual } from "./is-equal.mjs"
import { map } from "./map.mjs"
import { range } from "./range.mjs"
import { reshape } from "./reshape.mjs"
import { shuffle } from "./shuffle.mjs"

test("tests that values can be chopped correctly", () => {
  const r = reshape(
    shuffle(
      map(
        range(-40, 40),
        i => Math.pow(10, i) * (Math.random() < 0.5 ? -1 : 1),
      ),
    ),
    [2, 4, 10],
  )

  const s = new Series({ hello: shuffle(flatten(r)) })

  const d = new DataFrame({
    foo: shuffle(flatten(r)),
    bar: shuffle(flatten(r)),
  })

  const rights = [
    [0, 0],
    [1, 1],
    [2.3, 2.3],
    [-2.3, -2.3],
    [Infinity, Infinity],
    [-Infinity, -Infinity],
    [
      [2, 3, 4],
      [2, 3, 4],
    ],
    [
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
    ],
    [234n, 234n],
    [-234n, -234n],
    [
      [2n, -3n, 4n, -5n],
      [2n, -3n, 4n, -5n],
    ],
    [
      r,
      reshape(
        map(flatten(r), v => (Math.abs(v) < 1e-10 ? 0 : v)),
        [2, 4, 10],
      ),
    ],
    [s, s.copy().apply(v => (Math.abs(v) < 1e-10 ? 0 : v))],
    [d, d.copy().apply(col => col.apply(v => (Math.abs(v) < 1e-10 ? 0 : v)))],
  ]

  forEach(rights, pair => {
    expect(isEqual(chop(pair[0]), pair[1])).toBe(true)
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
    expect(chop(v)).toBeNaN()
  })

  expect(
    isEqual(
      chop(new Series(["foo", "bar", "baz"])),
      new Series([NaN, NaN, NaN]),
    ),
  ).toBe(true)

  expect(
    isEqual(
      chop(new DataFrame({ foo: ["a", "b", "c"], bar: ["d", "e", "f"] })),
      new DataFrame({ foo: [NaN, NaN, NaN], bar: [NaN, NaN, NaN] }),
    ),
  ).toBe(true)
})
