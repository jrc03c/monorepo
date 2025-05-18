import { DataFrame, Series } from "./dataframe/index.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isJagged } from "./is-jagged.mjs"
import { isSeries } from "./is-series.mjs"
import { shape } from "./shape.mjs"

function print() {
  forEach(Object.keys(arguments), key => {
    const x = arguments[key]

    if (isArray(x)) {
      if (!isJagged(x)) {
        const xShape = shape(x)

        if (xShape.length === 1) {
          new Series(x).print()
        } else if (xShape.length == 2) {
          new DataFrame(x).print()
        } else {
          console.log(x)
        }
      } else {
        console.log(x)
      }
    } else if (isDataFrame(x) || isSeries(x)) {
      x.print()
    } else {
      console.log(x)
    }
  })
}

export { print }
