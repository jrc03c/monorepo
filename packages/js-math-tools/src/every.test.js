const { DataFrame, Series } = require("./dataframe")
const { random } = require("./random")
const every = require("./every")
const flatten = require("./flatten")
const isArray = require("./is-array")
const isFunction = require("./is-function")
const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")

test("tests that the `every` function works as expected", () => {
  const a = [234, ["foo", [true, [{ hello: "world" }]]]]

  expect(every(a, v => !isUndefined(v))).toBe(true)
  expect(every(flatten(a), v => !isUndefined(v))).toBe(true)
  expect(every(a, v => isNumber(v))).toBe(false)
  expect(every(flatten(a), v => isNumber(v))).toBe(false)

  const b = random([2, 3, 4, 5])
  expect(every(b, v => v >= 0 && v <= 1)).toBe(true)
  expect(every(b, v => v > 0.5)).toBe(false)

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
      if (!isArray(v1) || !isFunction(v2)) {
        expect(() => every(v1, v2)).toThrow()
      }
    })
  })
})
