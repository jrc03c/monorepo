import { stats } from "./stats.mjs"

function std(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, stdev: true }).stdev
}

export { std }
