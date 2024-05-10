function isWholeNumber(x) {
  return typeof x === "number" && !isNaN(x) && x >= 0 && Math.floor(x) === x
}

module.exports = isWholeNumber
