import { assert } from "./assert.mjs"
import { indexOf } from "./index-of.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { min } from "./min.mjs"

function argmin(x, shouldDropNaNs) {
  if (isDataFrame(x)) {
    const index = argmin(x.values, shouldDropNaNs)
    return [x.index[index[0]], x.columns[index[1]]]
  }

  if (isSeries(x)) {
    const index = argmin(x.values, shouldDropNaNs)
    return x.index[index]
  }

  assert(
    isArray(x),
    "The `argmin` function only works on arrays, Series, and DataFrames!",
  )

  try {
    const out = indexOf(x, min(x, shouldDropNaNs))

    if (out) {
      if (out.length === 0) {
        return undefined
      } else if (out.length === 1) {
        return out[0]
      } else {
        return out
      }
    } else {
      return undefined
    }
  } catch (e) {
    return undefined
  }
}

export { argmin }
