import { assert } from "../assert.mjs"
import { isNumber } from "../is-number.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"
import { set } from "../set.mjs"

function seriesGet(series, indices) {
  if (isString(indices) || isNumber(indices)) indices = [indices]

  for (const i in indices) {
    if (typeof indices[i] === "bigint") {
      indices[i] = Number(indices[i])
    }
  }

  const types = set(map(indices || [], v => typeof v))

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

  if (!isUndefined(indices)) {
    indices = map(indices, i => {
      if (typeof i === "string") {
        assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`)
        return i
      }

      if (typeof i === "number") {
        assert(i >= 0, `Index ${i} is out of bounds!`)
        assert(Math.floor(i) === i, `Indices must be integers!`)
        assert(i < series.index.length, `Index ${i} is out of bounds!`)
        return series.index[i]
      }
    })
  }

  return series.getSubsetByNames(indices)
}

export { seriesGet }
