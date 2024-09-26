import stats from "./stats.js"

function max(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).max
}

export default max
