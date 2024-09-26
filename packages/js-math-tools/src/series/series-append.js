import assert from "../assert.js"
import isArray from "../is-array.js"
import isNested from "../is-nested.js"
import isSeries from "../is-series.js"
import shape from "../shape.js"

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

    x.forEach((v, i) => {
      out._values.push(v)
      out._index.push("item" + (series.values.length + i))
    })

    return out
  }

  // assert(!isDataFrame(x), "DataFrames cannot be appended to Series!")
  return seriesAppend(series, [x])
}

export default seriesAppend
