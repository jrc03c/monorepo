import {
  assert,
  DataFrame,
  flatten,
  forEach,
  isArray,
  isDataFrame,
  isSeries,
  map,
  range,
  Series,
  shape,
  stats,
  transpose,
} from "@jrc03c/js-math-tools"

class StandardScaler {
  constructor(options) {
    options = options || {}
    this.means = []
    this.stdevs = []
    this.wasFittedOnAVector = false
    this.hasBeenFitted = false

    this.shouldIgnoreNaNs =
      typeof options.shouldIgnoreNaNs === "undefined"
        ? false
        : options.shouldIgnoreNaNs
  }

  _getDataArrayAndShape(x) {
    if (isDataFrame(x)) {
      return [x.values, x.shape]
    }

    if (isSeries(x)) {
      const out = transpose([x.values])
      return [out, shape(out)]
    }

    assert(
      isArray(x),
      "`x` must be a 1- or 2-dimensional array, DataFrame, or Series!",
    )

    const xShape = shape(x)

    assert(
      xShape.length < 3,
      "`x` must be a 1- or 2-dimensional array, DataFrame, or Series!",
    )

    if (xShape.length === 1) {
      xShape.push(1)
      x = transpose([x])
    }

    return [x, xShape]
  }

  fit(x) {
    const results = this._getDataArrayAndShape(x)
    x = results[0]
    const xShape = results[1]

    this.wasFittedOnAVector = xShape.indexOf(1) > -1
    this.means = []
    this.stdevs = []

    forEach(range(0, xShape[1]), j => {
      const values = map(x, row => row[j])

      const results = stats(values, {
        shouldDropNaNs: this.shouldIgnoreNaNs,
        stdev: true,
      })

      this.means.push(results.mean)
      this.stdevs.push(results.stdev)
    })

    this.hasBeenFitted = true
    return this
  }

  fitAndTransform() {
    return this.fit(arguments[0]).transform(...arguments)
  }

  transform() {
    const datas = Array.from(arguments)

    if (datas.length > 1) {
      return map(datas, data => this.transform(data))
    }

    let x = datas[0]

    if (!this.hasBeenFitted) {
      throw new Error(
        "This `StandardScaler` instance hasn't been trained on any data yet! Please use the `fit` method to train it before calling the `transform` method.",
      )
    }

    if (isDataFrame(x)) {
      const out = new DataFrame(this.transform(x.values))
      out.columns = x.columns
      out.index = x.index
      return out
    }

    if (isSeries(x)) {
      const out = new Series(this.transform(x.values))
      out.name = x.name
      out.index = x.index
      return out
    }

    const results = this._getDataArrayAndShape(x)
    x = results[0]
    const xShape = results[1]

    assert(
      xShape[1] === this.means.length,
      "The data you passed into the `transform` function doesn't have the same number of columns as the data set on which this StandardScaler was fitted!",
    )

    const out = map(x, row => {
      return map(row, (v, j) => {
        return (Number(v) - Number(this.means[j])) / Number(this.stdevs[j])
      })
    })

    if (this.wasFittedOnAVector) {
      return flatten(out)
    } else {
      return out
    }
  }

  untransform(x) {
    if (!this.hasBeenFitted) {
      throw new Error(
        "This `StandardScaler` instance hasn't been trained on any data yet! Please use the `fit` method to train it before calling the `transform` method.",
      )
    }

    if (isDataFrame(x)) {
      const out = new DataFrame(this.untransform(x.values))
      out.columns = x.columns
      out.index = x.index
      return out
    }

    if (isSeries(x)) {
      const out = new Series(this.untransform(x.values))
      out.name = x.name
      out.index = x.index
      return out
    }

    const results = this._getDataArrayAndShape(x)
    x = results[0]
    const xShape = results[1]

    assert(
      xShape[1] === this.means.length,
      "The data you passed into the `untransform` function doesn't have the same number of columns as the data set on which this StandardScaler was fitted!",
    )

    const out = map(x, row => {
      return map(row, (v, j) => {
        return v * this.stdevs[j] + this.means[j]
      })
    })

    if (this.wasFittedOnAVector) {
      return flatten(out)
    } else {
      return out
    }
  }
}

export { StandardScaler }
