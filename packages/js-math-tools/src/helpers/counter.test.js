const Counter = require("./counter")
const isEqual = require("../is-equal")
const set = require("../set")

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
      counter.counts,
      set(x).map(v => counter.get(v)),
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
    isEqual(counter.toArray(), [
      { value: "a", count: 4 },
      { value: "b", count: 100 },
      { value: "c", count: 5 },
    ]),
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

  // `getOriginalValue` method
  const objects = [{ hello: "world" }, { hello: "world" }, { hello: "world" }]
  objects.forEach(obj => counter.increment(obj))

  objects.forEach(obj => {
    expect(counter.get(obj)).toBe(objects.length)
    expect(counter.getOriginalValue(obj) === objects[0]).toBe(true)
  })

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