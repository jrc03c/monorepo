const { count } = require("@jrc03c/js-math-tools")

function getPercentages(x) {
  const counts = count(x)

  return counts.map(c => {
    c.percentage = c.count / x.length
    return c
  })
}

module.exports = getPercentages
