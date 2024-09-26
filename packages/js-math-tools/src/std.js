import stats from "./stats.js"

function std(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, stdev: true }).stdev
}

export default std
