const {
  assert,
  isArray,
  isDataFrame,
  isEqual,
  isFunction,
  isUndefined,
  range,
  shape,
} = require("@jrc03c/js-math-tools")

const { isMatrix, isWholeNumber } = require("./helpers")
const KMeansPlusPlus = require("./k-means-plus-plus")

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
      config.ks = range(1, 16)
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

    assert(
      typeof config.tolerance === "number" || isUndefined(config.tolerance),
      "`tolerance` must be a number or undefined!",
    )

    this.ks = config.ks
    this.maxRestarts = config.maxRestarts || 25
    this.maxIterations = config.maxIterations || 100
    this.tolerance = config.tolerance || 1e-4
    this.scoreStopRatio = config.scoreStopRatio || 0.85
    this.modelClass = config.modelClass || KMeansPlusPlus
    this.fittedModel = null
  }

  getFitStepFunction(x, progress) {
    // currently, this method uses the "elbow" method of determining when to
    // stop; but we should probably consider the "silhouette" method as well!

    assert(isMatrix(x), "`x` must be a matrix!")

    if (isDataFrame(x)) {
      x = x.values
    }

    if (!isUndefined(progress)) {
      assert(isFunction(progress), "If defined, `progress` must be a function!")
    }

    const state = {
      isFinished: false,
      lastScore: -Infinity,
      currentIndex: 0,
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

      const score = model.score(x)

      if (score / state.lastScore > this.scoreStopRatio) {
        state.isFinished = true
        state.currentIndex--
      } else {
        state.lastScore = score

        if (state.currentIndex + 1 >= this.ks.length) {
          state.isFinished = true
        } else {
          state.currentIndex++
        }
      }

      if (state.isFinished) {
        this.fittedModel = new this.modelClass({
          k: this.ks[state.currentIndex],
          maxRestarts: this.maxRestarts,
          maxIterations: this.maxIterations,
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

module.exports = KMeansMeta
