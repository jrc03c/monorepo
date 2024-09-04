const assert = require("./assert")
const int = require("./int")
const isNumber = require("./is-number")
const isUndefined = require("./is-undefined")
const zeros = require("./zeros")

function identity(size) {
  if (typeof size === "bigint") {
    size = int(size)
  }

  assert(
    !isUndefined(size),
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!",
  )

  assert(
    isNumber(size),
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!",
  )

  assert(
    int(size) === size,
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!",
  )

  assert(
    size > 0,
    "You must pass an integer greater than 0 (representing the size) into the `identity` function!",
  )

  const out = zeros([size, size])
  for (let i = 0; i < size; i++) out[i][i] = 1
  return out
}

module.exports = identity
