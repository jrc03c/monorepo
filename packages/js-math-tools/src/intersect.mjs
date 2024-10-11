import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isEqual } from "./is-equal.mjs"
import { isSeries } from "./is-series.mjs"
import { set } from "./set.mjs"

function intersect() {
  const arrays = Object.values(arguments).map(x => {
    if (isDataFrame(x) || isSeries(x)) {
      return set(x.values)
    }

    assert(
      isArray(x),
      "The `intersect` function only works on arrays, Series, and DataFrames!",
    )

    return set(x)
  })

  const all = set(arrays)

  return all.filter(v => {
    return arrays.every(arr => arr.findIndex(other => isEqual(other, v)) > -1)
  })
}

export { intersect }
