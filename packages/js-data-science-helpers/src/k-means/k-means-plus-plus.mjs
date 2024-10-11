import { argmin, divide, max, random } from "@jrc03c/js-math-tools"
import { KMeansNaive } from "./k-means-naive.mjs"
import { sse } from "./helpers.mjs"

class KMeansPlusPlus extends KMeansNaive {
  initializeCentroids(x) {
    // initialize centroids using the kmeans++ algorithm
    // 1) select a random point from the data to be the first centroid
    // 2) until we have k centroids:
    //    a) get all of the distances from each point to the closest centroid
    //    b) convert the distances to probabilities
    //    c) use the probabilities to randomly select a point to be the next
    //       centroid

    const shouldIgnoreNaNs = true
    const centroids = [x[Math.floor(random() * x.length)]]

    while (centroids.length < this.k) {
      const distances = x.map(p =>
        sse(
          p,
          centroids[
            argmin(
              centroids.map(c => sse(p, c)),
              shouldIgnoreNaNs,
            )
          ],
        ),
      )

      const probabilities = divide(distances, max(distances, shouldIgnoreNaNs))
      centroids.push(x[probabilities.findIndex(v => random() < v)])
    }

    return centroids
  }
}

export { KMeansPlusPlus }
