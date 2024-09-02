const {
  assert,
  IndexMatcher,
  isArray,
  isSeries,
  shape,
  stats,
} = require("@jrc03c/js-math-tools")

function cohensd(arr1, arr2, shouldDropNaNs) {
  if (isSeries(arr1)) {
    return cohensd(arr1.values, arr2)
  }

  if (isSeries(arr2)) {
    return cohensd(arr1, arr2.values)
  }

  assert(
    isArray(arr1) &&
      isArray(arr2) &&
      shape(arr1).length === 1 &&
      shape(arr2).length === 1,
    "The `cohensd` function only works on 1-dimensional arrays and Series!",
  )

  assert(
    arr1.length === arr2.length,
    "Two arrays or Series passed into the `cohensd` function must have the same length!",
  )

  if (shouldDropNaNs) {
    const results = new IndexMatcher().fitAndTransform(arr1, arr2)
    arr1 = results[0]
    arr2 = results[1]
  }

  try {
    const stats1 = stats(arr1, { variance: true })
    const stats2 = stats(arr2, { variance: true })
    const m1 = stats1.mean
    const m2 = stats2.mean
    return (m1 - m2) / Math.sqrt((stats1.variance + stats2.variance) / 2)
  } catch (e) {
    return NaN
  }
}

module.exports = cohensd
