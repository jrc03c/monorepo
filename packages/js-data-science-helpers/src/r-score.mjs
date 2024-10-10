import { abs, sign, sqrt } from "@jrc03c/js-math-tools"
import { rSquared } from "./r-squared.mjs"

function rScore(yTrue, yPred, shouldIgnoreNaNs) {
  const r2 = rSquared(yTrue, yPred, shouldIgnoreNaNs)
  return sign(r2) * sqrt(abs(r2))
}

export { rScore }
