import { isInteger } from "./is-integer.mjs"

function isNaturalNumber(x) {
  return isInteger(x) && x > 0
}

export { isNaturalNumber }
