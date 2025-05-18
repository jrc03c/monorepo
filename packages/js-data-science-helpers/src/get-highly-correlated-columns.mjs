import {
  assert,
  correl,
  DataFrame,
  forEach,
  isArray,
  isDataFrame,
  isNumber,
  shape,
  sort,
  isUndefined,
} from "@jrc03c/js-math-tools"

function getHighlyCorrelatedColumns(x, threshold, shouldIgnoreNaNs) {
  threshold = isUndefined(threshold) ? 1 - 1e-5 : threshold

  if (!isDataFrame(x)) {
    x = new DataFrame(x)
  }

  const xshape = shape(x)

  assert(
    (isArray(x) || isDataFrame(x)) && xshape.length === 2,
    "The first argument passed into the `getHighlyCorrelatedColumns` function must be a 2-dimensional array or DataFrame!",
  )

  assert(
    isNumber(threshold) && threshold >= -1 && threshold <= 1,
    "The second argument passed into the `getHighlyCorrelatedColumns` must be a number in the range [-1, 1] representing the threshold above which two columns will be considered to be highly correlated!",
  )

  const out = {}

  if (shouldIgnoreNaNs) {
    x = x.dropNaN()
  }

  for (let i = 0; i < xshape[1] - 1; i++) {
    for (let j = i + 1; j < xshape[1]; j++) {
      const col1 = x.columns[i]
      const col2 = x.columns[j]
      const r = correl(x.get(col1), x.get(col2))

      if (r > threshold) {
        if (!out[col1]) {
          out[col1] = []
        }

        out[col1].push({ column: col2, correlation: r })

        if (!out[col2]) {
          out[col2] = []
        }

        out[col2].push({ column: col1, correlation: r })
      }
    }
  }

  forEach(Object.keys(out), key => {
    out[key] = sort(out[key], (a, b) => (a.column < b.column ? -1 : 1))
  })

  return out
}

export { getHighlyCorrelatedColumns }
