import {
  add,
  argmin,
  assert,
  copy,
  divide,
  isDataFrame,
  isFunction,
  isUndefined,
  normal,
  random,
  range,
  scale,
  shuffle,
  zeros,
} from "@jrc03c/js-math-tools"

import { isMatrix, sse } from "./helpers.mjs"
import { isWholeNumber } from "../is-whole-number.mjs"

class KMeansNaive {
  constructor(config) {
    assert(
      typeof config === "object",
      "`config` must be an object! See the documentation for more information about the properties that the `config` object can contain.",
    )

    assert(isWholeNumber(config.k), "`k` must be a whole number!")

    assert(
      isWholeNumber(config.maxIterations) || isUndefined(config.maxIterations),
      "`maxIterations` must be a whole number or undefined!",
    )

    assert(
      isWholeNumber(config.maxRestarts) || isUndefined(config.maxRestarts),
      "`maxRestarts` must be a whole number or undefined!",
    )

    assert(
      typeof config.tolerance === "number" || isUndefined(config.tolerance),
      "`tolerance` must be a number or undefined!",
    )

    this.k = config.k
    this.maxRestarts = config.maxRestarts || 25
    this.maxIterations = config.maxIterations || 100
    this.tolerance = config.tolerance || 1e-4
    this.centroids = null
  }

  initializeCentroids(x) {
    return shuffle(x).slice(0, this.k)
  }

  getFitStepFunction(x, progress) {
    assert(isMatrix(x), "`x` must be a matrix!")

    if (isDataFrame(x)) {
      x = x.values
    }

    if (!isUndefined(progress)) {
      assert(isFunction(progress), "If defined, `progress` must be a function!")
    }

    const centroids = this.initializeCentroids(x)

    const state = {
      currentRestart: 0,
      currentIteration: 0,
      currentCentroids: centroids,
      bestCentroids: centroids,
      bestScore: -Infinity,
      isFinished: false,
    }

    return () => {
      // get the labels for the points
      const labels = this.predict(x, state.currentCentroids)

      // average the points in each cluster
      const sums = []
      const counts = zeros(this.k)

      x.forEach((p, i) => {
        const k = labels[i]

        if (!sums[k]) {
          sums[k] = zeros(p.length)
        }

        sums[k] = add(sums[k], p)
        counts[k]++
      })

      const newCentroids = range(0, this.k).map(k => {
        // if for some reason the count for this centroid is 0, then no
        // points were assigned to this centroid, which means it's no longer
        // useful; so, instead, we'll just almost-duplicate another centroid
        // by copying it and adding a little bit of noise to it
        if (counts[k] === 0) {
          return add(
            state.currentCentroids[
              Math.floor(random() * state.currentCentroids.length)
            ],
            scale(0.001, normal(state.currentCentroids[0].length)),
          )
        } else {
          return divide(sums[k], counts[k])
        }
      })

      // if the change from the previous centroids to these new centroids
      // is very small (i.e., less then `tolerance`), then we should stop
      // iterating
      if (sse(state.currentCentroids, newCentroids) < this.tolerance) {
        state.currentIteration = this.maxIterations - 1
      } else {
        state.currentCentroids = newCentroids
      }

      if (progress) {
        progress(
          (state.currentRestart + state.currentIteration / this.maxIterations) /
            this.maxRestarts,
          this,
        )
      }

      state.currentIteration++

      if (state.currentIteration >= this.maxIterations) {
        const score = this.score(x, state.currentCentroids)

        if (score > state.bestScore) {
          state.bestScore = score
          state.bestCentroids = copy(state.currentCentroids)
        }

        state.currentIteration = 0
        state.currentRestart++

        if (state.currentRestart >= this.maxRestarts) {
          state.isFinished = true
          this.centroids = state.bestCentroids

          if (progress) {
            progress(1, this)
          }
        } else {
          const newCentroids = this.initializeCentroids(x)
          state.currentCentroids = newCentroids
        }
      }

      return state
    }
  }

  fit(x, progress) {
    const fitStep = this.getFitStepFunction(x, progress)
    let state

    while (!state || !state.isFinished) {
      state = fitStep()
    }

    return this
  }

  predict(x, centroids) {
    centroids = centroids || this.centroids

    if (!centroids) {
      throw new Error(
        "No centroids were provided to the `predict` method, and the K-Means model hasn't been fitted yet. Please either pass centroids as a second parameter to the `predict` method or run the `fit` method first!",
      )
    }

    return x.map(p => argmin(centroids.map(c => sse(p, c))))
  }

  score(x, centroids) {
    centroids = centroids || this.centroids

    if (!centroids) {
      throw new Error(
        "No centroids were provided to the `score` method, and the K-Means model hasn't been fitted yet. Please either pass centroids as a second parameter to the `score` method or run the `fit` method first!",
      )
    }

    const labels = this.predict(x, centroids)
    const assigments = labels.map(k => centroids[k])
    return -sse(x, assigments)
  }
}

export { KMeansNaive }
