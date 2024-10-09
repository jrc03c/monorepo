import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { set } from "./set.mjs"

function union() {
  return set(
    [...arguments].map(v => {
      if (isArray(v)) return v
      if (isDataFrame(v)) return v.values
      if (isSeries(v)) return v.values
      return [v]
    }),
  )
}

export { union }
