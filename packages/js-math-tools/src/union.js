import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"
import set from "./set.js"

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

export default union
