import { decycle } from "./copy.mjs"
import { isArray } from "./is-array.mjs"
import { isDate } from "./is-date.mjs"

const numberTypes = ["number", "int", "float", "bigint"]

function isEqual(a, b) {
  function helper(a, b) {
    const aType = typeof a
    const bType = typeof b

    if (
      aType !== bType &&
      !numberTypes.includes(aType) &&
      !numberTypes.includes(bType)
    )
      return false

    if (aType === "undefined" && bType === "undefined") return true
    if (aType === "boolean") return a === b
    if (aType === "symbol") return a === b

    if (aType === "number" || aType === "bigint") {
      try {
        const aString = a.toString()
        const bString = b.toString()
        return aString === bString
      } catch (e) {
        return false
      }
    }

    if (aType === "string") return a === b
    if (aType === "function") return a === b

    if (aType === "object") {
      if (a === null || b === null) {
        return a === null && b === null
      } else {
        // For some reason I don't yet understand, using the `copy` function in
        // the context of Jest creates copies that are no longer instances of
        // `Date`. This DOES NOT happen outside of Jest; only in the Jest tests
        // is this a problem. To be honest, I'm not sure if it's fixed or not
        // yet, but at least the tests are passing for now!
        if (isDate(a)) {
          if (isDate(b)) {
            return a.getTime() === b.getTime()
          } else {
            return false
          }
        } else if (isDate(b)) {
          return false
        }

        if (a instanceof RegExp && b instanceof RegExp) {
          return a.toString() === b.toString()
        }

        if (isArray(a) !== isArray(b)) {
          return false
        }

        const aKeys = Object.keys(a).concat(Object.getOwnPropertySymbols(a))
        const bKeys = Object.keys(b).concat(Object.getOwnPropertySymbols(b))
        if (aKeys.length !== bKeys.length) return false

        for (let i = 0; i < aKeys.length; i++) {
          const key = aKeys[i]
          if (!helper(a[key], b[key])) return false
        }

        return true
      }
    }
  }

  try {
    return helper(a, b)
  } catch (e) {
    return helper(decycle(a), decycle(b))
  }
}

export { isEqual }
