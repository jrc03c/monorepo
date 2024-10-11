import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function helper(x) {
  if (isArray(x)) {
    const childShapes = helper(x[0])
    return [x.length].concat(childShapes || [])
  } else {
    return undefined
  }
}

function shape(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return shape(x.values)
  }

  assert(
    isArray(x),
    "The `shape` function only works on arrays, Series, and DataFrames!",
  )

  return helper(x)
}

export { shape }
