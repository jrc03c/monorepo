import { abs } from "./abs.mjs"
import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isEqual } from "./is-equal.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"
import { pow } from "./pow.mjs"
import { shape } from "./shape.mjs"
import { sqrt } from "./sqrt.mjs"
import { subtract } from "./subtract.mjs"
import { sum } from "./sum.mjs"

function distance(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return abs(a - b)
  }

  if (isDataFrame(a) || isSeries(a)) {
    return distance(a.values, b)
  }

  if (isDataFrame(b) || isSeries(b)) {
    return distance(a, b.values)
  }

  if (isArray(a) && isArray(b)) {
    assert(
      isEqual(shape(a), shape(b)),
      "If passing two arrays, Series, or DataFrames into the `distance` function, then those objects must have the same shape!",
    )
  }

  try {
    return sqrt(sum(pow(subtract(a, b), 2)))
  } catch (e) {
    return NaN
  }
}

export { distance }
