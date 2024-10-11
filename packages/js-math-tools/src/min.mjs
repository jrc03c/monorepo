import { stats } from "./stats.mjs"

function min(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).min
}

export { min }
