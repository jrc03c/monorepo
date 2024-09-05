const { argmin, divide, max, random } = require("@jrc03c/js-math-tools")
const { sse } = require("./helpers")
const KMeansNaive = require("./k-means-naive")

class KMeansPlusPlus extends KMeansNaive {
  initializeCentroids(x) {
    // initialize centroids using the kmeans++ algorithm
    // 1) select a random point from the data to be the first centroid
    // 2) until we have k centroids:
    //    a) get all of the distances from each point to the closest centroid
    //    b) convert the distances to probabilities
    //    c) use the probabilities to randomly select a point to be the next
    //       centroid

    const shouldDropNaNs = true
    const centroids = [x[parseInt(random() * x.length)]]

    while (centroids.length < this.k) {
      const distances = x.map(p =>
        sse(
          p,
          centroids[
            argmin(
              centroids.map(c => sse(p, c)),
              shouldDropNaNs,
            )
          ],
        ),
      )

      const probabilities = divide(distances, max(distances, shouldDropNaNs))
      centroids.push(x[probabilities.findIndex(v => random() < v)])
    }

    return centroids
  }
}

module.exports = KMeansPlusPlus
