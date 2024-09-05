const {
  count,
  dropNaN,
  isArray,
  isDataFrame,
  isSeries,
} = require("@jrc03c/js-math-tools")

function isBinary(x, shouldIgnoreNaNs) {
  if (typeof x === "number") {
    return x === 0 || x === 1
  }

  if (typeof x === "bigint") {
    return x === 0n || x === 1n
  }

  if (isDataFrame(x) || isSeries(x)) {
    return isBinary(x.values, shouldIgnoreNaNs)
  }

  if (isArray(x)) {
    if (shouldIgnoreNaNs) {
      x = dropNaN(x)
    }

    const counts = count(x)
    const values = counts.values.toSorted()

    return (
      (values.length === 2 &&
        Number(values[0]) === 0 &&
        Number(values[1]) === 1) ||
      (values.length === 1 &&
        (Number(values[0]) === 0 || Number(values[0]) === 1))
    )
  }

  return false
}

module.exports = isBinary
