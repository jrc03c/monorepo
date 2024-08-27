const {
  abs,
  apply,
  assert,
  clamp,
  copy,
  divide,
  dropNaN,
  flatten,
  isArray,
  isBoolean,
  isDataFrame,
  isNumber,
  isSeries,
  isUndefined,
  log,
  max,
  median,
  min,
  sort,
  subtract,
} = require("@jrc03c/js-math-tools")

const common = require("./common")
const containsOnlyNumbers = require("./contains-only-numbers")
const isBinary = require("./is-binary")

class OutlierMitigator {
  constructor(options) {
    options = options || {}

    this.isAllowedToClip = !isUndefined(options.isAllowedToClip)
      ? options.isAllowedToClip
      : true

    this.isAllowedToTakeTheLog = !isUndefined(options.isAllowedToTakeTheLog)
      ? options.isAllowedToTakeTheLog
      : false

    this.maxScore = options.maxScore || 5

    assert(
      isBoolean(this.isAllowedToClip),
      "The `isAllowedToClip` property on the options object passed into the `OutlierMitigator` constructor must have a boolean value!",
    )

    assert(
      isBoolean(this.isAllowedToTakeTheLog),
      "The `isAllowedToTakeTheLog` property on the options object passed into the `OutlierMitigator` constructor must have a boolean value!",
    )

    assert(
      isNumber(this.maxScore) && this.maxScore >= 0,
      "The `maxScore` property on the options object passed into the `OutlierMitigator` constructor must have a non-negative number value!",
    )

    this.mad = 0
    this.median = 0
  }

  fit(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return this.fit(x.values)
    }

    assert(
      isArray(x),
      "The `OutlierMitigator.fit` method only works on arrays, Series, and DataFrames!",
    )

    if (!common.shouldIgnoreNaNValues) {
      if (!containsOnlyNumbers(x)) {
        this.mad = NaN
        this.median = NaN
        return this
      }
    }

    const xFlat = flatten(x)
    const numericalValues = dropNaN(xFlat)

    if (isBinary(numericalValues)) {
      return this
    }

    if (numericalValues.length === 0) {
      return this
    }

    this.median = median(numericalValues)
    this.mad = median(abs(subtract(numericalValues, this.median)))
    return this
  }

  fitTransform() {
    return this.fit(arguments[0]).transform(...arguments)
  }

  transform() {
    if (arguments.length > 1) {
      return Array.from(arguments).map(a => this.transform(a))
    }

    const x = arguments[0]

    if (isDataFrame(x) || isSeries(x)) {
      return this.transform(x.values)
    }

    assert(
      isArray(x),
      "The `OutlierMitigator.transform` method only works on arrays, Series, and DataFrames!",
    )

    if (!common.shouldIgnoreNaNValues) {
      if (!containsOnlyNumbers(x)) {
        return apply(x, () => NaN)
      }
    }

    const xFlat = flatten(x)
    const numericalValues = dropNaN(xFlat)
    let outlierIsImmediatelyAboveOrBelowMedian = false

    if (this.mad === 0) {
      const temp = sort(copy(numericalValues))
      const low = temp.filter(value => value < this.median)
      const high = temp.filter(value => value > this.median)
      let before = this.median
      let after = this.median

      if (low.length > 0) before = max(low)
      if (high.length > 0) after = min(high)

      this.mad = (after - before) / 2

      if (this.mad === 0) {
        return x
      }

      outlierIsImmediatelyAboveOrBelowMedian =
        (this.median - before) / this.mad > this.maxScore ||
        (after - this.median) / this.mad > this.maxScore
    }

    const score = max(
      divide(abs(subtract(numericalValues, this.median)), this.mad),
    )

    if (score > this.maxScore || outlierIsImmediatelyAboveOrBelowMedian) {
      let out = this.isAllowedToClip
        ? apply(x, v => {
            if (isNumber(v)) {
              return clamp(
                v,
                this.median - this.maxScore * this.mad,
                this.median + this.maxScore * this.mad,
              )
            } else {
              return v
            }
          })
        : x

      if (this.isAllowedToTakeTheLog) {
        const outMin = min(out)

        out = apply(out, v => {
          if (isNumber(v)) {
            return log(v - outMin + 1)
          } else {
            return v
          }
        })
      }

      return out
    } else {
      return x
    }
  }
}

module.exports = OutlierMitigator
