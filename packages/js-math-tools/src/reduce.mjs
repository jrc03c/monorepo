import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function reduce(x, fn, out) {
  if (isDataFrame(x)) {
    for (let i = 0; i < x.shape[0]; i++) {
      out = fn(out, x.get(i, null), i, x)
    }

    return out
  }

  if (isSeries(x)) {
    for (let i = 0; i < x.shape[0]; i++) {
      out = fn(out, x.get(i), i, x)
    }

    return out
  }

  for (let i = 0; i < x.length; i++) {
    out = fn(out, x[i], i, x)
  }

  return out
}

export { reduce }
