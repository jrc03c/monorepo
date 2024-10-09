import { stats } from "./stats.mjs"

function sum(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).sum
}

export { sum }
