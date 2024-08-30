const isEqual = require("./is-equal")
const isFunction = require("./is-function")
const isUndefined = require("./is-undefined")
const stats = require("./stats")

function count(arr, matcher) {
  const { counts } = stats(arr)

  if (!isUndefined(matcher)) {
    if (isFunction(matcher)) {
      counts.values.forEach(v => {
        if (!matcher(v)) {
          counts.delete(v)
        }
      })
    } else {
      counts.values.forEach(v => {
        if (!isEqual(v, matcher)) {
          counts.delete(v)
        }
      })
    }
  }

  return counts
}

module.exports = count
