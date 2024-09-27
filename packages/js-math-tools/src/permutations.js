import { combinations } from "./combinations.js"
import assert from "./assert.js"
import flatten from "./flatten.js"
import int from "./int.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isNumber from "./is-number.js"
import isSeries from "./is-series.js"
import isUndefined from "./is-undefined.js"
import zeros from "./zeros.js"

export function permutationsIterator(x, r) {
  function* helper(x, r) {
    r = r || x.length

    if (x.length === 1) {
      yield [x]
      return
    }

    for (const c of combinations(x, r)) {
      if (!c.slice) continue

      const state = zeros(c.length)

      yield c

      let i = 1

      while (i < c.length) {
        if (state[i] < i) {
          if (i % 2 === 0) {
            const buf = c[0]
            c[0] = c[i]
            c[i] = buf
          } else {
            const buf = c[state[i]]
            c[state[i]] = c[i]
            c[i] = buf
          }

          yield c

          state[i] += 1
          i = 1
        } else {
          state[i] = 0
          i += 1
        }
      }
    }
  }

  if (isDataFrame(x) || isSeries(x)) {
    return permutationsIterator(x.values, r)
  }

  assert(
    isArray(x),
    "The `permutations` function only works on arrays, Series, and DataFrames!",
  )

  if (isUndefined(r)) {
    r = x.length
  }

  assert(
    isNumber(r) && int(r) === r && r >= 0,
    "`r` must be a non-negative integer!",
  )

  return helper(flatten(x), r)
}

export function permutations(x, r) {
  const out = []

  for (const perm of permutationsIterator(x, r)) {
    out.push(perm.slice())
  }

  return out
}
