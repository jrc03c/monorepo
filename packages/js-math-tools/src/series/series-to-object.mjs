import { forEach } from "../for-each.mjs"

function seriesToObject(series) {
  const out = {}
  out[series.name] = {}

  forEach(series.index, (index, i) => {
    out[series.name][index] = series.values[i]
  })

  return out
}

export { seriesToObject }
