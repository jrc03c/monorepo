import { stats } from "./stats.mjs"

function mean(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).mean
}

export { mean }
