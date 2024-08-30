const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isFunction = require("./is-function")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")
const some = require("./some")

test("tests that the `some` function works as expected", () => {
  const a = [234, ["foo", [true, [{ hello: "world" }]]]]

  expect(some(a, v => isUndefined(v))).toBe(false)
  expect(some(flatten(a), v => isUndefined(v))).toBe(false)
  expect(some(a, v => isNumber(v))).toBe(true)
  expect(some(flatten(a), v => isNumber(v))).toBe(true)

  const b = random([2, 3, 4, 5])
  expect(some(b, v => v < 0 || v > 1)).toBe(false)
  expect(some(b, v => v > 0.5)).toBe(true)

  const c = new DataFrame(random([100, 5]))
  expect(some(c, v => v < 0 || v > 1)).toBe(false)

  let counter = 0

  some(c, () => {
    counter++
    return false
  })

  expect(counter).toBe(500)

  const d = new Series(random(100))
  expect(some(d, v => v > 0.5)).toBe(true)

  counter = 0

  some(d, () => {
    counter++
    return false
  })

  expect(counter).toBe(100)

  const selfReferencer = [2, 3, 4]
  selfReferencer.push(selfReferencer)

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
    [2, 3, 4],
    [
      [2, 3, 4],
      [5, 6, 7],
    ],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Date(),
    selfReferencer,
    new Series({ hello: [10, 20, 30, 40, 50] }),
    new DataFrame({ foo: [1, 2, 4, 8, 16], bar: [1, 3, 9, 27, 81] }),
  ]

  wrongs.forEach(v1 => {
    wrongs.forEach(v2 => {
      if (
        (!isArray(v1) && !isDataFrame(v1) && !isSeries(v1)) ||
        !isFunction(v2)
      ) {
        expect(() => some(v1, v2)).toThrow()
      }
    })
  })
})
