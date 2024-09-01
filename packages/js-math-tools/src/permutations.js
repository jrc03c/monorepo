const { combinations } = require("./combinations")
const assert = require("./assert")
const flatten = require("./flatten")
const int = require("./int")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")
const zeros = require("./zeros")

function permutationsIterator(x, r) {
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

function permutations(x, r) {
  const out = []

  for (const perm of permutationsIterator(x, r)) {
    out.push(perm.slice())
  }

  return out
}

module.exports = { permutations, permutationsIterator }
