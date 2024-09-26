import assert from "../assert.js"
import flatten from "../flatten.js"
import isFunction from "../is-function.js"
import isUndefined from "../is-undefined.js"

function arrayToObject(x) {
  const out = {}

  flatten(x).forEach((value, i) => {
    out[value] = i
  })

  return out
}

function undoArrayToObject(obj) {
  return Object.keys(obj)
    .concat(Object.getOwnPropertySymbols(obj))
    .sort((a, b) => obj[a] - obj[b])
}

function dfFilter(DataFrame, Series, df, fn, axis) {
  assert(
    isFunction(fn),
    "The `filter` method takes a single parameter: a function that is used to filter the values.",
  )

  if (isUndefined(axis)) axis = 0

  assert(
    axis === 0 || axis === 1,
    "The `axis` parameter to the `filter` method must be 0 or 1.",
  )

  let out = df.copy()
  if (out.isEmpty) return out

  const index = arrayToObject(out.index)
  const columns = arrayToObject(out.columns)

  // filter rows
  if (axis === 0) {
    let count = 0

    const newValues = out.values.filter((row, i) => {
      const series = new Series(row)
      series.name = df.index[i]
      series.index = df.columns
      const shouldKeep = fn(series, i, df)

      if (shouldKeep) {
        count++
      } else {
        delete index[out.index[i]]
      }

      return shouldKeep
    })

    if (count === 0) {
      return new DataFrame()
    }

    if (count === 1) {
      const temp = new Series(newValues[0])
      temp.name = undoArrayToObject(index)[0]
      temp.index = undoArrayToObject(columns)
      return temp
    }

    out.values = newValues
    out.index = undoArrayToObject(index)
  }

  // filter columns
  else if (axis === 1) {
    out = out.transpose()
    let count = 0

    const newValues = out.values.filter((row, i) => {
      const series = new Series(row)
      series.name = df.columns[i]
      series.index = df.index
      const shouldKeep = fn(series, i, df)

      if (shouldKeep) {
        count++
      } else {
        delete columns[out.index[i]]
      }

      return shouldKeep
    })

    if (count === 0) {
      return new DataFrame()
    }

    if (count === 1) {
      const temp = new Series(newValues[0])
      temp.name = undoArrayToObject(columns)[0]
      temp.index = undoArrayToObject(index)
      return temp
    }

    out.values = newValues
    out.index = undoArrayToObject(columns)
    out = out.transpose()
  }

  return out
}

export default dfFilter
