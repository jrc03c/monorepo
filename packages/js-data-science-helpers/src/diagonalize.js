const {
  assert,
  DataFrame,
  isArray,
  isSeries,
  shape,
  zeros,
} = require("@jrc03c/js-math-tools")

function diagonalize(x) {
  if (isSeries(x)) {
    const out = new DataFrame(diagonalize(x.values))
    out.index = x.index.slice()
    out.columns = x.index.slice()
    return out
  }

  assert(
    isArray(x),
    "The `diagonalize` function only works on 1-dimensional arrays and Series!",
  )

  const xShape = shape(x)

  assert(
    xShape.length === 1,
    "The `diagonalize` function only works on 1-dimensional arrays and Series!",
  )

  const isAllBigInts = x.every(v => typeof v === "bigint")
  const out = zeros([xShape[0], xShape[0]])
  x.forEach((v, i) => (out[i][i] = v))

  if (isAllBigInts) {
    for (let i = 0; i < out.length; i++) {
      for (let j = 0; j < out[i].length; j++) {
        try {
          out[i][j] = BigInt(out[i][j])
        } catch (e) {
          // ...
        }
      }
    }
  }

  return out
}

module.exports = diagonalize
