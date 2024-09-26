import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"
import isUndefined from "./is-undefined.js"
import max from "./max.js"
import range from "./range.js"

function zip() {
  const out = []

  const arrays = Object.values(arguments).map(arr => {
    if (isDataFrame(arr) || isSeries(arr)) {
      arr = arr.values
    }

    assert(
      isArray(arr),
      "The `zip` function only works on arrays, Series, and DataFrames!",
    )

    return arr
  })

  range(0, max(arrays.map(arr => arr.length))).forEach(i => {
    const row = []

    arrays.forEach(arr => {
      const value = arr[i]
      row.push(isUndefined(value) ? undefined : value)
    })

    out.push(row)
  })

  return out
}

export default zip
