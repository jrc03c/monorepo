import assert from "../assert.js"
import isArray from "../is-array.js"
import isString from "../is-string.js"
import isUndefined from "../is-undefined.js"
import shape from "../shape.js"

function dfGetSubsetByNames(DataFrame, Series, df, rows, cols) {
  if (isUndefined(rows)) rows = df.index
  if (isUndefined(cols)) cols = df.columns
  if (isString(rows)) rows = [rows]
  if (isString(cols)) cols = [cols]

  assert(
    isArray(rows) && isArray(cols),
    "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.",
  )

  assert(
    shape(rows).length === 1 && shape(cols).length === 1,
    "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.",
  )

  assert(
    rows.length > 0,
    "The `rows` array must contain at least one row name.",
  )

  assert(
    cols.length > 0,
    "The `cols` array must contain at least one column name.",
  )

  rows.forEach(row => {
    assert(
      isString(row),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.",
    )

    assert(
      df.index.indexOf(row) > -1,
      `The row name "${row}" does not exist in the list of rows.`,
    )
  })

  cols.forEach(col => {
    assert(
      isString(col),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings.",
    )

    assert(
      df.columns.indexOf(col) > -1,
      `The column name "${col}" does not exist in the list of columns.`,
    )
  })

  const values = rows.map(row => {
    return cols.map(col => {
      return df.values[df.index.indexOf(row)][df.columns.indexOf(col)]
    })
  })

  if (rows.length === 1 && cols.length === 1) {
    return values[0][0]
  }

  if (rows.length === 1) {
    const out = new Series(values[0])
    out.name = rows[0]
    out.index = cols
    return out
  }

  if (cols.length === 1) {
    const out = new Series(values.map(v => v[0]))
    out.name = cols[0]
    out.index = rows
    return out
  }

  const out = new DataFrame(values)
  out.columns = cols
  out.index = rows
  return out
}

export default dfGetSubsetByNames
