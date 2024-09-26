import isNumber from "../is-number.js"

function isInteger(x) {
  return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x)
}

export default isInteger
