const {
  dropMissing,
  flatten,
  isArray,
  isDataFrame,
  isSeries,
} = require("@jrc03c/js-math-tools")

function isBinary(x) {
  if (typeof x === "number") {
    return x === 0 || x === 1
  }

  if (typeof x === "bigint") {
    return x === 0n || x === 1n
  }

  if (isDataFrame(x) || isSeries(x)) {
    return isBinary(x.values)
  }

  if (isArray(x)) {
    if (x.length === 0) {
      return false
    }

    const nonMissingValues = dropMissing(flatten(x))
    return nonMissingValues.every(v => isBinary(v))
  }

  return false
}

module.exports = isBinary
