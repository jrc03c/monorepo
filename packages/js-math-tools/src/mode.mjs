import { stats } from "./stats.mjs"

function mode(arr, shouldDropNaNs) {
  return stats(arr, { shouldDropNaNs, mode: true }).mode
}

export { mode }
