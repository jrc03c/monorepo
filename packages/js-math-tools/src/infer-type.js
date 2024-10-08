const apply = require("./apply")
const assert = require("./assert")
const booleanValues = require("./helpers/boolean-values")
const cast = require("./cast")
const count = require("./count")
const every = require("./every")
const flatten = require("./flatten")
const int = require("./int")
const isArray = require("./is-array")
const isDataFrame = require("./is-dataframe")
const isDate = require("./is-date")
const isNumber = require("./is-number")
const isSeries = require("./is-series")
const isString = require("./is-string")
const nullValues = require("./helpers/null-values")

function checkIfInteger(results) {
  if (results.type === "number") {
    if (typeof results.value !== "undefined") {
      results.isInteger = int(results.value) === results.value
    } else {
      results.isInteger = every(results.values, v =>
        isNumber(v) ? int(v) === v : true,
      )
    }
  }

  return results
}

function inferType(arr) {
  if (isDataFrame(arr)) {
    const out = arr.copy()
    const results = inferType(arr.values)
    out.values = results.values
    return checkIfInteger({ type: results.type, values: out })
  }

  if (isSeries(arr)) {
    const out = arr.copy()
    const results = inferType(arr.values)
    out.values = results.values
    return checkIfInteger({ type: results.type, values: out })
  }

  if (!isArray(arr)) {
    const out = inferType([arr])
    out.value = out.values[0]
    delete out.values
    return checkIfInteger(out)
  }

  assert(
    isArray(arr),
    "The `inferType` function only works on arrays, Series, and DataFrames!",
  )

  // possible types:
  // - bigint
  // - boolean
  // - date
  // - null
  // - number
  // - object
  // - string
  // note: do NOT return arrays!
  const types = flatten(arr).map(v => {
    if (v === undefined) return "null"

    try {
      if (typeof v === "object") {
        const temp = new Date(v.getTime())

        if (isDate(temp)) {
          return "date"
        }
      }
    } catch (e) {}

    if (!isString(v)) {
      if (typeof v === "bigint") {
        v = v.toString() + "n"
      } else {
        v = JSON.stringify(v)
      }
    }

    const vLower = v.toLowerCase()
    const vLowerTrimmed = vLower.trim()

    // null
    if (nullValues.indexOf(vLowerTrimmed) > -1) {
      return "null"
    }

    // boolean
    if (booleanValues.indexOf(vLowerTrimmed) > -1) {
      return "boolean"
    }

    try {
      if (v.match(/^-?\d+n$/g)) {
        return "bigint"
      }

      const vParsed = JSON.parse(v)

      // number
      if (isNumber(vParsed)) {
        return "number"
      }

      // object
      if (typeof vParsed === "object") {
        if (isArray(vParsed)) return "string"
        return "object"
      }

      return "string"
    } catch (e) {
      // date
      const vDate = new Date(v)

      if (isDate(vDate)) {
        return "date"
      }

      return "string"
    }
  })

  const counts = count(types)

  const sortedValues = counts.values.toSorted(
    (a, b) => counts.get(b) - counts.get(a),
  )

  const primaryType = sortedValues[0]

  return checkIfInteger({
    type: primaryType,
    values: apply(arr, v => cast(v, primaryType)),
  })
}

module.exports = inferType
