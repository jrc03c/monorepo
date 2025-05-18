import { assert } from "./assert.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"
import { max } from "./max.mjs"
import { range } from "./range.mjs"

function zip() {
  const out = []

  const arrays = map(Object.values(arguments), arr => {
    if (isDataFrame(arr) || isSeries(arr)) {
      arr = arr.values
    }

    assert(
      isArray(arr),
      "The `zip` function only works on arrays, Series, and DataFrames!",
    )

    return arr
  })

  forEach(range(0, max(map(arrays, arr => arr.length))), i => {
    const row = []

    forEach(arrays, arr => {
      const value = arr[i]
      row.push(isUndefined(value) ? undefined : value)
    })

    out.push(row)
  })

  return out
}

export { zip }
