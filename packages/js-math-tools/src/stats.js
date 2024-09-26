import Counter from "./helpers/counter.js"
import flatten from "./flatten.js"
import isNumber from "./is-number.js"

function stats(x, options) {
  // `options` is an options object options allows users to specify options stats they
  // want to return (options can be useful because some stats require looping over
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
  // (e.g., sum), in options case we'll probably ignore them even if they're
  // marked as false in `options`;

  options = options || {}

  const counts = new Counter()
  const out = {}
  const xflat = flatten(x)
  const xnums = []
  let max = -Infinity
  let min = Infinity
  let resultsShouldIncludeBigInts = false
  let sum = 0

  for (const v of xflat) {
    if (typeof v === "bigint") {
      resultsShouldIncludeBigInts = true
    }

    if (!options.shouldDropNaNs || isNumber(v)) {
      try {
        if (v > max) {
          max = v
        }

        if (v < min) {
          min = v
        }

        sum += Number(v)
        xnums.push(v)
      } catch (e) {
        max = NaN
        min = NaN
        sum = NaN
      }
    }

    counts.increment(v)
  }

  const mean = sum / xnums.length

  out.counts = counts
  out.max = max
  out.mean = mean
  out.min = min
  out.n = xflat.length
  out.sum = sum

  if (isNaN(out.mean)) {
    out.max = NaN
    out.min = NaN
  }

  if (options.shouldDropNaNs) {
    out.nWithoutNaNs = xnums.length
  }

  if (options.mode) {
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

  if (options.median) {
    if (isNaN(mean)) {
      out.median = NaN
    } else {
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
  }

  if (options.stdev || options.variance) {
    let variance = 0

    for (const v of xnums) {
      variance += Math.pow(Number(v) - mean, 2)
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

    try {
      out.mean = BigInt(out.mean)
    } catch (e) {
      // ...
    }

    if (options.mode) {
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

export default stats
