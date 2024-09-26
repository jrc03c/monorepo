import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"

function flatten(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return flatten(arr.values)
  }

  assert(
    isArray(arr),
    "The `flatten` function only works on arrays, Series, and DataFrames!",
  )

  function helper(arr) {
    let out = []

    arr.forEach(child => {
      if (isArray(child)) {
        out = out.concat(helper(child))
      } else {
        out.push(child)
      }
    })

    return out
  }

  return helper(arr)
}

export default flatten
