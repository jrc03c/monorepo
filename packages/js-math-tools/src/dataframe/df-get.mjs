import { assert } from "../assert.mjs"
import { isNumber } from "../is-number.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"
import { set } from "../set.mjs"

function dfGet(df, rows, cols) {
  if (isString(rows) || isNumber(rows)) rows = [rows]
  if (isString(cols) || isNumber(cols)) cols = [cols]

  for (const i in rows) {
    if (typeof rows[i] === "bigint") {
      rows[i] = Number(rows[i])
    }
  }

  for (const i in cols) {
    if (typeof cols[i] === "bigint") {
      cols[i] = Number(cols[i])
    }
  }

  const types = set(map((rows || []).concat(cols || []), v => typeof v))

  assert(
    types.length <= 2,
    "Only whole numbers and/or strings are allowed in `get` arrays!",
  )

  if (types.length === 1) {
    assert(
      types[0] === "string" || types[0] === "number",
      "Only whole numbers and/or strings are allowed in `get` arrays!",
    )
  }

  if (types.length === 2) {
    assert(
      types.indexOf("string") > -1,
      "Only whole numbers and/or strings are allowed in `get` arrays!",
    )

    assert(
      types.indexOf("number") > -1,
      "Only whole numbers and/or strings are allowed in `get` arrays!",
    )
  }

  if (!isUndefined(rows)) {
    rows = map(rows, r => {
      if (isString(r)) {
        assert(df.index.indexOf(r) > -1, `Row "${r}" does not exist!`)
        return r
      }

      if (isNumber(r)) {
        assert(r >= 0, `Index ${r} is out of bounds!`)
        assert(Math.floor(r) === r, `Row numbers must be integers!`)
        assert(r < df.index.length, `Index ${r} is out of bounds!`)
        return df.index[r]
      }
    })
  }

  if (!isUndefined(cols)) {
    cols = map(cols, c => {
      if (isString(c)) {
        assert(df.columns.indexOf(c) > -1, `Column "${c}" does not exist!`)
        return c
      }

      if (isNumber(c)) {
        assert(c >= 0, `Column ${c} is out of bounds!`)
        assert(Math.floor(c) === c, `Column numbers must be integers!`)
        assert(c < df.columns.length, `Column ${c} is out of bounds!`)
        return df.columns[c]
      }
    })
  }

  return df.getSubsetByNames(rows, cols)
}

export { dfGet }
