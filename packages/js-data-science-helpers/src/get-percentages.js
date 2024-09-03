const { isNumber, stats } = require("@jrc03c/js-math-tools")

function getPercentages(x, shouldDropNaNs) {
  const results = stats(x, { shouldDropNaNs })
  const n = shouldDropNaNs ? results.nWithoutNaNs : results.n

  return results.counts.values
    .filter(v => isNumber(v) || !shouldDropNaNs)
    .map(v => {
      const c = results.counts.get(v)
      return { value: v, count: c, percentage: c / n }
    })
}

module.exports = getPercentages
