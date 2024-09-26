import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"
import vectorize from "./vectorize.js"

function int(x) {
  if (isDataFrame(x) || isSeries(x)) {
    const out = x.copy()
    out.values = int(out.values)
    return out
  }

  if (isArray(x)) {
    return x.map(v => int(v))
  } else {
    try {
      const out = JSON.parse(x)

      if (isNumber(out)) {
        return typeof out === "bigint"
          ? Number(out)
          : out >= 0
            ? Math.floor(out)
            : Math.ceil(out)
      }

      return NaN
    } catch (e) {
      return NaN
    }
  }
}

export default vectorize(int)
