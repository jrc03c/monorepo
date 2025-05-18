import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isNested } from "../is-nested.mjs"
import { isSeries } from "../is-series.mjs"
import { shape } from "../shape.mjs"

function seriesAppend(Series, series, x) {
  if (isSeries(x)) {
    return new Series(series.values.concat(x.values))
  }

  if (isArray(x)) {
    const xShape = shape(x)

    assert(
      xShape.length === 1 && !isNested(xShape),
      "Only vectors can be appended to Series!",
    )

    const out = series.copy()

    forEach(x, (v, i) => {
      out._values.push(v)
      out._index.push("item" + (series.values.length + i))
    })

    return out
  }

  // assert(!isDataFrame(x), "DataFrames cannot be appended to Series!")
  return seriesAppend(series, [x])
}

export { seriesAppend }
