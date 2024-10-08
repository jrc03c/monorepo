const { DataFrame, Series } = require("./dataframe")
const assert = require("./assert")
const intersect = require("./intersect")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isSeries = require("./is-series")
const isUndefined = require("./is-undefined")
const shape = require("./shape")

class IndexMatcher {
  static DROP_NAN_MODE = "DROP_NAN_MODE"
  static DROP_MISSING_MODE = "DROP_MISSING_MODE"

  constructor(mode) {
    assert(
      isUndefined(mode) ||
        mode === IndexMatcher.DROP_NAN_MODE ||
        mode === IndexMatcher.DROP_MISSING_MODE,
      "The `mode` value passed into the `IndexMatcher` constructor must be undefined or one of [IndexMatcher.DROP_NAN_MODE, IndexMatcher.DROP_MISSING_MODE]! (By default, the mode is `Indexer.DROP_MISSING_MODE`.)",
    )

    this.mode = !isUndefined(mode) ? mode : IndexMatcher.DROP_NAN_MODE
    this.index = null
  }

  fit() {
    const indices = []

    Object.values(arguments).forEach(x => {
      if (isArray(x)) {
        const xshape = shape(x)

        if (xshape.length === 1) {
          x = new Series(x)
        } else if (xshape.length === 2) {
          x = new DataFrame(x)
        } else {
          throw new Error(
            "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!",
          )
        }
      }

      assert(
        isDataFrame(x) || isSeries(x),
        "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!",
      )

      if (this.mode === IndexMatcher.DROP_MISSING_MODE) {
        indices.push(x.dropMissing().index)
      } else {
        indices.push(x.dropNaN().index)
      }
    })

    this.index = intersect(...indices)
    return this
  }

  transform() {
    assert(
      !!this.index,
      "The IndexMatcher hasn't been fitted yet! Please call the `fit` method before calling the `transform` method.",
    )

    const out = Object.values(arguments).map(x => {
      if (isArray(x)) {
        const xshape = shape(x)

        if (xshape.length === 1) {
          return new Series(x).get(this.index).values
        } else if (xshape.length === 2) {
          return new DataFrame(x).get(this.index, null).values
        } else {
          throw new Error(
            "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!",
          )
        }
      }

      assert(
        isDataFrame(x) || isSeries(x),
        "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!",
      )

      return x.get(this.index, null)
    })

    return out.length === 1 ? out[0] : out
  }

  fitAndTransform() {
    return this.fit(...arguments).transform(...arguments)
  }
}

module.exports = IndexMatcher
