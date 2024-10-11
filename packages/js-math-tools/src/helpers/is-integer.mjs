import { isNumber } from "../is-number.mjs"

function isInteger(x) {
  return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x)
}

export { isInteger }
