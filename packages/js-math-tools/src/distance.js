import abs from "./abs.js"
import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isEqual from "./is-equal.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"
import pow from "./pow.js"
import shape from "./shape.js"
import sqrt from "./sqrt.js"
import subtract from "./subtract.js"
import sum from "./sum.js"

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

export default distance
