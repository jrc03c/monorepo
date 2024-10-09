import { stats } from "./stats.mjs"

function variance(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, variance: true }).variance
}

export { variance }
