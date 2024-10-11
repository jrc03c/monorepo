import { decycle } from "./copy.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function helper(x) {
  if (isDataFrame(x) || isSeries(x)) {
    return helper(x.values)
  }

  if (isArray(x)) {
    let hasArrayValues = false
    let hasNonArrayValues = false
    let arrayLength = null

    for (const v of x) {
      if (helper(v)) {
        return true
      }

      if (isArray(v)) {
        if (arrayLength === null) {
          arrayLength = v.length
        } else if (v.length !== arrayLength) {
          return true
        }

        hasArrayValues = true
      } else {
        hasNonArrayValues = true
      }

      if (hasArrayValues && hasNonArrayValues) {
        return true
      }
    }
  }

  return false
}

function isJagged(x) {
  return helper(decycle(x))
}

export { isJagged }
