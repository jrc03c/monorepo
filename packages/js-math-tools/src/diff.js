import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isEqual from "./is-equal.js"
import isSeries from "./is-series.js"
import set from "./set.js"

function diff(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return diff(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return diff(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `diff` function only works on arrays, Series, and DataFrames!",
  )

  const aTemp = set(a)
  const bTemp = set(b)
  const out = []

  aTemp.forEach(item => {
    if (bTemp.findIndex(other => isEqual(other, item)) < 0) {
      out.push(item)
    }
  })

  return out
}

export default diff
