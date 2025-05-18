import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function filter(x, fn) {
  if (isDataFrame(x)) {
    const indices = []

    for (let i = 0; i < x.shape[0]; i++) {
      if (fn(x.get(i, null), i, x)) {
        indices.push(i)
      }
    }

    return x.get(indices, null)
  }

  if (isSeries(x)) {
    const indices = []

    for (let i = 0; i < x.shape[0]; i++) {
      if (fn(x.get(i), i, x)) {
        indices.push(i)
      }
    }

    return x.get(indices)
  }

  const out = []

  for (let i = 0; i < x.length; i++) {
    if (fn(x[i], i, x)) {
      out.push(x[i])
    }
  }

  return out
}

export { filter }
