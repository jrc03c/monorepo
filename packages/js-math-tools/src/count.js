import isEqual from "./is-equal.js"
import isFunction from "./is-function.js"
import isUndefined from "./is-undefined.js"
import stats from "./stats.js"

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

export default count
