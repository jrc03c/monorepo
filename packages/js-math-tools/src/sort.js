import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isFunction from "./is-function.js"
import isSeries from "./is-series.js"
import isUndefined from "./is-undefined.js"

function alphaSort(a, b) {
  try {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  } catch (e) {
    a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString()
    b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString()
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }
}

function sort(arr, fn) {
  if (isUndefined(fn)) fn = alphaSort

  if (isDataFrame(arr) || isSeries(arr)) {
    return arr.sort(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(arr),
    "The `sort` function only works on arrays, Series, and DataFrames!",
  )

  assert(
    isFunction(fn),
    "The second parameter of the `sort` function must be a comparison function!",
  )

  const out = arr.slice()
  out.sort(fn)
  return out
}

export default sort
