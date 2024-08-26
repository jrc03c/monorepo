const isNumber = require("./is-number")
const vectorize = require("./vectorize")

function add() {
  try {
    let out = 0
    const x = Object.values(arguments)

    if (x.map(v => typeof v).includes("bigint")) {
      out = 0n
    }

    for (let i = 0; i < x.length; i++) {
      if (!isNumber(x[i])) return NaN
      out += x[i]
    }

    return out
  } catch (e) {
    console.log(e)
    return NaN
  }
}

module.exports = vectorize(add)
