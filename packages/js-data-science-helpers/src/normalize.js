const {
  apply,
  assert,
  isArray,
  isDataFrame,
  isSeries,
  stats,
} = require("@jrc03c/js-math-tools")

function normalize(x, shouldIgnoreNaNs) {
  if (isDataFrame(x) || isSeries(x)) {
    const out = x.copy()
    out.values = normalize(out.values)
    return out
  }

  assert(
    isArray(x),
    "The `normalize` function only works on arrays, Series, and DataFrames!",
  )

  const results = stats(x, { shouldDropNaNs: shouldIgnoreNaNs, stdev: true })
  const m = results.mean
  const s = results.stdev
  return apply(x, v => (Number(v) - m) / s)
}

module.exports = normalize
