import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { map } from "./map.mjs"
import { set } from "./set.mjs"

function union() {
  return set(
    map(Array.from(arguments), v => {
      if (isArray(v)) return v
      if (isDataFrame(v)) return v.values
      if (isSeries(v)) return v.values
      return [v]
    }),
  )
}

export { union }
