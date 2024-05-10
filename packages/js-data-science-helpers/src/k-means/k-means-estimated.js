const {
  argmin,
  assert,
  DataFrame,
  floor,
  isNumber,
  max,
  random,
} = require("@jrc03c/js-math-tools")

const { getDistanceMatrix } = require("./helpers")
const KMeansNaive = require("./k-means-naive")

class KMeansMetaEstimated extends KMeansNaive {
  distancesCache = {}
  subSampleSize = 0

  constructor(config) {
    config = config || {}
    super(config)

    if (config.subSampleSize) {
      assert(
        isNumber(config.subSampleSize) &&
          config.subSampleSize > 0 &&
          Math.floor(config.subSampleSize) === config.subSampleSize,
        `If included in the configuration object passed into the \`${this.constructor.name}\` constructor, the "subSampleSize" key must point to a positive integer value!`
      )

      if (config.subSampleSize < this.k) {
        config.subSampleSize = this.k

        console.warn(
          `NOTE: You provided a "subSampleSize" (${config.subSampleSize}) that is smaller than \`k\` (${this.k}), so we have automatically increased the "subSampleSize" to \`k\`!`
        )
      }

      this.subSampleSize = config.subSampleSize
    }
  }

  initializeCentroids(x) {
    if (x instanceof DataFrame) {
      x = x.values
    }

    if (this.subSampleSize && this.subSampleSize > 0) {
      const temp = []

      while (temp.length < this.subSampleSize) {
        const p = x[floor(random() * x.length)]

        if (!temp.includes(p)) {
          temp.push(p)
        }
      }

      x = temp
    }

    const distances = (() => {
      if (this.distancesCache[x]) {
        return this.distancesCache[x]
      } else {
        const distances = getDistanceMatrix(x)
        this.distancesCache[x] = distances
        return distances
      }
    })()

    const dmax = max(distances)
    const radius = dmax / this.k
    const clusters = []

    x.forEach((p, i) => {
      const distancesRow = distances[i]

      if (clusters.length === 0) {
        clusters.push([p])
      } else {
        const tempDistances = clusters.map(
          cluster =>
            distancesRow[x.indexOf(cluster[floor(random() * cluster.length)])]
        )

        const index = argmin(tempDistances)
        const d = tempDistances[index]

        if (d < radius || clusters.length >= this.k) {
          clusters[index].push(p)
        } else {
          clusters.push([p])
        }
      }
    })

    return clusters.map(cluster => cluster[floor(random() * cluster.length)])
  }
}

module.exports = KMeansMetaEstimated
