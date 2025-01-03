import { isUndefined } from "../is-undefined.mjs"

function seriesDropMissing(series) {
  const out = series.copy()
  const outIndex = []

  out._values = out.values.filter((v, i) => {
    if (isUndefined(v)) {
      return false
    } else {
      outIndex.push(out.index[i])
      return true
    }
  })

  out._index = outIndex
  return out
}

export { seriesDropMissing }
