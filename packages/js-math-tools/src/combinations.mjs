import { assert } from "./assert.mjs"
import { flatten } from "./flatten.mjs"
import { int } from "./int.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"

export function combinationsIterator(x, r) {
  function* helper(x, r) {
    if (r > x.length) {
      yield x
    } else if (r <= 0) {
      yield []
    } else if (x.length < 2) {
      yield x
    } else {
      for (let i = 0; i < x.length; i++) {
        const item = x[i]
        const after = x.slice(i + 1)

        if (after.length < r - 1) {
          continue
        }

        if (r - 1 >= 0) {
          for (const child of combinationsIterator(after, r - 1)) {
            yield [item].concat(child)
          }
        }
      }
    }
  }

  if (isDataFrame(x) || isSeries(x)) {
    return combinationsIterator(x.values, r)
  }

  assert(
    isArray(x),
    "The `combinations` function only works on arrays, Series, and DataFrames!",
  )

  assert(
    isNumber(r) && int(r) === r && r >= 0,
    "`r` must be a non-negative integer!",
  )

  return helper(flatten(x), r)
}

export function combinations(x, r) {
  const out = []

  for (const combo of combinationsIterator(x, r)) {
    out.push(combo.slice())
  }

  return out
}
