import { assert } from "../assert.mjs"
import { isFunction } from "../is-function.mjs"
import { map } from "../map.mjs"

function seriesApply(series, fn) {
  assert(
    isFunction(fn),
    "The parameter to the `apply` method must be a function.",
  )

  const out = series.copy()
  out._values = map(out._values, (v, i) => fn(v, i))
  return out
}

export { seriesApply }
