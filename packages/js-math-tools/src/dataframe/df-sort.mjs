import { assert } from "../assert.mjs"
import { isArray } from "../is-array.mjs"
import { isBoolean } from "../is-boolean.mjs"
import { isFunction } from "../is-function.mjs"
import { isNumber } from "../is-number.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { isWholeNumber } from "../helpers/is-whole-number.mjs"
import { map } from "../map.mjs"
import { random } from "../random.mjs"
import { range } from "../range.mjs"
import { shape } from "../shape.mjs"
import { sort } from "../sort.mjs"

function dfSort(df, a, b) {
  if (isFunction(a)) {
    return dfSortByFunction(df, a, b)
  } else {
    return dfSortByColumns(df, a, b)
  }
}

function dfSortByFunction(df, fn, axis) {
  axis = isUndefined(axis) ? 0 : axis

  assert(
    isFunction(fn),
    "When sorting a DataFrame using a function, the first argument to the `sort` method must be a function!",
  )

  assert(
    isNumber(axis),
    "When sorting a DataFrame using a function, the second argument to the `sort` method must be null, undefined, 0, or 1 to indicate the axis along which the data should be sorted! An axis of 0 means that the rows will be sorted relative to each other, whereas an axis of 1 means that the columns will be sorted relative to each other.",
  )

  if (axis === 0) {
    const index = sort(df.index, (a, b) => {
      return fn(df.get(a, null), df.get(b, null))
    })

    return df.get(index, null)
  } else {
    const columns = sort(df.columns, (a, b) => {
      return fn(df.get(null, a), df.get(null, b))
    })

    return df.get(null, columns)
  }
}

function dfSortByColumns(df, cols, directions) {
  // temporarily assign index as column in dataframe
  let out = df.copy()
  const indexID = random().toString()
  out = out.assign(indexID, out.index)

  if (isUndefined(cols)) {
    cols = [indexID]
    directions = [true]
  }

  if (isNumber(cols) || isString(cols)) {
    cols = [cols]

    if (isBoolean(directions) || isString(directions)) directions = [directions]
  }

  assert(
    isArray(cols),
    "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.",
  )

  assert(
    shape(cols).length === 1,
    "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null.",
  )

  if (isUndefined(directions)) {
    directions = map(range(0, cols.length), () => true)
  }

  assert(
    isArray(directions),
    "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.",
  )

  assert(
    shape(directions).length === 1,
    "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null.",
  )

  assert(
    cols.length === directions.length,
    "The arrays passed into the `sort` method must be equal in length.",
  )

  // convert all columns to indices
  cols = map(cols, col => {
    assert(
      isString(col) || isNumber(col),
      "Column references can either be column names (as strings) or column indices (as whole numbers).",
    )

    if (isString(col)) {
      const index = out.columns.indexOf(col)
      assert(index > -1, `The column "${col}" does not exist!`)
      return index
    }

    if (isNumber(col)) {
      assert(isWholeNumber(col), "Column indices must be whole numbers!")
      assert(col < out.columns.length, `The index ${col} is out of bounds!`)
      return col
    }
  })

  // convert all directions to booleans
  directions = map(directions, dir => {
    assert(
      isString(dir) || isBoolean(dir),
      "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).",
    )

    if (isString(dir)) {
      const value = dir.trim().toLowerCase()

      assert(
        value === "ascending" || value === "descending",
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false).",
      )

      return value === "ascending"
    }

    if (isBoolean(dir)) {
      return dir
    }
  })

  // sort
  out.values = sort(out.values, (a, b) => {
    let counter = 0

    while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
      counter++
    }

    const isAscending = directions[counter]
    if (a[cols[counter]] === b[cols[counter]]) return 0
    if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1
    if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1
  })

  const indexNumber = out.columns.indexOf(indexID)
  out.index = map(out.values, row => row[indexNumber])
  out = out.dropColumns(indexID)
  return out
}

export { dfSort }
