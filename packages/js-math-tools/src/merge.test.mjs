import { copy } from "./copy.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isArray } from "./is-array.mjs"
import { isEqual } from "./is-equal.mjs"
import { isObject } from "./is-object.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { merge } from "./merge.mjs"
import { range } from "./range.mjs"
import { set } from "./set.mjs"
import { sort } from "./sort.mjs"

function makeKey(n) {
  const alpha = "abcdef1234567890"

  return range(0, n)
    .map(() => alpha[Math.floor(Math.random() * alpha.length)])
    .join("")
}

test("tests that the `merge` function merges objects correctly", () => {
  class Person {
    name = "Anonymous"
    age = 0

    constructor(name, age) {
      this.name = name
      this.age = age
    }
  }

  function generateRandomObject(n) {
    n = n || 100
    const out = {}
    const frontier = [out]

    const generators = [
      () => -1,
      () => 1,
      () => 234n,
      () => -234n,
      () => Math.random(),
      () => makeKey(8),
      () => Math.random() < 0.5,
      () => [],
      () => [2, 3, 4, 5, 6],
      () => ({}),
      () => ({ hello: "world" }),
      () => () => {},
      () => generateRandomObject,
      () => undefined,
      () => new Person(makeKey(8), Math.random() * 100),
      () => Symbol.for(makeKey(8)),
      () => Infinity,
      () => NaN,
    ]

    for (let i = 0; i < n; i++) {
      const node = frontier[Math.floor(Math.random() * frontier.length)]
      const child = generators[Math.floor(Math.random() * generators.length)]()

      if (isArray(node)) {
        node.push(child)
      } else {
        node[makeKey(8)] = child
      }

      if (isObject(child) || isArray(child)) {
        frontier.push(child)
      }
    }

    return out
  }

  function deleteStuff() {
    const args = Array.from(arguments)
    const objects = args.filter(v => isObject(v) || isArray(v))
    const keys = sort(set(objects.map(v => Object.keys(v))))

    for (const key of keys) {
      if (Math.random() < 0.25) {
        const obj = objects[Math.floor(Math.random() * objects.length)]
        delete obj[key]
      } else {
        deleteStuff(...args.map(v => (isUndefined(v) ? v : v[key])))
      }
    }

    return args
  }

  const xFull = generateRandomObject()
  const xPartials = deleteStuff(...range(0, 3).map(() => copy(xFull)))
  const xPred = merge(...xPartials)
  expect(xPartials.some(v => isEqual(v, xFull))).toBe(false)
  expect(isEqual(xPred, xFull)).toBe(true)
})

test("tests that the `merge` function merges arrays correctly", () => {
  const a = [2, 3, null, 5, 6, null]
  const b = [null, 3, 4, 5, null, 7, 8]
  const cTrue = [2, 3, 4, 5, 6, 7, 8]
  const cPred = merge(a, b)
  expect(isEqual(cPred, cTrue)).toBe(true)
})

test("tests that the `merge` function overwrites the values from earlier objects with the values from later objects", () => {
  const a = { hello: "world", foo: "bar" }
  const b = { hello: "goodbye", baz: 123 }
  const cTrue = { hello: "goodbye", foo: "bar", baz: 123 }
  const cPred = merge(a, b)
  expect(isEqual(cPred, cTrue)).toBe(true)
})

test("tests that the `merge` function throws errors at the right times", () => {
  const wrongs = [
    0,
    1,
    2.3,
    -2.3,
    234n,
    -234n,
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
  ]

  for (const wrong of wrongs) {
    expect(() => merge(wrong)).toThrow()
  }
})
