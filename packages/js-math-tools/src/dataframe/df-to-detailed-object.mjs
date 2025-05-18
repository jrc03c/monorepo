import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isUndefined } from "../is-undefined.mjs"

function dfToDetailedObject(df, axis) {
  if (isUndefined(axis)) {
    axis = 0
  } else {
    assert(
      axis === 0 || axis === 1,
      "The axis parameter of the `toDetailedObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows.",
    )
  }

  // rows then columns
  const out = {}

  if (axis === 0) {
    forEach(df.index, (rowName, i) => {
      const temp = {}

      forEach(df.columns, (colName, j) => {
        temp[colName] = df.values[i][j]
      })

      out[rowName] = temp
    })
  }

  // columns then rows
  else {
    forEach(df.columns, (colName, j) => {
      const temp = {}

      forEach(df.index, (rowName, i) => {
        temp[rowName] = df.values[i][j]
      })

      out[colName] = temp
    })
  }

  return out
}

export { dfToDetailedObject }
