import {
  assert,
  decycle,
  isArray,
  isDate,
  isString,
  isUndefined,
  map,
  range,
} from "@jrc03c/js-math-tools"

import { convertTypedArrayToObject } from "./helpers/convert-typed-array-to-object.mjs"

function prefix(s, n) {
  if (!s || n <= 0) return ""
  return map(range(0, n), () => s).join("")
}

function stringify(x, indent) {
  assert(
    isString(indent) || isUndefined(indent),
    "The second parameter to the `stringify` function must be undefined or a string!",
  )

  const newline = indent ? "\n" : ""

  function helper(x, indent, depth) {
    depth = depth || 0

    if (typeof x === "bigint") {
      return JSON.stringify(x.toString() + "n")
    }

    if (typeof x === "number") {
      if (x === Infinity) {
        return '"Symbol(@Infinity)"'
      }

      if (x === -Infinity) {
        return '"Symbol(@NegativeInfinity)"'
      }

      if (isNaN(x)) {
        return '"Symbol(@NaN)"'
      }

      return x.toString()
    }

    if (typeof x === "string") {
      return JSON.stringify("Symbol(@String):" + x)
    }

    if (typeof x === "boolean") {
      return x.toString()
    }

    if (typeof x === "undefined") {
      return '"Symbol(@undefined)"'
    }

    if (typeof x === "symbol") {
      return JSON.stringify(x.toString())
    }

    if (typeof x === "function") {
      return JSON.stringify(x.toString())
    }

    if (x instanceof RegExp) {
      return x.toString()
    }

    if (typeof x === "object") {
      if (x === null) {
        return "null"
      }

      if (isDate(x)) {
        return JSON.stringify(x.toJSON())
      }

      if (isArray(x)) {
        if (x.length === 0) {
          return prefix(indent, depth - 1) + "[]"
        }

        if (!(x instanceof Array)) {
          return helper(convertTypedArrayToObject(x), null, indent)
        }

        return (
          prefix(indent, depth - 1) +
          "[" +
          newline +
          map(
            x,
            v => {
              let child = (() => {
                try {
                  return helper(convertTypedArrayToObject(v), indent, depth + 1)
                } catch (e) {
                  return helper(v, indent, depth + 1)
                }
              })()

              if (isString(child)) child = child.trim()
              return prefix(indent, depth + 1) + child
            },
          ).join("," + newline) +
          newline +
          prefix(indent, depth) +
          "]"
        )
      }

      if (
        Object.keys(x).length + Object.getOwnPropertySymbols(x).length ===
        0
      ) {
        return prefix(indent, depth - 1) + "{}"
      }

      return (
        prefix(indent, depth - 1) +
        "{" +
        newline +
        map(
          Object.keys(x).concat(Object.getOwnPropertySymbols(x)),
          key => {
            let child = (() => {
              try {
                return helper(
                  convertTypedArrayToObject(x[key]),
                  indent,
                  depth + 1,
                )
              } catch (e) {
                return helper(x[key], indent, depth + 1)
              }
            })()

            if (isString(child)) child = child.trim()

            const stringifiedKey =
              typeof key === "symbol" ? helper(key) : JSON.stringify(key)

            return (
              prefix(indent, depth + 1) +
              stringifiedKey +
              ":" +
              (indent ? " " : "") +
              child
            )
          },
        ).join("," + newline) +
        newline +
        prefix(indent, depth) +
        "}"
      )
    }

    return "undefined"
  }

  return helper(decycle(x), indent)
}

export { stringify }
