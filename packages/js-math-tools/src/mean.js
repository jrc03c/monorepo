import stats from "./stats.js"

function mean(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).mean
}

export default mean
