import { DataFrame, Series } from "./dataframe/index.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "./for-each.mjs"
import { intersect } from "./intersect.mjs"
import { isEqual } from "./is-equal.mjs"
import { range } from "./range.mjs"
import { reshape } from "./reshape.mjs"
import { shuffle } from "./shuffle.mjs"
import { sort } from "./sort.mjs"

test("tests that the intersections of sets can be computed correctly", () => {
  const a = [2, 3, 4]
  const b = [3, 4, 5]
  expect(isEqual(intersect(a, b), [3, 4])).toBe(true)

  const c = [2, [3, [4, [5, [6]]]]]
  const d = [[[[2, 3, 4]]], [8, 9, 10]]
  expect(isEqual(intersect(c, d), [2, 3, 4])).toBe(true)

  const e = new Series({ foo: [2, 3, 4, 5, 6] })
  const f = new Series([4, 5, 6])
  expect(isEqual(intersect(e, f), [4, 5, 6])).toBe(true)

  const g = new DataFrame(reshape(shuffle(range(0, 100)), [10, 10]))
  const h = reshape(shuffle(range(-5, 95)), [2, 5, 5, 2])
  expect(isEqual(sort(intersect(g, h)), range(0, 95))).toBe(true)

  const wrongs = [
    [0, 1],
    [2.3, -2.3],
    [Infinity, -Infinity],
    [NaN, "foo"],
    [true, false],
    [null, undefined],
    [Symbol.for("Hello, world!"), x => x],
    [
      function (x) {
        return x
      },
      { hello: "world" },
    ],
  ]

  forEach(wrongs, pair => {
    expect(() => intersect(pair[0], pair[1])).toThrow()
  })
})
