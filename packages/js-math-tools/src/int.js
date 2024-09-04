const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const vectorize = require("./vectorize")

function int(x) {
  if (isDataFrame(x) || isSeries(x)) {
    const out = x.copy()
    out.values = int(out.values)
    return out
  }

  if (isArray(x)) {
    return x.map(v => int(v))
  } else {
    try {
      const out = JSON.parse(x)

      if (isNumber(out)) {
        return typeof out === "bigint"
          ? Number(out)
          : out >= 0
            ? Math.floor(out)
            : Math.ceil(out)
      }

      return NaN
    } catch (e) {
      return NaN
    }
  }
}

module.exports = vectorize(int)
