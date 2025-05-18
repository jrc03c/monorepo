import { assert } from "./assert.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { isUndefined } from "./is-undefined.mjs"

function dropMissing(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return x.dropMissing(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(x),
    "The `dropMissing` function only works on arrays, Series, and DataFrames!",
  )

  const out = []

  forEach(x, v => {
    try {
      return out.push(dropMissing(v))
    } catch (e) {
      if (!isUndefined(v)) {
        out.push(v)
      }
    }
  })

  return out
}

export { dropMissing }
