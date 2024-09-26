import isArray from "./is-array.js"
import isUndefined from "./is-undefined.js"

function isObject(x) {
  return typeof x === "object" && !isUndefined(x) && !isArray(x)
}

export default isObject
