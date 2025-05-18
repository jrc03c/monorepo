import { isString } from "../is-string.mjs"
import { map } from "../map.mjs"
import { range } from "../range.mjs"

function dfPrint(DataFrame, Series, df) {
  function truncate(s, maxLength) {
    if (isString(s)) {
      if (s.length > maxLength) {
        return s.substring(0, maxLength - 3) + "..."
      } else {
        return s
      }
    } else {
      return s
    }
  }

  if (df.isEmpty) {
    console.table({})
    console.log("Shape:", [0, 0], "\n")
    return df
  }

  const maxRows = typeof window === "undefined" ? 20 : 10
  const halfMaxRows = Math.floor(maxRows / 2)
  const maxColumns = 4
  const halfMaxColumns = Math.floor(maxColumns / 2)

  const tempRows =
    maxRows > df.index.length
      ? null
      : range(0, halfMaxRows).concat(
          range(df.index.length - halfMaxRows, df.index.length),
        )

  const tempColumns =
    maxColumns > df.columns.length
      ? null
      : range(0, halfMaxColumns).concat(
          range(df.columns.length - halfMaxColumns, df.columns.length),
        )

  let temp = df.get(tempRows, tempColumns)

  if (temp instanceof Series) {
    if (df.shape[0] === 1) {
      // data is row-shaped
      temp = new DataFrame([temp.values])
      temp.index = df.index
      temp.columns = new Series(df.columns).get(tempColumns).values
    } else if (df.shape[1] === 1) {
      // data is column-shaped
      temp = new DataFrame([temp.values]).transpose()
      temp.index = new Series(df.index).get(tempRows).values
      temp.columns = df.columns
    }
  }

  if (maxRows <= df.index.length) {
    temp._index.splice(halfMaxRows, 0, "...")
    temp._values.splice(
      halfMaxRows,
      0,
      map(range(0, temp.columns.length), () => "..."),
    )
  }

  if (maxColumns <= df.columns.length) {
    temp._columns.splice(halfMaxColumns, 0, "...")

    temp._values = map(temp._values, row => {
      row.splice(halfMaxColumns, 0, "...")
      return row
    })
  }

  const maxLength = 28

  if (temp instanceof Series) {
    temp.values = map(temp.values, value => truncate(value, maxLength))
    temp.name = truncate(temp.name, maxLength)
    temp.index = map(temp.index, row => truncate(row, maxLength))
  } else {
    temp.values = map(temp.values, row => {
      return map(row, value => truncate(value, maxLength))
    })

    temp.columns = map(temp.columns, col => truncate(col, maxLength))
    temp.index = map(temp.index, row => truncate(row, maxLength))
  }

  console.table(temp.toDetailedObject())
  console.log("Shape:", df.shape, "\n")
  return df
}

export { dfPrint }
