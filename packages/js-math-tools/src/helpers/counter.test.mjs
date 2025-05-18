import { Counter } from "./counter.mjs"
import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "../is-equal.mjs"
import { map } from "../map.mjs"
import { set } from "../set.mjs"

test("tests that the `Counter` class works as expected", () => {
  const x = ["a", "a", "a", "b", "b", "c", "c", "c", "c", "c"]
  const counter = new Counter()

  // `has` method
  expect(counter.has("a")).toBe(false)
  expect(counter.has("b")).toBe(false)
  expect(counter.has("c")).toBe(false)
  expect(counter.has("d")).toBe(false)
  expect(counter.has("e")).toBe(false)
  expect(counter.has("f")).toBe(false)

  // `count` method
  counter.count(x)
  expect(counter.has("a")).toBe(true)
  expect(counter.has("b")).toBe(true)
  expect(counter.has("c")).toBe(true)
  expect(counter.has("d")).toBe(false)
  expect(counter.has("e")).toBe(false)
  expect(counter.has("f")).toBe(false)

  // `get` method
  expect(counter.get("a")).toBe(3)
  expect(counter.get("b")).toBe(2)
  expect(counter.get("c")).toBe(5)
  expect(counter.get("d")).toBe(0)
  expect(counter.get("e")).toBe(0)
  expect(counter.get("f")).toBe(0)

  // `values` getter
  expect(isEqual(counter.values, set(x))).toBe(true)

  // `counts` getter
  expect(
    isEqual(
      counter.counts.toSorted(),
      map(set(x), v => counter.get(v)).toSorted(),
    ),
  ).toBe(true)

  // `increment` method
  counter.increment("a")
  expect(counter.get("a")).toBe(4)
  expect(counter.get("b")).toBe(2)
  expect(counter.get("c")).toBe(5)
  expect(counter.get("d")).toBe(0)
  expect(counter.get("e")).toBe(0)
  expect(counter.get("f")).toBe(0)

  // `set` method
  counter.set("b", 100)
  expect(counter.get("a")).toBe(4)
  expect(counter.get("b")).toBe(100)
  expect(counter.get("c")).toBe(5)
  expect(counter.get("d")).toBe(0)
  expect(counter.get("e")).toBe(0)
  expect(counter.get("f")).toBe(0)

  // `toArray` method
  expect(
    isEqual(
      counter.toArray().toSorted((a, b) => a.count - b.count),
      [
        { value: "a", count: 4 },
        { value: "b", count: 100 },
        { value: "c", count: 5 },
      ].toSorted((a, b) => a.count - b.count),
    ),
  ).toBe(true)

  // `toObject` method
  expect(isEqual(counter.toObject(), { a: 4, b: 100, c: 5 })).toBe(true)

  // `delete` method
  counter.delete("c")
  expect(counter.get("a")).toBe(4)
  expect(counter.get("b")).toBe(100)
  expect(counter.get("c")).toBe(0)
  expect(counter.get("d")).toBe(0)
  expect(counter.get("e")).toBe(0)
  expect(counter.get("f")).toBe(0)

  // `clear` method
  counter.clear()
  expect(counter.has("a")).toBe(false)
  expect(counter.has("b")).toBe(false)
  expect(counter.has("c")).toBe(false)
  expect(counter.has("d")).toBe(false)
  expect(counter.has("e")).toBe(false)
  expect(counter.has("f")).toBe(false)
  expect(counter.get("a")).toBe(0)
  expect(counter.get("b")).toBe(0)
  expect(counter.get("c")).toBe(0)
  expect(counter.get("d")).toBe(0)
  expect(counter.get("e")).toBe(0)
  expect(counter.get("f")).toBe(0)
})
