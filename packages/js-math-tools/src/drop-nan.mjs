import { assert } from "./assert.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"

function dropNaN(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropNaN(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropNaN` function only works on arrays, Series, and DataFrames!",
  )

  const out = []

  forEach(x, v => {
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

export { dropNaN }
