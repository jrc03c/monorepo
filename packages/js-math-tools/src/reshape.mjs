import { assert } from "./assert.mjs"
import { flatten } from "./flatten.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNaturalNumber } from "./helpers/is-natural-number.mjs"
import { isNumber } from "./is-number.mjs"
import { isSeries } from "./is-series.mjs"
import { map } from "./map.mjs"
import { product } from "./product.mjs"
import { shape } from "./shape.mjs"

function reshape(x, newShape) {
  if (isDataFrame(x) || isSeries(x)) {
    return reshape(x.values, newShape)
  }

  assert(
    isArray(x),
    "The first argument passed into the `reshape` function must be an array!",
  )

  if (isNumber(newShape)) newShape = [newShape]

  assert(
    isArray(newShape),
    "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!",
  )

  assert(
    shape(newShape).length === 1,
    "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!",
  )

  newShape = map(newShape, v => {
    if (typeof v === "bigint") {
      v = Number(v)
    }

    assert(
      isNaturalNumber(v),
      "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!",
    )

    return Number(v)
  })

  if (newShape.length === 0) {
    return flatten(x)
  }

  const temp = flatten(x)

  if (newShape.length === 1 && newShape[0] === temp.length) {
    return temp
  }

  assert(
    product(newShape) === temp.length,
    "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!",
  )

  const out = []
  const step = Math.floor(temp.length / newShape[0])

  for (let i = 0; i < newShape[0]; i++) {
    const row = temp.slice(i * step, (i + 1) * step)
    out.push(reshape(row, newShape.slice(1)))
  }

  return out
}

export { reshape }
