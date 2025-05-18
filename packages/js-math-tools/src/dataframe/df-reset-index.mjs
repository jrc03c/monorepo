import { leftPad } from "../helpers/left-pad.mjs"
import { map } from "../map.mjs"
import { range } from "../range.mjs"

function dfResetIndex(df, shouldSkipCopying) {
  const out = shouldSkipCopying ? df : df.copy()

  out.index = map(range(0, df.shape[0]), i => {
    return "row" + leftPad(i, (out.index.length - 1).toString().length)
  })

  return out
}

export { dfResetIndex }
