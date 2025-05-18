import { combinations, combinationsIterator } from "./combinations.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { factorial } from "./factorial.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { map } from "./map.mjs"
import { range } from "./range.mjs"
import { set } from "./set.mjs"
import { sort } from "./sort.mjs"

function turnIntoStrings(arr) {
  return map(arr, item => JSON.stringify(item))
}

function getNumberOfCombinations(arr, r) {
  const n = arr.length
  return factorial(n) / (factorial(r) * factorial(n - r))
}

test("tests that the combinations function works as expected", () => {
  const aTrue = sort(
    set(
      turnIntoStrings([
        [0, 1, 2],
        [0, 1, 3],
        [0, 1, 4],
        [0, 2, 3],
        [0, 2, 4],
        [0, 3, 4],
        [1, 2, 3],
        [1, 2, 4],
        [1, 3, 4],
        [2, 3, 4],
      ]),
    ),
  )

  const aPred = sort(set(turnIntoStrings(combinations(range(0, 5), 3))))
  expect(aPred).toStrictEqual(aTrue)

  const x = range(0, 10)
  const r = 3
  expect(combinations(x, r).length).toBe(getNumberOfCombinations(x, r))

  expect(combinations(range(0, 10), 100)).toStrictEqual([range(0, 10)])

  const b = range(0, 10)
  const c = []

  for (const combo of combinationsIterator(b, 3)) {
    c.push(combo.slice())
  }

  expect(c.length).toBe(getNumberOfCombinations(b, 3))

  expect(
    typeof combinationsIterator(b, 3) === "object" &&
      !isArray(combinationsIterator(b, 3)),
  ).toBe(true)

  const failures = [
    [[1, 2, 3, 4, 5], 3.5],
    [[1, 2, 3, 4, 5], "3"],
    ["foo", 3],
    [234, 3],
    [true, 3],
    [false, 3],
    [null, 3],
    [undefined, 3],
    [{}, 3],
    [() => {}, 3],
  ]

  forEach(failures, f => {
    expect(() => {
      combinations(f[0], f[1])
    }).toThrow()
  })
})
