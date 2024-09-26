import stats from "./stats.js"

function mode(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, mode: true }).mode
}

export default mode
