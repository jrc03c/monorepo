function isNumber(x) {
  return (typeof x === "number" && !isNaN(x)) || typeof x === "bigint"
}

module.exports = isNumber
