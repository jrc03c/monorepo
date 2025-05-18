import { assert } from "./assert.mjs"
import { DataFrame, Series } from "./dataframe/index.mjs"
import { filter } from "./filter.mjs"
import { forEach } from "./for-each.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isEqual } from "./is-equal.mjs"
import { isFunction } from "./is-function.mjs"
import { isSeries } from "./is-series.mjs"
import { map } from "./map.mjs"
import { max } from "./max.mjs"
import { range } from "./range.mjs"
import { shape } from "./shape.mjs"

function vectorize(fn) {
  assert(
    isFunction(fn),
    "You must pass a function into the `vectorize` function!",
  )

  return function helper() {
    let hasSeries, hasDataFrames
    const series = []
    const dataframes = []

    const childArrays = map(
      filter(
        Object.keys(arguments),
        key => {
          const arg = arguments[key]

          if (isArray(arg)) {
            return true
          } else if (isSeries(arg)) {
            hasSeries = true
            series.push(arg)
            return true
          } else if (isDataFrame(arg)) {
            hasDataFrames = true
            dataframes.push(arg)
            return true
          } else {
            return false
          }
        },
      ),
      key => arguments[key],
    )

    forEach(childArrays.slice(0, -1), (s, i) => {
      assert(
        isEqual(
          isArray(s) ? shape(s) : s.shape,
          isArray(childArrays[i + 1])
            ? shape(childArrays[i + 1])
            : childArrays[i + 1].shape,
        ),
        `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`,
      )
    })

    if (childArrays.length > 0) {
      const maxLength = max(
        map(childArrays, a => (a.length ? a.length : a.values.length)),
      )

      const out = map(range(0, maxLength), i => {
        const args = map(Object.keys(arguments), key => {
          if (isArray(arguments[key])) {
            return arguments[key][i]
          } else if (isSeries(arguments[key])) {
            return arguments[key].values[i]
          } else if (isDataFrame(arguments[key])) {
            return arguments[key].values[i]
          } else {
            return arguments[key]
          }
        })

        return helper(...args)
      })

      if (hasDataFrames) {
        try {
          if (
            dataframes.length === 1 &&
            isEqual(shape(dataframes[0]), shape(out))
          ) {
            const temp = new DataFrame(out)
            temp.index = dataframes[0].index.slice()
            temp.columns = dataframes[0].columns.slice()
            return temp
          } else {
            return new DataFrame(out)
          }
        } catch (e) {
          return out
        }
      }

      if (hasSeries) {
        try {
          if (series.length === 1 && series[0].length === out.length) {
            const temp = new Series(out)
            temp.name = series[0].name
            temp.index = series[0].index.slice()
            return temp
          } else {
            return new Series(out)
          }
        } catch (e) {
          return out
        }
      }

      return out
    } else {
      return fn(...arguments)
    }
  }
}

export { vectorize }
