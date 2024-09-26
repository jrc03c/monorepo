import int from "./int.js"
import vectorize from "./vectorize.js"

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

export default vectorize(factorial)
