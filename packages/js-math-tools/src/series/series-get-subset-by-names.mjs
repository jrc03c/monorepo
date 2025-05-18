import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { map } from "../map.mjs"
import { shape } from "../shape.mjs"

function seriesGetSubsetByNames(Series, series, indices) {
  if (isUndefined(indices)) indices = series.index

  assert(
    isArray(indices),
    "The `indices` array must be a 1-dimensional array of strings.",
  )

  assert(
    shape(indices).length === 1,
    "The `indices` array must be a 1-dimensional array of strings.",
  )

  assert(
    indices.length > 0,
    "The `indices` array must contain at least one index name.",
  )

  forEach(indices, name => {
    assert(isString(name), "The `indices` array must contain only strings.")

    assert(
      series.index.indexOf(name) > -1,
      `The name "${name}" does not exist in the index.`,
    )
  })

  const values = map(indices, name => {
    return series.values[series.index.indexOf(name)]
  })

  if (values.length === 1) return values[0]

  const out = new Series(values)
  out.index = indices
  out.name = series.name
  return out
}

export { seriesGetSubsetByNames }
