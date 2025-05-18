import { DataFrame, Series } from "./dataframe/index.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function map(x, fn) {
  if (isDataFrame(x)) {
    let out = []

    for (let i = 0; i < x.shape[0]; i++) {
      let y = fn(x.get(i, null), i, x)

      if (isSeries(y)) {
        y = y.toObject().data
      }

      out.push(y)
    }

    try {
      out = new DataFrame(out)
      out.index = x.index.slice()
      out.columns = x.columns.slice()
    } catch (e) {}

    return out
  }

  if (isSeries(x)) {
    let out = []

    for (let i = 0; i < x.shape[0]; i++) {
      out.push(fn(x.get(i), i, x))
    }

    try {
      out = new Series(out)
    } catch (e) {}

    return out
  }

  const out = []

  for (let i = 0; i < x.length; i++) {
    out.push(fn(x[i], i, x))
  }

  return out
}

export { map }
