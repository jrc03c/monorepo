import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function reverse(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    const out = arr.copy()
    out.values = reverse(out.values)
    out.index = reverse(out.index)
    return out
  }

  assert(
    isArray(arr),
    "The `reverse` function only works on arrays, Series, and DataFrames!",
  )

  const out = []
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i])
  return out
}

export { reverse }
