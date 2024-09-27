import { DataFrame, Series } from "./dataframe/index.js"
import isArray from "./is-array.js"
import isDataFrame from "./is-dataframe.js"
import isJagged from "./is-jagged.js"
import isSeries from "./is-series.js"
import shape from "./shape.js"

function print() {
  Object.keys(arguments).forEach(key => {
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

export default print
