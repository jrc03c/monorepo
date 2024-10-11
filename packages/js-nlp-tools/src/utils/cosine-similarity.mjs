import { clamp, dot } from "@jrc03c/js-math-tools"
import { twoNorm } from "./two-norm.mjs"

function cosineSimilarity(a, b) {
  return clamp(dot(a, b) / (twoNorm(a) * twoNorm(b)), 0, 1)
}

export { cosineSimilarity }
