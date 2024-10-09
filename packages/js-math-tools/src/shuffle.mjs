import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { random } from "./random.mjs"

function shuffle(arr) {
  if (isDataFrame(arr) || isSeries(arr)) {
    return arr.shuffle(...Object.values(arguments).slice(1))
  }

  assert(
    isArray(arr),
    "The `shuffle` function only works on arrays, Series, and DataFrames!",
  )

  const out = []
  const temp = arr.slice()

  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(random() * temp.length)
    out.push(temp.splice(index, 1)[0])
  }

  return out
}

export { shuffle }
