import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isNested } from "./is-nested.mjs"
import { isNumber } from "./is-number.mjs"
import { isUndefined } from "./is-undefined.mjs"

const error =
  "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!"

function ndarray(shape) {
  assert(!isUndefined(shape), error)
  if (!isArray(shape)) shape = [shape]
  assert(!isNested(shape), error)
  assert(shape.length > 0, error)

  let s = shape[0]
  if (typeof s === "bigint") s = Number(s)
  assert(isNumber(s), error)
  assert(s >= 0, error)
  assert(Math.floor(s) === s, error)

  assert(
    s !== Infinity,
    "We can't create an array containing an infinite number of values!",
  )

  if (shape.length === 1) {
    const out = []
    for (let i = 0; i < s; i++) out.push(undefined)
    return out
  } else {
    const out = []

    for (let i = 0; i < s; i++) {
      out.push(ndarray(shape.slice(1)))
    }

    return out
  }
}

export { ndarray }
