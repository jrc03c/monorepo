import { stats } from "./stats.mjs"

function max(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs }).max
}

export { max }
