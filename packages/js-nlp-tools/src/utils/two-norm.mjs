import { dot } from "@jrc03c/js-math-tools"

function twoNorm(x) {
  return Math.sqrt(dot(x, x))
}

export { twoNorm }
