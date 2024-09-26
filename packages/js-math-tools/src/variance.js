import stats from "./stats.js"

function variance(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, variance: true }).variance
}

export default variance
