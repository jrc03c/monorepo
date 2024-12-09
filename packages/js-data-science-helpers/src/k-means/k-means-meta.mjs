import {
  assert,
  isArray,
  isDataFrame,
  isEqual,
  isFunction,
  isUndefined,
  range,
  shape,
} from "@jrc03c/js-math-tools"

import { isMatrix, silhouette } from "./helpers.mjs"
import { isWholeNumber } from "../is-whole-number.mjs"
import { KMeansPlusPlus } from "./k-means-plus-plus.mjs"

class KMeansMeta {
  constructor(config) {
    if (isUndefined(config)) {
      config = {}
    }

    assert(
      typeof config === "object",
      "`config` must be an object! See the documentation for more information about the properties that the `config` object can contain.",
    )

    if (isUndefined(config.ks)) {
      config.ks = range(2, 16)
    }

    assert(isArray(config.ks), "`ks` must be an array of whole numbers!")

    config.ks.forEach(k => {
      assert(isWholeNumber(k), "`ks` must be an array of whole numbers!")
    })

    assert(
      isWholeNumber(config.maxIterations) || isUndefined(config.maxIterations),
      "`maxIterations` must be a whole number or undefined!",
    )

    assert(
      isWholeNumber(config.maxRestarts) || isUndefined(config.maxRestarts),
      "`maxRestarts` must be a whole number or undefined!",
    )

    this.finalMaxIterations = config.finalMaxIterations || 100
    this.finalMaxRestarts = config.finalMaxRestarts || 25
    this.fittedModel = null
    this.ks = config.ks
    this.maxIterations = config.maxIterations || 10
    this.maxRestarts = config.maxRestarts || 5
    this.modelClass = config.modelClass || KMeansPlusPlus
    this.tolerance = config.tolerance || 1e-4
  }

  getFitStepFunction(x, progress) {
    if (isDataFrame(x)) {
      x = x.values
    }

    assert(isMatrix(x), "`x` must be a matrix!")

    if (!isUndefined(progress)) {
      assert(isFunction(progress), "If defined, `progress` must be a function!")
    }

    const state = {
      currentIndex: 0,
      isFinished: false,
      scores: [],
    }

    return () => {
      const k = this.ks[state.currentIndex]

      const model = new this.modelClass({
        k,
        maxRestarts: 10,
        maxIterations: 20,
      })

      model.fit(x, p =>
        progress
          ? progress((state.currentIndex + p) / (this.ks.length + 1))
          : null,
      )

      const labels = model.predict(x)
      const score = silhouette(x, labels)

      if (state.scores.length >= this.ks.length || score > 1 - this.tolerance) {
        state.isFinished = true
      } else {
        state.scores.push({ k, score })

        if (state.currentIndex + 1 >= this.ks.length) {
          state.isFinished = true
        } else {
          state.currentIndex++
        }
      }

      if (state.isFinished) {
        let bestK = 1
        let bestScore = -1

        state.scores.forEach(s => {
          if (!isNaN(s.score) && s.score > bestScore) {
            bestScore = s.score
            bestK = s.k
          }
        })

        this.fittedModel = new this.modelClass({
          k: bestK,
          maxRestarts: this.finalMaxRestarts,
          maxIterations: this.finalMaxIterations,
        })

        this.fittedModel.fit(x, p =>
          progress
            ? progress((this.ks.length + p) / (this.ks.length + 1))
            : null,
        )

        if (progress) {
          progress(1)
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
    return this.fittedModel.predict(x, centroids)
  }

  score(x, centroids) {
    return this.fittedModel.score(x, centroids)
  }

  get k() {
    return this.fittedModel.k
  }

  set k(value) {
    throw new Error(
      "You can't set the k-value manually! It has to be set automatically via the `fit` method.",
    )
  }

  get centroids() {
    return this.fittedModel.centroids
  }

  set centroids(centroids) {
    assert(
      isEqual(shape(centroids), shape(this.fittedModel.centroids)),
      "When assigning a new value to the `centroids` property, the new centroids must have the same shape as the old centroids!",
    )

    this.fittedModel.centroids = centroids
  }
}

export { KMeansMeta }
