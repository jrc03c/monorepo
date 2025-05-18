import { assert } from "./assert.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isEqual } from "./is-equal.mjs"
import { isSeries } from "./is-series.mjs"
import { set } from "./set.mjs"

function diff(a, b) {
  if (isDataFrame(a) || isSeries(a)) {
    return diff(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return diff(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `diff` function only works on arrays, Series, and DataFrames!",
  )

  const aTemp = set(a)
  const bTemp = set(b)
  const out = []

  forEach(aTemp, item => {
    if (bTemp.findIndex(other => isEqual(other, item)) < 0) {
      out.push(item)
    }
  })

  return out
}

export { diff }
