import assert from "./assert.js"
import indexOf from "./index-of.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"
import max from "./max.js"

function argmax(x, shouldDropNaNs) {
  if (isDataFrame(x)) {
    const index = argmax(x.values, shouldDropNaNs)
    return [x.index[index[0]], x.columns[index[1]]]
  }

  if (isSeries(x)) {
    const index = argmax(x.values, shouldDropNaNs)
    return x.index[index]
  }

  assert(
    isArray(x),
    "The `argmax` function only works on arrays, Series, and DataFrames!",
  )

  try {
    const out = indexOf(x, max(x, shouldDropNaNs))

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

export default argmax
