const float = require("./float")
const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function multiply() {
  try {
    const values = Object.values(arguments)
    if (values.length === 0) return NaN

    let out = 1

    for (let i = 0; i < values.length; i++) {
      if (!isNumber(values[i])) return NaN

      if (typeof values[i] === "bigint") {
        const out = multiply(...float(values))

        try {
          return BigInt(out)
        } catch {
          return out
        }
      }

      out *= values[i]
    }

    return out
  } catch (e) {
    return NaN
  }
}

module.exports = vectorize(multiply)
