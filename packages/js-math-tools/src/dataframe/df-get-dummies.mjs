import { assert } from "../assert.mjs"
import { filter } from "../filter.mjs"
import { forEach } from "../for-each.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"
import { set } from "../set.mjs"
import { sort } from "../sort.mjs"

function camelify(text) {
  const temp = text.toLowerCase()
  let out = ""

  for (let i = 0; i < temp.length; i++) {
    const char = temp[i]

    if (char.match(/[a-z0-9]/g)) {
      out += char
    } else {
      out += " "
    }
  }

  const words = filter(out.split(" "), word => word.length > 0)

  return (
    words[0] +
    map(
      words.slice(1),
      word => word[0].toUpperCase() + word.substring(1),
    ).join("")
  )
}

function dfGetDummies(DataFrame, df, columns) {
  if (isUndefined(columns)) {
    columns = df.columns
  } else if (isString(columns)) {
    columns = [columns]
  }

  const temp = {}

  forEach(columns, col => {
    assert(
      isString(col),
      "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!",
    )

    const colIndex = df.columns.indexOf(col)

    assert(
      colIndex > -1,
      `The given DataFrame does not have a column called "${col}"!`,
    )

    const values = map(df.values, row => row[colIndex])
    const valuesSet = sort(set(values))

    forEach(values, value => {
      forEach(valuesSet, orig => {
        const colName = col + "_" + camelify(orig.toString())

        if (!temp[colName]) {
          temp[colName] = []
        }

        if (value === orig) {
          temp[colName].push(1)
        } else {
          temp[colName].push(0)
        }
      })
    })
  })

  const out = new DataFrame(temp)
  out.index = df.index
  return out
}

export { dfGetDummies }
