const {
  add,
  DataFrame,
  isDataFrame,
  isEqual,
  isNumber,
  isUndefined,
  normal,
  range,
  scale,
  Series,
  transpose,
} = require("@jrc03c/js-math-tools")

const common = require("./common")
const getHighlyCorrelatedColumns = require("./get-highly-correlated-columns")
const orthonormalize = require("./orthonormalize")

test("tests that highly correlated columns in matrices can be correctly identified", () => {
  const a = normal(100)
  const b = new DataFrame({ foo: a, bar: a, baz: a })

  const cTrue = {
    foo: ["bar", "baz"],
    bar: ["baz", "foo"],
    baz: ["bar", "foo"],
  }

  const cPred = getHighlyCorrelatedColumns(b)
  expect(isEqual(cPred, cTrue)).toBe(true)

  const d = normal(100)

  const e = new DataFrame({
    d1: d,
    d2: add(d, scale(1e-5, normal(100))),
    d3: add(d, normal(100)),
    d4: add(d, scale(1e5, normal(100))),
  })

  const fTrue = { d1: ["d2"], d2: ["d1"] }
  const fPred = getHighlyCorrelatedColumns(e)
  expect(isEqual(fPred, fTrue)).toBe(true)

  const g = new DataFrame(normal([100, 5]))

  expect(
    isEqual(
      getHighlyCorrelatedColumns(g),
      getHighlyCorrelatedColumns(g.values),
    ),
  ).toBe(true)

  const h = new DataFrame(orthonormalize(normal([100, 10])))
  const iTrue = {}
  const iPred = getHighlyCorrelatedColumns(h)
  expect(isEqual(iPred, iTrue)).toBe(true)

  const j = normal(100)

  const k = new DataFrame(
    transpose(range(0, 5).map(() => add(j, scale(1e-20, normal(100))))),
  )

  common.shouldIgnoreNaNValues = false
  const mTrue = getHighlyCorrelatedColumns(k)

  k.values[parseInt(Math.random() * k.shape[0])][
    parseInt(Math.random() * k.shape[1])
  ] = "uh-oh"

  const mPred1 = getHighlyCorrelatedColumns(k)
  expect(isEqual(mPred1, mTrue)).toBe(false)

  common.shouldIgnoreNaNValues = true
  const mPred2 = getHighlyCorrelatedColumns(k)
  expect(isEqual(mPred2, mTrue)).toBe(true)

  const n = new DataFrame({ a: [2n, 3n, 4n], b: [5n, 6n, 7n] })
  const p = n.apply(col => col.apply(v => Number(v)))
  const qTrue = { a: ["b"], b: ["a"] }

  expect(
    isEqual(getHighlyCorrelatedColumns(n), getHighlyCorrelatedColumns(p)),
  ).toBe(true)

  expect(isEqual(getHighlyCorrelatedColumns(n), qTrue)).toBe(true)

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
    [2, 3, 4],
    x => x,
    function (x) {
      return x
    },
    { hello: "world" },
    new Series({ hello: [10, 20, 30, 40, 50] }),
  ]

  wrongs.forEach(a => {
    wrongs.forEach(b => {
      if (!isDataFrame(a) && !isNumber(b) && !isUndefined(b)) {
        expect(() => getHighlyCorrelatedColumns(a, b)).toThrow()
      }
    })
  })
})
