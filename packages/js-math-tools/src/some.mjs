import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isFunction } from "./is-function.mjs"
import { isSeries } from "./is-series.mjs"

function some(x, fn) {
  if (isDataFrame(x) || isSeries(x)) {
    return some(x.values, fn)
  }

  assert(
    isArray(x),
    "The first argument passed into the `some` function must be an array, Series, or DataFrame!",
  )

  assert(
    isFunction(fn),
    "The second argument passed into the `some` function must be a function!",
  )

  for (const v of x) {
    if (isArray(v)) {
      if (some(v, fn)) {
        return true
      }
    } else {
      if (fn(v)) {
        return true
      }
    }
  }

  return false
}

export { some }
