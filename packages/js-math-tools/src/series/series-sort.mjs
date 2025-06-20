import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isFunction } from "../is-function.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { sort } from "../sort.mjs"
import { transpose } from "../transpose.mjs"

function seriesSort(Series, series, fn) {
  fn = fn || ((a, b) => (a < b ? -1 : 1))

  assert(
    isUndefined(fn) || isFunction(fn),
    "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!",
  )

  const pairs = transpose([series.values, series.index])

  const temp = sort(pairs, (aPair, bPair) => {
    return fn(aPair[0], bPair[0])
  })

  const newValues = []
  const newIndex = []

  forEach(temp, pair => {
    newValues.push(pair[0])
    newIndex.push(pair[1])
  })

  const out = new Series()
  out._values = newValues
  out._index = newIndex
  out.name = series.name
  return out
}

export { seriesSort }
