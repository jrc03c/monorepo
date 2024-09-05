const {
  assert,
  DataFrame,
  divide,
  isArray,
  isDataFrame,
  isJagged,
  shape,
  subtract,
  transpose,
} = require("@jrc03c/js-math-tools")

const getMagnitude = require("./get-magnitude")
const project = require("./project")

function orthonormalize(x) {
  if (isDataFrame(x)) {
    const out = new DataFrame(orthonormalize(x.values))
    out.index = x.index.slice()
    out.columns = x.columns.slice()
    return out
  }

  assert(
    isArray(x) && !isJagged(x) && shape(x).length === 2,
    "`orthonormalize` only works on matrices!",
  )

  // note: this produces a matrix where the *columns* are orthogonal to each
  // other!
  // note: it's possible to do this without transposing the data twice; but my
  // tests seem to show that transposition is relatively fast, even on pretty
  // large matrices; so i think i'll leave it this way for now
  const temp = transpose(x)
  const bases = []

  temp.forEach(v => {
    let temp = v

    bases.forEach(basis => {
      temp = subtract(temp, project(temp, basis))
    })

    bases.push(temp)
  })

  const shouldDropNaNs = true

  const out = bases.map(basis =>
    divide(basis, getMagnitude(basis, shouldDropNaNs)),
  )

  return transpose(out)
}

module.exports = orthonormalize
