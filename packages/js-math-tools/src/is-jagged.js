import { decycle } from "./copy.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"

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

export default isJagged
