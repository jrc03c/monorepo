import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"
import { vectorize } from "./vectorize.mjs"

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

const vint = vectorize(int)
export { vint as int }
