import { assert } from "./assert.mjs"
import { isArray } from "./is-array.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isFunction } from "./is-function.mjs"
import { isObject } from "./is-object.mjs"
import { isSeries } from "./is-series.mjs"

function find(x, fn) {
  if (isDataFrame(x)) {
    return find(x.values, fn)
  }

  if (isSeries(x)) {
    return find(x.values, fn)
  }

  assert(
    isObject(x) || isArray(x),
    "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `find` function!",
  )

  if (!isFunction(fn)) {
    const value = fn
    fn = v => v === value
  }

  function helper(x, fn, checked) {
    checked = checked || []

    if (checked.indexOf(x) > -1) {
      return null
    }

    if (isObject(x)) {
      checked.push(x)
      const keys = Object.keys(x).concat(Object.getOwnPropertySymbols(x))

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = x[key]

        if (fn(value)) {
          return value
        }

        const result = helper(value, fn, checked)

        if (result) {
          return result
        }
      }
    } else if (isArray(x)) {
      checked.push(x)

      for (let i = 0; i < x.length; i++) {
        const value = x[i]

        if (fn(value)) {
          return value
        }

        const result = helper(value, fn, checked)

        if (result) {
          return result
        }
      }
    } else {
      if (fn(x)) {
        return x
      }
    }

    return null
  }

  function safeFn(v) {
    try {
      return fn(v)
    } catch (e) {
      return false
    }
  }

  return helper(x, safeFn)
}

export { find }
