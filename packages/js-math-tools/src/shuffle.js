import { random } from "./random.js"
import assert from "./assert.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isSeries from "./is-series.js"

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

export default shuffle
