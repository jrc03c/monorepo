import { assert } from "./assert.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isSeries } from "./is-series.mjs"
import { map } from "./map.mjs"
import { scale } from "./scale.mjs"
import { shape } from "./shape.mjs"
import { sum } from "./sum.mjs"
import { transpose } from "./transpose.mjs"

function dot(a, b) {
  if (isDataFrame(a)) {
    const temp = dot(a.values, b)

    if (shape(temp).length === 1) {
      const out = new Series(temp)
      out.name = isSeries(b) ? b.name : out.name
      out.index = a.index.slice()
      return out
    } else {
      const out = new DataFrame(temp)
      out.index = a.index.slice()

      if (isDataFrame(b)) {
        out.columns = b.columns.slice()
      }

      return out
    }
  }

  if (isDataFrame(b)) {
    const temp = dot(a, b.values)

    if (shape(temp).length === 1) {
      const out = new Series(temp)
      out.name = isSeries(a) ? a.name : out.name
      out.index = b.columns.slice()
      return out
    } else {
      const out = new DataFrame(temp)
      out.columns = b.columns.slice()
      return out
    }
  }

  if (isSeries(a)) {
    return dot(a.values, b)
  }

  if (isSeries(b)) {
    return dot(a, b.values)
  }

  assert(
    isArray(a) && isArray(b),
    "The `dot` function only works on arrays, Series, and DataFrames!",
  )

  const aShape = shape(a)
  const bShape = shape(b)

  assert(
    aShape.length <= 2 && bShape.length <= 2,
    "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!",
  )

  assert(
    aShape[aShape.length - 1] === bShape[0],
    `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${
      aShape[aShape.length - 1]
    } !== ${bShape[0]})`,
  )

  if (aShape.length === 1 && bShape.length === 1) {
    return sum(scale(a, b))
  } else if (aShape.length === 1 && bShape.length === 2) {
    return map(transpose(b), col => dot(a, col))
  } else if (aShape.length === 2 && bShape.length === 1) {
    return map(a, row => dot(row, b))
  } else if (aShape.length === 2 && bShape.length === 2) {
    const bTranspose = transpose(b)
    const out = []

    for (let i = 0; i < a.length; i++) {
      const row = []

      for (let j = 0; j < bTranspose.length; j++) {
        row.push(dot(a[i], bTranspose[j]))
      }

      out.push(row)
    }

    return out
  }
}

export { dot }
