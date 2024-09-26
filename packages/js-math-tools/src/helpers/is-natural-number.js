import isInteger from "./is-integer.js"

function isNaturalNumber(x) {
  return isInteger(x) && x > 0
}

export default isNaturalNumber
