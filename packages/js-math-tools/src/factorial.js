const int = require("./int")
const vectorize = require("./vectorize")

function factorial(n) {
  try {
    if (typeof n === "bigint") {
      return BigInt(factorial(int(n)))
    }

    if (n !== int(n)) return NaN
    if (n <= 1) return 1
    return n * factorial(n - 1)
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(factorial)
