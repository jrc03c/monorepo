import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

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

export { isNested }
