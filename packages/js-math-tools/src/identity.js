import assert from "./assert.js"
import int from "./int.js"
import isNumber from "./is-number.js"
import isUndefined from "./is-undefined.js"
import zeros from "./zeros.js"

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

export default identity
