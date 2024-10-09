import { isEqual } from "./is-equal.mjs"
import { isFunction } from "./is-function.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { stats } from "./stats.mjs"

function count(arr, matcher) {
  const { counts } = stats(arr)

  if (!isUndefined(matcher)) {
    if (isFunction(matcher)) {
      counts.values.forEach(v => {
        if (!matcher(v)) {
          counts.delete(v)
        }
      })
    } else {
      counts.values.forEach(v => {
        if (!isEqual(v, matcher)) {
          counts.delete(v)
        }
      })
    }
  }

  return counts
}

export { count }
