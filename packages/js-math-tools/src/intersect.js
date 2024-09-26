import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isEqual from "./is-equal.js"
import isSeries from "./is-series.js"
import set from "./set.js"

function intersect() {
  const arrays = Object.values(arguments).map(x => {
    if (isDataFrame(x) || isSeries(x)) {
      return set(x.values)
    }

    assert(
      isArray(x),
      "The `intersect` function only works on arrays, Series, and DataFrames!",
    )

    return set(x)
  })

  const all = set(arrays)

  return all.filter(v => {
    return arrays.every(arr => arr.findIndex(other => isEqual(other, v)) > -1)
  })
}

export default intersect
