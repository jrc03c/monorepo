import {
  assert,
  clamp,
  DataFrame,
  dropNaNPairwise,
  isArray,
  isDataFrame,
  isJagged,
  isUndefined,
  map,
  ndarray,
} from "@jrc03c/js-math-tools"

import { pValue } from "./p-value.mjs"

function stamp(x) {
  const prop = "@jrc03c/js-data-science-helpers/get-p-value-matrix"

  Object.defineProperty(x, prop, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: Symbol.for(prop),
  })

  return x
}

function getPValueMatrix(a, b, shouldIgnoreNaNs) {
  if (isUndefined(b)) {
    b = a
  }

  if (isDataFrame(a)) {
    const out = new DataFrame(getPValueMatrix(a.values, b))
    out.index = a.columns.slice()

    out.columns = isDataFrame(b)
      ? b.columns.slice()
      : new DataFrame(b).columns.slice()

    return stamp(out)
  }

  if (isDataFrame(b)) {
    const out = new DataFrame(getPValueMatrix(a, b.values))

    out.index = isDataFrame(a)
      ? a.columns.slice()
      : new DataFrame(a).columns.slice()

    out.columns = b.columns.slice()
    return stamp(out)
  }

  assert(
    isArray(a) && isArray(b),
    "The `getPValueMatrix` function only works on 2-dimensional arrays and DataFrames!",
  )

  assert(
    !isJagged(a) && !isJagged(b),
    "The `getPValueMatrix` function only works on non-jagged 2-dimensional arrays and DataFrames!",
  )

  assert(
    a.length === b.length,
    `The dimensions of the matrices you passed into the \`getPValueMatrix\` function aren't compatible! ([shape(a).join(", ")] vs. [shape(b).join(", ")]) The function expects that you'll be comparing the columns of two matrices where the columns are all of the same length, so please make sure that the matrices are oriented accordingly.`,
  )

  const out = ndarray([a[0].length, b[0].length])

  for (let i = 0; i < a[0].length; i++) {
    const acol = map(a, row => row[i])

    for (let j = 0; j < b[0].length; j++) {
      const bcol = map(b, row => row[j])

      if (shouldIgnoreNaNs) {
        out[i][j] = pValue(...dropNaNPairwise(acol, bcol))
      } else {
        out[i][j] = pValue(acol, bcol)
      }
    }
  }

  return stamp(clamp(out, 0, 1))
}

export { getPValueMatrix }
