import { isInteger } from "./is-integer.mjs"

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

export { isWholeNumber }
