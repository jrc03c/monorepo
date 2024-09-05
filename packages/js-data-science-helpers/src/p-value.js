const {
  abs,
  assert,
  dropNaNPairwise,
  flatten,
  isArray,
  isDataFrame,
  isEqual,
  isSeries,
  remap,
  round,
  shape,
  sqrt,
  stats,
} = require("@jrc03c/js-math-tools")

const zTable = require("./z-table.json")

function probability(z) {
  if (abs(z) > 4.1) return 0
  return zTable[round(remap(abs(z), 0, 4.1, 0, zTable.length))]
}

function ttest(a, b, shouldIgnoreNaNs) {
  if (isDataFrame(a) || isSeries(a)) {
    return ttest(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return ttest(a, b.values)
  }

  assert(
    isArray(a) && isArray(b) && isEqual(shape(a), shape(b)),
    "You must pass two identically-shaped arrays, Series, or DataFrames into the `pValue` function!",
  )

  const [aTemp, bTemp] = shouldIgnoreNaNs
    ? dropNaNPairwise(flatten(a), flatten(b))
    : [flatten(a), flatten(b)]

  if (aTemp.length === 0 || bTemp.length === 0) {
    return NaN
  }

  const astats = stats(aTemp, { stdev: true })
  const bstats = stats(bTemp, { stdev: true })
  const m1 = astats.mean
  const m2 = bstats.mean
  const s1 = astats.stdev
  const s2 = bstats.stdev
  const n1 = aTemp.length
  const n2 = bTemp.length
  const t = (m1 - m2) / sqrt((s1 * s1) / n1 + (s2 * s2) / n2)
  return 2 * probability(t)
}

module.exports = ttest
