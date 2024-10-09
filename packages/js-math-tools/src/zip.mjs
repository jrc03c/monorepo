import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { max } from "./max.mjs"
import { range } from "./range.mjs"

function zip() {
  const out = []

  const arrays = Object.values(arguments).map(arr => {
    if (isDataFrame(arr) || isSeries(arr)) {
      arr = arr.values
    }

    assert(
      isArray(arr),
      "The `zip` function only works on arrays, Series, and DataFrames!",
    )

    return arr
  })

  range(0, max(arrays.map(arr => arr.length))).forEach(i => {
    const row = []

    arrays.forEach(arr => {
      const value = arr[i]
      row.push(isUndefined(value) ? undefined : value)
    })

    out.push(row)
  })

  return out
}

export { zip }
