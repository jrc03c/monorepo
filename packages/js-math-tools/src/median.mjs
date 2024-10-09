import { stats } from "./stats.mjs"

function median(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, median: true }).median
}

export { median }
