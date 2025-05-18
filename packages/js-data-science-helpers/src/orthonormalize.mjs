import {
  assert,
  DataFrame,
  divide,
  forEach,
  isArray,
  isDataFrame,
  isJagged,
  map,
  shape,
  subtract,
  transpose,
} from "@jrc03c/js-math-tools"

import { getMagnitude } from "./get-magnitude.mjs"
import { project } from "./project.mjs"

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

  forEach(temp, v => {
    let temp = v

    forEach(bases, basis => {
      temp = subtract(temp, project(temp, basis))
    })

    bases.push(temp)
  })

  const shouldIgnoreNaNs = true

  const out = map(bases, basis =>
    divide(basis, getMagnitude(basis, shouldIgnoreNaNs)),
  )

  return transpose(out)
}

export { orthonormalize }
