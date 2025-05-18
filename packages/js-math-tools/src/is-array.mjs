import { arrayTypes } from "./helpers/array-types.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"

const typeStrings = map(arrayTypes, s => s.name)

function isArray(obj) {
  try {
    if (obj instanceof Array) {
      return true
    }

    if (!isUndefined(obj.constructor)) {
      return (
        arrayTypes.indexOf(obj.constructor) > -1 ||
        typeStrings.indexOf(obj.constructor.name) > -1
      )
    }

    return false
  } catch (e) {
    return false
  }
}

export { isArray }
