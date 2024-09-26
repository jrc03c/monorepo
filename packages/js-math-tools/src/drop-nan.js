import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"

function dropNaN(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropNaN(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropNaN` function only works on arrays, Series, and DataFrames!",
  )

  const out = []

  x.forEach(v => {
    try {
      return out.push(dropNaN(v))
    } catch (e) {
      if (isNumber(v)) {
        return out.push(v)
      }
    }
  })

  return out
}

export default dropNaN
