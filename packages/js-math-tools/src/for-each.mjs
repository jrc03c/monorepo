import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"

function forEach(x, fn) {
  if (isDataFrame(x)) {
    for (let i = 0; i < x.shape[0]; i++) {
      fn(x.get(i, null), i, x)
    }

    return
  }

  if (isSeries(x)) {
    for (let i = 0; i < x.shape[0]; i++) {
      fn(x.get(i), i, x)
    }

    return
  }

  for (let i = 0; i < x.length; i++) {
    fn(x[i], i, x)
  }
}

export { forEach }
