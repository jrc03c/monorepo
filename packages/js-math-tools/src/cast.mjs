import { isArray } from "./is-array.mjs"
import { isBoolean } from "./is-boolean.mjs"
import { isDataFrame } from "./is-dataframe.mjs"
import { isDate } from "./is-date.mjs"
import { isEqual } from "./is-equal.mjs"
import { isNumber } from "./is-number.mjs"
import { isObject } from "./is-object.mjs"
import { isSeries } from "./is-series.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { map } from "./map.mjs"

function cast(value, type) {
  if (isDataFrame(value) || isSeries(value)) {
    return value.apply(item => cast(item, type))
  }

  if (isArray(value)) {
    return map(value, v => cast(v, type))
  }

  if (type === "null") {
    return null
  }

  if (type === "number") {
    if (isUndefined(value)) {
      return NaN
    }

    const booleanValue = cast(value, "boolean")

    if (isBoolean(booleanValue)) {
      return booleanValue ? 1 : 0
    }

    try {
      JSON.parse(value)
    } catch (e) {
      const dateValue = cast(value, "date")

      if (isDate(dateValue)) {
        return dateValue.getTime()
      }
    }

    const out = parseFloat(value)
    if (isNaN(out)) return NaN
    return out
  }

  if (type === "int") {
    const out = cast(value, "number")
    return out >= 0 ? Math.floor(out) : Math.ceil(out)
  }

  if (type === "float") {
    return cast(value, "number")
  }

  if (type === "bigint") {
    if (typeof value === "bigint") {
      return value
    }

    return BigInt(cast(value, "int"))
  }

  if (type === "boolean") {
    if (isBoolean(value)) {
      return value
    }

    if (isNumber(value)) {
      if (value === 0) {
        return false
      }

      if (value === 1) {
        return true
      }

      return null
    }

    try {
      const vBool = (
        typeof value === "object"
          ? value.toString() === "null"
            ? "false"
            : JSON.stringify(value)
          : value.toString()
      )
        .trim()
        .toLowerCase()

      if (vBool === "true" || vBool === "yes" || vBool === "y") {
        return true
      }

      if (vBool === "false" || vBool === "no" || vBool === "n") {
        return false
      }

      return null
    } catch (e) {
      return null
    }
  }

  if (type === "date") {
    if (isDate(value)) {
      return value
    }

    if (isUndefined(value)) {
      return null
    }

    const valueFloat = parseFloat(value)

    if (!isNaN(valueFloat)) {
      const out = new Date(value)
      if (!isDate(out)) return null
      return out
    }

    const valueDate = Date.parse(value)

    if (!isNaN(valueDate)) {
      return new Date(valueDate)
    }

    return null
  }

  if (type === "object") {
    if (isObject(value)) {
      return value
    }

    const booleanValue = cast(value, "boolean")

    if (isBoolean(booleanValue)) {
      return null
    }

    try {
      const numberValue = cast(value, "number")

      if (isNumber(numberValue)) {
        JSON.parse(value)
        return null
      }
    } catch (e) {}

    const dateValue = cast(value, "date")

    if (dateValue) {
      return dateValue
    }

    // note: don't return arrays!
    try {
      const out = JSON.parse(value)

      if (isArray(out)) {
        return map(out, v => cast(v, type))
      } else {
        return out
      }
    } catch (e) {
      return null
    }
  }

  if (type === "string") {
    if (isUndefined(value)) {
      if (isEqual(value, undefined)) {
        return "undefined"
      }

      return "null"
    }

    if (value instanceof Date) {
      return value.toJSON()
    }

    const valueString = (() => {
      if (typeof value === "object") {
        if (value === null) {
          return "null"
        } else {
          return JSON.stringify(value)
        }
      } else {
        return value.toString()
      }
    })()

    // if (nullValues.indexOf(valueString.trim().toLowerCase()) > -1) {
    //   return null
    // }

    return valueString
  }
}

export { cast }
