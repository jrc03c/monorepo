import {
  abs,
  apply,
  assert,
  clamp,
  copy,
  divide,
  isArray,
  isBoolean,
  isDataFrame,
  isEqual,
  isNumber,
  isSeries,
  isUndefined,
  log,
  stats,
  subtract,
} from "@jrc03c/js-math-tools"

function isBinary(stats) {
  const xset = stats.counts.values

  return (
    xset.length < 3 &&
    ((xset.length === 2 && isEqual(xset.toSorted(), [0, 1])) ||
      (xset.length === 1 && (xset[0] === 0 || xset[0] === 1)))
  )
}

function getNumericalValues(stats) {
  const out = []

  stats.counts.values.forEach(value => {
    if (isNumber(value)) {
      const count = stats.counts.get(value)

      for (let i = 0; i < count; i++) {
        out.push(value)
      }
    }
  })

  return out
}

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

    if (x.length === 0) {
      return
    }

    const results = stats(x, {
      shouldDropNaNs: true,
      median: true,
    })

    if (isBinary(results)) {
      return this
    }

    const xnums = getNumericalValues(results)
    this.median = Number(results.median)

    this.mad = Number(
      stats(abs(subtract(xnums, this.median)), { median: true }).median,
    )

    return this
  }

  fitAndTransform() {
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

    const results = stats(x, { shouldDropNaNs: true })
    const xnums = getNumericalValues(results)
    let outlierIsImmediatelyAboveOrBelowMedian = false

    if (this.mad === 0) {
      const low = []
      const high = []
      let highestLowValue = -Infinity
      let lowestHighValue = Infinity

      xnums.forEach(value => {
        if (value < this.median) {
          low.push(value)

          if (value > highestLowValue) {
            highestLowValue = value
          }
        } else if (value > this.median) {
          high.push(value)

          if (value < lowestHighValue) {
            lowestHighValue = value
          }
        }
      })

      let before = this.median
      let after = this.median

      if (low.length > 0) before = highestLowValue
      if (high.length > 0) after = lowestHighValue

      this.mad = (after - before) / 2

      if (this.mad === 0) {
        return x
      }

      outlierIsImmediatelyAboveOrBelowMedian =
        (this.median - before) / this.mad > this.maxScore ||
        (after - this.median) / this.mad > this.maxScore
    }

    const score = stats(divide(abs(subtract(xnums, this.median)), this.mad)).max

    if (score > this.maxScore || outlierIsImmediatelyAboveOrBelowMedian) {
      let outMin = null
      let out = copy(x)

      if (this.isAllowedToClip) {
        out = apply(out, v => {
          v = isNumber(v)
            ? clamp(
                v,
                this.median - this.maxScore * this.mad,
                this.median + this.maxScore * this.mad,
              )
            : v

          if (
            this.isAllowedToTakeTheLog &&
            isNumber(v) &&
            (outMin === null || v < outMin)
          ) {
            outMin = v
          }

          return v
        })
      }

      if (this.isAllowedToTakeTheLog) {
        if (outMin === null) {
          outMin = stats(out).min
        }

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

export { OutlierMitigator }
