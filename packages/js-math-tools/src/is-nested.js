import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"

function isNested(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return isNested(x.values)
  }

  assert(
    isArray(x),
    "The `isNested` function only works on arrays, Series, and DataFrames!",
  )

  for (let i = 0; i < x.length; i++) {
    if (isArray(x[i])) {
      return true
    }
  }

  return false
}

export default isNested
