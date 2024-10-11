import { assert } from "./assert.mjs"
import { flatten } from "./flatten.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"

function product(arr, shouldDropNaNs) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return product(arr.values, shouldDropNaNs)
  }

  assert(
    isArray(arr),
    "The `product` function only works on arrays, Series, and DataFrames!",
  )

  try {
    if (arr.length === 0) return NaN

    const temp = flatten(arr)
    let resultShouldBeABigInt = false
    let out = 1

    for (let v of temp) {
      if (!isNumber(v)) {
        if (shouldDropNaNs) {
          v = 1
        } else {
          return NaN
        }
      }

      if (typeof v === "bigint") {
        resultShouldBeABigInt = true
        v = Number(v)
      }

      out *= v
    }

    if (resultShouldBeABigInt) {
      try {
        return BigInt(out)
      } catch (e) {}
    }

    return out
  } catch (e) {
    return NaN
  }
}

export { product }
