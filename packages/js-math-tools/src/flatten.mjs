import { assert } from "./assert.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

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

    forEach(arr, child => {
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

export { flatten }
