import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isFunction } from "../is-function.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"

function dfApply(DataFrame, Series, df, fn, axis) {
  axis = axis || 0

  assert(
    isFunction(fn),
    "The first parameter to the `apply` method must be a function.",
  )

  assert(
    axis === 0 || axis === 1,
    "The second parameter to the `apply` method (the `axis`) must be 0 or 1.",
  )

  // apply to columns
  if (axis === 0) {
    const temp = {}
    let shouldReturnADataFrame

    forEach(df.columns, (colName, i) => {
      const series = new Series(map(df.values, row => row[i]))
      series.name = colName
      series.index = df.index
      const value = fn(series, i, df)

      if (value instanceof Series) {
        temp[colName] = value.values
      } else {
        temp[colName] = value
      }

      if (isUndefined(shouldReturnADataFrame)) {
        shouldReturnADataFrame = value instanceof Series || isArray(value)
      }
    })

    if (shouldReturnADataFrame) {
      const out = new DataFrame(temp)
      out.index = df.index
      return out
    } else {
      const out = new Series(map(df.columns, colName => temp[colName]))
      out.index = df.columns
      return out
    }
  }

  // apply to rows
  else if (axis === 1) {
    let shouldReturnADataFrame

    const temp = map(df.values, (row, i) => {
      const series = new Series(row)
      series.name = df.index[i]
      series.index = df.columns
      const value = fn(series, i, df)

      if (isUndefined(shouldReturnADataFrame)) {
        shouldReturnADataFrame = value instanceof Series || isArray(value)
      }

      if (value instanceof Series) {
        return value.values
      } else {
        return value
      }
    })

    if (shouldReturnADataFrame) {
      const out = new DataFrame(temp)
      out.index = df.index
      out.columns = df.columns
      return out
    } else {
      const out = new Series(temp)
      out.index = df.index
      return out
    }
  }
}

export { dfApply }
