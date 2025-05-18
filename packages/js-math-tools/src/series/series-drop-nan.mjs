import { forEach } from "../for-each.mjs"
import { isNumber } from "../is-number.mjs"

function seriesDropNaN(Series, series) {
  const index = []
  const values = []

  forEach(series.values, (value, i) => {
    if (isNumber(value)) {
      values.push(value)
      index.push(series.index[i])
    }
  })

  const out = new Series(values)
  out.name = series.name
  out.index = index
  return out
}

export { seriesDropNaN }
