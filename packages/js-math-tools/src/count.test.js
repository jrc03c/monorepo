import { DataFrame, Series } from "./dataframe/index.js"
import count from "./count.js"
import flatten from "./flatten.js"
import isEqual from "./is-equal.js"
import round from "./round.js"
import normal from "./normal.js"
import set from "./set.js"

test("tests that values in an array can be counted correctly", () => {
  const a = round(normal(1000))

  set(a).forEach(v => {
    expect(count(a, v).get(v)).toBe(a.filter(x => x === v).length)
  })

  const b = new Series(round(normal(1000)))
  const c = new DataFrame(round(normal([100, 10])))

  set(b).forEach(v => {
    expect(count(b, v).get(v)).toBe(
      flatten(b.values).filter(x => isEqual(x, v)).length,
    )
  })

  set(c).forEach(v => {
    expect(count(c, v).get(v)).toBe(
      flatten(c.values).filter(x => isEqual(x, v)).length,
    )
  })

  expect(isEqual(count(b), count(b.values))).toBe(true)
  expect(isEqual(count(b, 2), count(b.values, 2)))
  expect(isEqual(count(c), count(c.values))).toBe(true)
  expect(isEqual(count(c, 2), count(c.values, 2))).toBe(true)

  const d = [2n, 3n, 2n, 3n, 3n, 4n, 3n, 2n, 3n]
  const dCounts = count(d)

  for (const v of [2n, 3n, 4n]) {
    expect(dCounts.get(v)).toBe(d.filter(other => other === v).length)
  }

  const fn1 = x => x

  function fn2(x) {
    return x
  }

  const temp = [
    1,
    2.3,
    0,
    false,
    -2.3,
    NaN,
    -Infinity,
    false,
    Symbol.for("Hello, world!"),
    true,
    true,
    0,
    true,
    fn2,
    fn1,
    true,
    undefined,
    fn1,
    NaN,
    0,
    fn1,
    NaN,
    2.3,
    -Infinity,
    0,
    -2.3,
    true,
    Symbol.for("Hello, world!"),
    -Infinity,
    fn2,
    undefined,
    true,
    0,
    0,
    "foo",
    2.3,
    "foo",
    -2.3,
    2.3,
    -Infinity,
    false,
    true,
    fn1,
    "foo",
    2.3,
    true,
    fn1,
    null,
    Symbol.for("Hello, world!"),
    0,
    null,
    NaN,
    NaN,
    undefined,
    Symbol.for("Hello, world!"),
    Infinity,
    NaN,
    2.3,
    Infinity,
    -Infinity,
    undefined,
    fn1,
    "foo",
    -Infinity,
    "foo",
    1,
    undefined,
    "foo",
    Infinity,
    fn2,
    "foo",
    Symbol.for("Hello, world!"),
    fn1,
    0,
    undefined,
    "foo",
    Symbol.for("Hello, world!"),
    fn1,
    Infinity,
    0,
    undefined,
    fn1,
    Symbol.for("Hello, world!"),
    NaN,
    Infinity,
    Infinity,
    Infinity,
    -2.3,
    -Infinity,
    1,
    Infinity,
    0,
    NaN,
    Infinity,
    "foo",
    1,
    Infinity,
    false,
    true,
    Symbol.for("Hello, world!"),
  ]

  const tempCounts = count(temp)

  expect(tempCounts.get(1)).toBe(4)
  expect(tempCounts.get(2.3)).toBe(6)
  expect(tempCounts.get(0)).toBe(10)
  expect(tempCounts.get(false)).toBe(4)
  expect(tempCounts.get(-2.3)).toBe(4)
  expect(tempCounts.get(NaN)).toBe(8)
  expect(tempCounts.get(-Infinity)).toBe(7)
  expect(tempCounts.get(Symbol.for("Hello, world!"))).toBe(8)
  expect(tempCounts.get(true)).toBe(9)
  expect(tempCounts.get(fn1)).toBe(9)
  expect(tempCounts.get(undefined)).toBe(7)
  expect(tempCounts.get(fn2)).toBe(3)
  expect(tempCounts.get("foo")).toBe(9)
  expect(tempCounts.get(null)).toBe(2)
  expect(tempCounts.get(Infinity)).toBe(10)
})
