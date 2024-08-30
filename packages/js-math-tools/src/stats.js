const flatten = require("./flatten")
const isEqual = require("./is-equal")
const isNumber = require("./is-number")

class Counter {
  constructor() {
    this.clear()
  }

  get counts() {
    return this.values.map(v => this.dict.get(v))
  }

  get values() {
    return Array.from(this.dict.keys())
  }

  clear() {
    this.dict = new Map()
    return this
  }

  count(x) {
    for (const v of x) {
      this.increment(v)
    }

    return this
  }

  delete(value) {
    this.dict.delete(this.getOriginalValue(value))
    return this
  }

  get(value) {
    return this.dict.get(this.getOriginalValue(value)) || 0
  }

  getOriginalValue(value) {
    if (this.dict.has(value)) {
      return value
    }

    if (typeof value === "object" && value !== null) {
      const other = this.values.find(other => isEqual(other, value))

      if (other) {
        return other
      }
    }

    return value
  }

  has(value) {
    return (
      this.dict.has(value) ||
      (typeof value === "object" &&
        value !== null &&
        !!this.values.find(other => isEqual(other, value)))
    )
  }

  increment(value) {
    return this.set(value, this.get(value) + 1)
  }

  set(value, count) {
    this.dict.set(this.getOriginalValue(value), count)
    return this
  }
}

function stats(x, which) {
  // `which` is an options object which allows users to specify which stats they
  // want to return (which can be useful because some stats require looping over
  // the array more than once); default stats include:
  // - counts
  // - max
  // - mean
  // - min
  // - sum
  // optional stats include:
  // - median
  // - mode
  // - stdev
  // - variance
  // also note that some of them are freebies because they *must* be computed
  // (e.g., sum), in which case we'll probably ignore them even if they're
  // marked as false in `which`;
  // also note that this function ignores nans, meaning (for example) that the
  // mean is the sum of the numbers divided by the number of numbers, *not*
  // divided by the length of the original array!

  which = which || {}

  const out = {}
  let resultsShouldIncludeBigInts = false

  const xflat = flatten(x)
  const xnums = []

  let max = -Infinity
  let min = Infinity
  let sum = 0
  const counts = new Counter()

  for (const v of xflat) {
    if (isNumber(v)) {
      if (typeof v === "bigint") {
        resultsShouldIncludeBigInts = true
      }

      if (v > max) {
        max = v
      }

      if (v < min) {
        min = v
      }

      sum += Number(v)
      xnums.push(v)
    }

    counts.increment(v)
  }

  const mean = sum / xnums.length

  out.counts = counts
  out.max = max
  out.mean = mean
  out.min = min
  out.sum = sum

  if (which.mode) {
    const sortedCountPairs = Array.from(
      counts.values.map(v => [v, counts.get(v)]),
    ).toSorted((a, b) => b[1] - a[1])

    const highestCount = sortedCountPairs[0][1]
    const mode = []

    for (const pair of sortedCountPairs) {
      if (pair[1] == highestCount) {
        mode.push(pair[0])
      } else {
        break
      }
    }

    out.mode = mode.toSorted()
  }

  if (which.median) {
    const xnumsSorted = xnums.toSorted((a, b) => Number(a) - Number(b))
    const middle = Math.floor(xnumsSorted.length / 2)

    if (xnumsSorted.length % 2 === 0) {
      const left = xnumsSorted[middle - 1]
      const right = xnumsSorted[middle]
      out.median = (Number(left) + Number(right)) / 2

      if (
        resultsShouldIncludeBigInts &&
        typeof left === "bigint" &&
        typeof right === "bigint"
      ) {
        try {
          out.median = BigInt(out.median)
        } catch (e) {
          // ...
        }
      }
    } else {
      out.median = xnumsSorted[middle]
    }
  }

  if (which.stdev || which.variance) {
    let variance = 0

    for (const v of xnums) {
      variance += Math.pow(v - mean, 2)
    }

    variance /= xnums.length
    const stdev = Math.sqrt(variance)

    out.stdev = stdev
    out.variance = variance
  }

  if (resultsShouldIncludeBigInts) {
    try {
      out.sum = BigInt(out.sum)
    } catch (e) {
      // ...
    }

    if (which.mode) {
      out.mode = out.mode.map(v => {
        try {
          return BigInt(v)
        } catch (e) {
          return v
        }
      })
    }
  }

  return out
}

module.exports = stats
