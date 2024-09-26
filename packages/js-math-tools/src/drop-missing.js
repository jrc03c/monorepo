import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"
import isUndefined from "./is-undefined.js"

function dropMissing(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropMissing(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropMissing` function only works on arrays, Series, and DataFrames!",
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropMissing(v))
    } catch (e) {
      if (!isUndefined(v)) {
        out.push(v)
      }
    }
  })

  return out
}

export default dropMissing
