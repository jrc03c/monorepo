import {
  argmin,
  assert,
  flatten,
  isArray,
  isDataFrame,
  isEqual,
  isSeries,
  max,
  mean,
  pow,
  shape,
  subtract,
  sum,
} from "@jrc03c/js-math-tools"

function accuracy(yTrue, yPred) {
  if (isDataFrame(yTrue) || isSeries(yTrue)) {
    yTrue = yTrue.values
  }

  if (isDataFrame(yPred) || isSeries(yPred)) {
    yPred = yPred.values
  }

  assert(
    isEqual(shape(yTrue), shape(yPred)),
    "`yPred` and `yTrue` must have the same shape!",
  )

  const yTrueFlat = flatten(yTrue)
  const yPredFlat = flatten(yPred)
  let correct = 0

  yTrueFlat.forEach((v, i) => {
    if (v === yPredFlat[i]) correct++
  })

  return correct / yTrueFlat.length
}

function isMatrix(x) {
  return isArray(x) && shape(x).length === 2
}

function orderCentroids(ctrue, cpred) {
  return ctrue.map(c1 => {
    return cpred[argmin(cpred.map(c2 => sse(c1, c2)))]
  })
}

function silhouette(points, labels) {
  // convert values to floats (to remove any non-numerical or BigInt values)
  points = points.map(row => row.map(v => Number(v)))

  // Group points into clusters
  const clusters = {}
  const labelSet = new Set()

  labels.forEach((label, i) => {
    if (!clusters[label]) {
      clusters[label] = []
    }

    clusters[label].push(points[i])
    labelSet.add(label)
  })

  // if (labelSet.size < 2) {
  //   return -1
  // }

  // For each point, compute its silhouette score, and then return the sum of
  // those scores.
  return mean(
    points.map((p, i) => {
      const label = labels[i]
      let a = Infinity
      let b = Infinity

      labelSet.forEach(otherLabel => {
        const cluster = clusters[otherLabel]
        const score = cluster.length < 2 ? 0 : sum(cluster.map(q => sse(p, q)))

        if (otherLabel === label) {
          a = score
        } else if (score < b) {
          b = score
        }
      })

      return (b - a) / max([a, b])
    }),
  )
}

function sse(xtrue, xpred) {
  const shouldIgnoreNaNs = true
  return sum(pow(subtract(xtrue, xpred), 2), shouldIgnoreNaNs)
}

export { accuracy, isMatrix, orderCentroids, silhouette, sse }
