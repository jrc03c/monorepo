import { isArray } from "./is-array.mjs"
import { isObject } from "./is-object.mjs"

function merge() {
  const helper = (a, b) => {
    if (isObject(a) && isObject(b)) {
      const keys = Array.from(new Set(Object.keys(a).concat(Object.keys(b))))
      const out = {}

      for (const key of keys) {
        out[key] = helper(a[key], b[key])
      }

      return out
    } else if (isArray(a) && isArray(b)) {
      const out = []

      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        out.push(helper(a[i], b[i]))
      }

      return out
    } else {
      return b ?? a
    }
  }

  return Array.from(arguments).reduce((out, x) => {
    if (!isObject(x) && !isArray(x)) {
      throw new Error(
        "All of the values passed into the `merge` function must be objects or arrays!",
      )
    }

    return helper(out, x)
  }, {})
}

export { merge }
