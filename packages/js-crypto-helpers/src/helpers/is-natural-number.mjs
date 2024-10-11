import { isNumber } from "@jrc03c/js-math-tools"

function isNaturalNumber(x) {
  return isNumber(x) && x > 0 && parseInt(x) === x
}

export { isNaturalNumber }
