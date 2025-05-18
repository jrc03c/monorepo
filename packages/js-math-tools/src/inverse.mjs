import { add } from "./add.mjs"
import { assert } from "./assert.mjs"
import { dot } from "./dot.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isNumber } from "./is-number.mjs"
import { map } from "./map.mjs"
import { scale } from "./scale.mjs"
import { shape } from "./shape.mjs"

function inverse(x) {
  if (isDataFrame(x)) {
    const out = x.copy()
    out.values = inverse(out.values)
    return out
  }

  assert(
    isArray(x),
    "The `inverse` function only works on square 2-dimensional arrays or DataFrames!",
  )

  const xShape = shape(x)

  assert(
    xShape.length === 2,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!",
  )

  assert(
    xShape[0] === xShape[1],
    "The array passed into the `inverse` function must be exactly two-dimensional and square!",
  )

  assert(
    xShape[0] >= 0,
    "The array passed into the `inverse` function must be exactly two-dimensional and square!",
  )

  // https://en.wikipedia.org/wiki/Invertible_matrix#Blockwise_inversion
  if (xShape[0] === 0) {
    return x
  } else if (xShape[0] === 1) {
    assert(x[0][0] !== 0, "This matrix cannot be inverted!")
    let v = x[0][0]
    if (typeof v === "bigint") v = Number(v)
    return 1 / v
  } else if (xShape[0] === 2) {
    let a = x[0][0]
    let b = x[0][1]
    let c = x[1][0]
    let d = x[1][1]

    if (typeof a === "bigint") a = Number(a)
    if (typeof b === "bigint") b = Number(b)
    if (typeof c === "bigint") c = Number(c)
    if (typeof d === "bigint") d = Number(d)

    const det = a * d - b * c
    assert(det !== 0, "This matrix cannot be inverted!")

    const out = [
      [d, -b],
      [-c, a],
    ]

    return scale(out, 1 / det)
  } else if (xShape[0] > 1) {
    const times = (a, b) =>
      isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b)

    for (let divider = 1; divider < xShape[0] - 1; divider++) {
      try {
        const A = map(x.slice(0, divider), row => row.slice(0, divider))
        const B = map(x.slice(0, divider), row => row.slice(divider, xShape[0]))
        const C = map(x.slice(divider, xShape[0]), row => row.slice(0, divider))

        const D = map(
          x.slice(divider, xShape[0]),
          row => row.slice(divider, xShape[0]),
        )

        const AInv = inverse(A)
        const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))))

        const topLeft = add(
          AInv,
          times(times(times(times(AInv, B), CompInv), C), AInv),
        )

        const topRight = times(-1, times(times(AInv, B), CompInv))
        const bottomLeft = times(-1, times(times(CompInv, C), AInv))
        const bottomRight = CompInv

        const out = 
          map(topLeft, (row, i) => row.concat(topRight[i]))
          .concat(map(bottomLeft, (row, i) => row.concat(bottomRight[i])))

        return out
      } catch (e) {}
    }

    assert(false, "This matrix cannot be inverted!")
  }
}

export { inverse }
