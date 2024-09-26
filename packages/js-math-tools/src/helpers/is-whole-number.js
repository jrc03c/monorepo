import isInteger from "./is-integer.js"

function isWholeNumber(x) {
  return isInteger(x) && x >= 0
}

export default isWholeNumber
