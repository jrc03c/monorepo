const Counter = require("./helpers/counter")
const flatten = require("./flatten")

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

  which = which || {}

  const counts = new Counter()
  const out = {}
  const xflat = flatten(x)
  let max = -Infinity
  let min = Infinity
  let resultsShouldIncludeBigInts = false
  let sum = 0

  for (const v of xflat) {
    if (typeof v === "bigint") {
      resultsShouldIncludeBigInts = true
    }

    try {
      if (v > max) {
        max = v
      }

      if (v < min) {
        min = v
      }

      sum += Number(v)
    } catch (e) {
      max = NaN
      min = NaN
      sum = NaN
    }

    counts.increment(v)
  }

  const mean = sum / xflat.length

  out.counts = counts
  out.max = max
  out.mean = mean
  out.min = min
  out.sum = sum

  if (isNaN(out.mean)) {
    out.max = NaN
    out.min = NaN
  }

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
    if (isNaN(mean)) {
      out.median = NaN
    } else {
      const xflatSorted = xflat.toSorted((a, b) => Number(a) - Number(b))
      const middle = Math.floor(xflatSorted.length / 2)

      if (xflatSorted.length % 2 === 0) {
        const left = xflatSorted[middle - 1]
        const right = xflatSorted[middle]
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
        out.median = xflatSorted[middle]
      }
    }
  }

  if (which.stdev || which.variance) {
    let variance = 0

    for (const v of xflat) {
      variance += Math.pow(Number(v) - mean, 2)
    }

    variance /= xflat.length
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
