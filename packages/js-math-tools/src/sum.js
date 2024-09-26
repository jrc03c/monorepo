import stats from "./stats.js"

function sum(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).sum
}

export default sum
