import assert from "./assert.js"
import isNumber from "./is-number.js"
import isUndefined from "./is-undefined.js"
import reverse from "./reverse.js"

function range(a, b, step = 1) {
  assert(
    !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
    "You must pass two numbers and optionally a step value to the `range` function!",
  )

  assert(
    isNumber(a) && isNumber(b) && isNumber(step),
    "You must pass two numbers and optionally a step value to the `range` function!",
  )

  assert(
    step > 0,
    "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)",
  )

  let shouldReverse = false

  const shouldIncludeBigInts =
    typeof a === "bigint" || typeof b === "bigint" || typeof step === "bigint"

  a = Number(a)
  b = Number(b)
  step = Number(step)

  if (a > b) {
    shouldReverse = true
    const buffer = a
    a = b + step
    b = buffer + step
  }

  let out = []

  for (let i = a; i < b; i += step) {
    if (shouldIncludeBigInts) {
      try {
        out.push(BigInt(i))
      } catch (e) {
        out.push(i)
      }
    } else {
      out.push(i)
    }
  }

  if (shouldReverse) out = reverse(out)
  return out
}

export default range
