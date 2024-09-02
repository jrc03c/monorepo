const {
  assert,
  correl,
  DataFrame,
  isArray,
  isDataFrame,
  isNumber,
  shape,
  sort,
  isUndefined,
} = require("@jrc03c/js-math-tools")

const common = require("./common")

function getHighlyCorrelatedColumns(x, threshold) {
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

  if (common.shouldIgnoreNaNValues) {
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

        out[col1].push(col2)

        if (!out[col2]) {
          out[col2] = []
        }

        out[col2].push(col1)
      }
    }
  }

  Object.keys(out).forEach(key => {
    out[key] = sort(out[key])
  })

  return out
}

module.exports = getHighlyCorrelatedColumns
