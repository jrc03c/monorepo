const {
  argmax,
  assert,
  DataFrame,
  isArray,
  isDataFrame,
  isJagged,
  pow,
  reverse,
  shape,
  sum,
} = require("@jrc03c/js-math-tools")

function hunterChainSort(c) {
  if (isArray(c)) {
    assert(
      shape(c).length === 2 && !isJagged(c),
      "The `hunterChainSort` function only works on non-jagged 2-dimensional arrays and DataFrames!",
    )

    const temp = new DataFrame(c)
    temp.index = temp.columns.slice()
    return hunterChainSort(temp).values
  }

  assert(
    isDataFrame(c),
    "You must pass a 2-dimensional array or DataFrame into the `hunterChainSort` function!",
  )

  const shouldIgnoreNaNs = true
  const freeRows = c.index.slice()
  const fixedRows = []

  while (freeRows.length > 1) {
    // get row with greatest 2-norm and move it to `fixedRows`
    if (fixedRows.length === 0) {
      const firstRowName =
        freeRows[
          argmax(
            freeRows.map(rowName =>
              sum(pow(c.values[c.index.indexOf(rowName)], 2), shouldIgnoreNaNs),
            ),
            shouldIgnoreNaNs,
          )
        ]

      freeRows.splice(freeRows.indexOf(firstRowName), 1)
      fixedRows.push(firstRowName)
    }

    // get free row with highest correlation with last fixed row and move it to
    // `fixedRows`
    else {
      const lastRowName = fixedRows.at(-1)

      const lastRow = c.values[c.index.indexOf(lastRowName)].filter((v, i) =>
        freeRows.includes(c.index[i]),
      )

      const nextRowName = freeRows[argmax(lastRow, shouldIgnoreNaNs)]
      freeRows.splice(freeRows.indexOf(nextRowName), 1)
      fixedRows.push(nextRowName)
    }
  }

  fixedRows.push(freeRows[0])

  const reversedFixedRows = reverse(fixedRows)
  const out = c.get(reversedFixedRows, null)
  return out
}

module.exports = hunterChainSort
