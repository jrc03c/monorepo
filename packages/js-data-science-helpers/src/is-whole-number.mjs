import { isNumber } from "@jrc03c/js-math-tools"

function isWholeNumber(x) {
  return isNumber(x) && x >= 0 && Math.floor(x) === x && x < Infinity
}

export { isWholeNumber }
