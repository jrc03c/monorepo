import { isArray } from "./is-array.mjs"
import { isUndefined } from "./is-undefined.mjs"

function isObject(x) {
  return typeof x === "object" && !isUndefined(x) && !isArray(x)
}

export { isObject }
