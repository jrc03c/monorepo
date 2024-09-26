import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isEqual from "./is-equal.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"
import shape from "./shape.js"

function dropNaNPairwise(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return dropNaNPairwise(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return dropNaNPairwise(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `dropNaNPairwise` only works on arrays, Series, and DataFrames!",
  )

  assert(
    isEqual(shape(a), shape(b)),
    "The two arrays, Series, and/or DataFrames passed into the `dropNaNPairwise` must have the same shape!",
  )

  const aOut = []
  const bOut = []

  for (let i = 0; i < a.length; i++) {
    try {
      const [aChildren, bChildren] = dropNaNPairwise(a[i], b[i])
      aOut.push(aChildren)
      bOut.push(bChildren)
    } catch (e) {
      if (isNumber(a[i]) && isNumber(b[i])) {
        aOut.push(a[i])
        bOut.push(b[i])
      }
    }
  }

  return [aOut, bOut]
}

export default dropNaNPairwise
