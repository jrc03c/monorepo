const {
  add,
  DataFrame,
  divide,
  int,
  isEqual,
  isNumber,
  max,
  min,
  normal,
  random,
  range,
  remap,
  Series,
} = require("@jrc03c/js-math-tools")

const getCorrelationMatrix = require("./get-correlation-matrix")
const sortCorrelationMatrix = require("./sort-correlation-matrix")

test("sorts a random correlation matrix", () => {
  const a = normal([1000, 5])
  const b = getCorrelationMatrix(a)
  expect(() => sortCorrelationMatrix(b)).not.toThrow()

  const c = new DataFrame(b)
  c.index = c.columns.slice()

  const d = sortCorrelationMatrix(c)
  expect(isEqual(sortCorrelationMatrix(b), d.values)).toBe(true)

  d.values.forEach((row, i) => {
    if (i < d.shape[0] - 2) {
      const r1 = d.values[(i + 1, i)]
      const r2 = d.values[(i + 2, i + 1)]

      if (!isNaN(r1) && !isNaN(r2)) {
        expect(r2).toBeGreaterThanOrEqual(r1)
      }
    }
  })

  // make sure that NaNs are handled correctly by replacing them with (e.g.)
  // -Infinity before sorting and then re-replacing them with NaNs afterwards!
  const e = new DataFrame(normal([10, 10]))
  e.index = e.columns
  e.values = divide(add(e.values, e.transpose().values), 2)
  e.values = remap(e.values, min(e.values), max(e.values), -1, 1)

  e.values.forEach((row, i) => {
    e.values[i][i] = 1
  })

  const possibles = [
    NaN,
    null,
    undefined,
    true,
    false,
    "Hello, world!",
    { foo: "bar" },
    Symbol.for("friend"),
    x => x,
  ]

  range(0, 0.1 * e.shape[0] * e.shape[1]).forEach(() => {
    const i = int(random() * e.shape[0])
    const j = int(random() * e.shape[1])
    const v = possibles[int(random() * possibles.length)]

    if (isNumber(e.values[i][j])) {
      e.values[i][j] = v
      e.values[j][i] = v
    }
  })

  expect(() => sortCorrelationMatrix(e)).toThrow()

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

  wrongs.forEach(item => {
    expect(() => sortCorrelationMatrix(item)).toThrow()
  })
})
