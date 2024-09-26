import stats from "./stats.js"

function median(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, median: true }).median
}

export default median
