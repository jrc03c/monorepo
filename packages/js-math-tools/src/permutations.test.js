import { DataFrame, Series } from "./dataframe/index.js"
import { permutations, permutationsIterator } from "./permutations.js"
import factorial from "./factorial.js"
import isArray from "./is-array.js"
import isEqual from "./is-equal.js"
import range from "./range.js"
import set from "./set.js"
import sort from "./sort.js"

function depthSort(a, b) {
  let i = 0

  while (i < a.length && i < b.length && a[i] === b[i]) {
    i++
  }

  return a[i] < b[i] ? -1 : 1
}

function turnIntoStrings(arr) {
  return arr.map(item => JSON.stringify(item))
}

function getNumberOfPermutations(arr, r) {
  const n = arr.length
  return factorial(n) / factorial(n - r)
}

test("tests that permutations can be correctly computed", () => {
  const a = [2, 3, 4]

  const bTrue = sort(
    set(
      turnIntoStrings([
        [2, 3, 4],
        [2, 4, 3],
        [3, 2, 4],
        [3, 4, 2],
        [4, 2, 3],
        [4, 3, 2],
      ]),
    ),
  )

  const bPred = sort(set(turnIntoStrings(permutations(a))))
  expect(bPred).toStrictEqual(bTrue)

  const c = ["a", "b", "c", "d"]

  const dTrue = sort(
    set(
      turnIntoStrings([
        ["a", "b", "c", "d"],
        ["a", "b", "d", "c"],
        ["a", "c", "b", "d"],
        ["a", "c", "d", "b"],
        ["a", "d", "b", "c"],
        ["a", "d", "c", "b"],
        ["b", "a", "c", "d"],
        ["b", "a", "d", "c"],
        ["b", "c", "a", "d"],
        ["b", "c", "d", "a"],
        ["b", "d", "a", "c"],
        ["b", "d", "c", "a"],
        ["c", "a", "b", "d"],
        ["c", "a", "d", "b"],
        ["c", "b", "a", "d"],
        ["c", "b", "d", "a"],
        ["c", "d", "a", "b"],
        ["c", "d", "b", "a"],
        ["d", "a", "b", "c"],
        ["d", "a", "c", "b"],
        ["d", "b", "a", "c"],
        ["d", "b", "c", "a"],
        ["d", "c", "a", "b"],
        ["d", "c", "b", "a"],
      ]),
    ),
  )

  const dPred = sort(set(turnIntoStrings(permutations(c))))
  expect(dPred).toStrictEqual(dTrue)

  for (let i = 2; i < 10; i++) {
    const e = range(0, i)
    expect(permutations(e).length).toBe(factorial(i))
  }

  for (let i = 1; i < 8; i++) {
    const e = range(0, 8)
    expect(permutations(e, i).length).toBe(getNumberOfPermutations(e, i))
  }

  const f = [2, [3, 4, [5]]]
  const gPred = sort(permutations(f, 3), depthSort)

  const gTrue = sort(
    [
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 3],
      [2, 4, 5],
      [2, 5, 3],
      [2, 5, 4],
      [3, 2, 4],
      [3, 2, 5],
      [3, 4, 2],
      [3, 4, 5],
      [3, 5, 2],
      [3, 5, 4],
      [4, 2, 3],
      [4, 2, 5],
      [4, 3, 2],
      [4, 3, 5],
      [4, 5, 2],
      [4, 5, 3],
      [5, 2, 3],
      [5, 2, 4],
      [5, 3, 2],
      [5, 3, 4],
      [5, 4, 2],
      [5, 4, 3],
    ],
    depthSort,
  )

  expect(isEqual(gPred, gTrue)).toBe(true)

  const h = new Series({ hello: [1, 2, 3, 4, 5] })
  expect(isEqual(permutations(h, 2), permutations(h.values, 2))).toBe(true)

  const i = new DataFrame({ foo: [1, 2, 3, 4, 5], bar: [6, 7, 8, 9, 10] })
  expect(isEqual(permutations(i, 2), permutations(i.values, 2))).toBe(true)

  const jTrue = sort(
    [
      [2n, 3n, 4n],
      [2n, 4n, 3n],
      [3n, 2n, 4n],
      [3n, 4n, 2n],
      [4n, 2n, 3n],
      [4n, 3n, 2n],
    ],
    depthSort,
  )

  const jPred = sort(permutations([2n, 3n, 4n]), depthSort)
  expect(jPred).toStrictEqual(jTrue)

  const k = range(0, 10)
  const m = []

  for (const perm of permutationsIterator(k, 3)) {
    m.push(perm.slice())
  }

  expect(m.length).toBe(getNumberOfPermutations(k, 3))

  expect(
    typeof permutationsIterator(k, 3) === "object" &&
      !isArray(permutationsIterator(k, 3)),
  ).toBe(true)
})

test("tests that errors are thrown when trying to get permutations from non-arrays", () => {
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

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      expect(() => permutations(a, b)).toThrow()
    })
  })
})
