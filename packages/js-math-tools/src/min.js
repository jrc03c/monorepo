import stats from "./stats.js"

function min(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).min
}

export default min
