const { MathError } = require("@jrc03c/js-math-tools")

const helpers = {
  cohensd: require("./cohens-d"),
  cohensD: require("./cohens-d"),
  convertToNumerical: require("./convert-to-numerical"),
  diagonalize: require("./diagonalize"),
  getCorrelationMatrix: require("./get-correlation-matrix"),
  getHighlyCorrelatedColumns: require("./get-highly-correlated-columns"),
  getMagnitude: require("./get-magnitude"),
  getOneHotEncodings: require("./get-one-hot-encodings"),
  getPercentages: require("./get-percentages"),
  getPValueMatrix: require("./get-p-value-matrix"),
  hunterChainSort: require("./hunter-chain-sort"),
  IndexMatcher: require("./index-matcher"),
  isBinary: require("./is-binary"),
  isCorrelationMatrix: require("./is-correlation-matrix"),
  KMeans: require("./k-means"),
  normalize: require("./normalize"),
  orthonormalize: require("./orthonormalize"),
  OutlierMitigator: require("./outlier-mitigator"),
  project: require("./project"),
  pValue: require("./p-value"),
  rScore: require("./r-score"),
  rSquared: require("./r-squared"),
  standardize: require("./standardize"),
  StandardScaler: require("./standard-scaler"),
  trainTestSplit: require("./train-test-split"),

  dump() {
    const self = this

    const pub =
      typeof global !== "undefined"
        ? global
        : typeof window !== "undefined"
          ? window
          : null

    if (!pub) {
      throw new MathError(
        "Cannot dump functions into global scope because neither `global` nor `window` exist in the current context!",
      )
    }

    Object.keys(self).forEach(key => {
      try {
        Object.defineProperty(pub, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: self[key],
        })
      } catch (e) {
        pub[key] = self[key]
      }
    })
  },
}

try {
  window.JSDataScienceHelpers = helpers
} catch (e) {}

try {
  module.exports = helpers
} catch (e) {}
