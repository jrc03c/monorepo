import {
  assert,
  correl,
  count,
  DataFrame,
  filter,
  inferType,
  isArray,
  isDataFrame,
  isFunction,
  isJagged,
  isNumber,
  isUndefined,
  map,
  shape,
  sort,
  sum,
} from "@jrc03c/js-math-tools"

import { getOneHotEncodings } from "./get-one-hot-encodings.mjs"
import { isWholeNumber } from "./is-whole-number.mjs"
import { stringify } from "@jrc03c/js-text-tools"

function convertToNumerical(df, config) {
  config = config || {}

  const maxUniqueValues = isNumber(config.maxUniqueValues)
    ? config.maxUniqueValues
    : 7

  const minNonMissingValues = isNumber(config.minNonMissingValues)
    ? config.minNonMissingValues
    : 15

  const maxCorrelationThreshold = isNumber(config.maxCorrelationThreshold)
    ? config.maxCorrelationThreshold
    : 1 - 1e-5

  const progress = config.progress || null

  if (isArray(df)) {
    assert(
      shape(df).length === 2 && !isJagged(df),
      "The `convertToNumerical` function only works on non-jagged 2-dimensional arrays and DataFrames!",
    )

    return convertToNumerical(new DataFrame(df))
  }

  assert(
    isDataFrame(df),
    "You must pass a DataFrame into the `convertToNumerical` function!",
  )

  assert(
    isWholeNumber(maxUniqueValues),
    "`maxUniqueValues` must be a whole number!",
  )

  assert(
    isWholeNumber(minNonMissingValues),
    "`minNonMissingValues` must be a whole number!",
  )

  assert(
    isNumber(maxCorrelationThreshold),
    "`maxCorrelationThreshold` must be a number!",
  )

  if (!isUndefined(progress)) {
    assert(isFunction(progress), "If defined, `progress` must be a function!")
  }

  // types:
  // - boolean
  // - bigint
  // - date
  // - null
  // - number
  // - object
  // - string

  const out = {}
  const shouldIgnoreNaNs = true

  df.apply((col, colIndex) => {
    if (progress) {
      progress(colIndex / df.columns.length)
    }

    const inferred = inferType(col.values)

    if (inferred.type === "boolean") {
      inferred.values = map(inferred.values, v => (v ? 1 : 0))
    }

    if (inferred.type === "date") {
      inferred.values = map(inferred.values, v => {
        try {
          return v.getTime()
        } catch (e) {
          return NaN
        }
      })
    }

    if (inferred.type === "null") {
      return
    }

    if (inferred.type === "number" || inferred.type === "bigint") {
      // don't do anything
    }

    if (inferred.type === "object") {
      inferred.values = map(inferred.values, v => stringify(v))
    }

    if (inferred.type === "string") {
      // don't do anything
    }

    const nonMissingValues = filter(inferred.values, v => !isUndefined(v))

    if (
      inferred.values.length - nonMissingValues.length >
      minNonMissingValues.length
    ) {
      return
    }

    // one-hot encode
    if (inferred.type !== "boolean") {
      const counts = sort(
        filter(
          count(nonMissingValues).toArray(),
          item => !isUndefined(item.value) && isNumber(item.count),
        ),
        (a, b) => b.count - a.count,
      )

      const topNPercent =
        sum(
          map(counts.slice(0, maxUniqueValues), item => item.count),
          shouldIgnoreNaNs,
        ) / nonMissingValues.length

      if (topNPercent >= 0.9) {
        if (counts.length < 2) {
          return
        }

        const oneHotEncodings = getOneHotEncodings(col.name, inferred.values)

        // check that the one-hot encoded columns are not highly correlated
        // with any existing columns, and then put them in the output
        // dictionary
        while (Object.keys(oneHotEncodings).length > 0) {
          const key = Object.keys(oneHotEncodings)[0]
          const values = oneHotEncodings[key]
          delete oneHotEncodings[key]

          const otherColNames = Object.keys(out)

          for (let i = 0; i < otherColNames.length; i++) {
            const otherColValues = out[otherColNames[i]]
            const r = correl(values, otherColValues, shouldIgnoreNaNs)

            if (r > maxCorrelationThreshold) {
              return
            }
          }

          out[key] = values
        }

        return
      }

      if (inferred.type === "object" || inferred.type === "string") {
        return
      }
    }

    if (
      inferred.type === "boolean" ||
      inferred.type === "date" ||
      inferred.type === "number" ||
      inferred.type === "bigint"
    ) {
      // check for high correlations with other columns
      const otherColNames = Object.keys(out)

      for (let i = 0; i < otherColNames.length; i++) {
        const otherColValues = out[otherColNames[i]]
        const r = correl(inferred.values, otherColValues, shouldIgnoreNaNs)

        if (r > maxCorrelationThreshold) {
          return
        }
      }

      // store in output dictionary
      out[col.name] = inferred.values
    }
  })

  return new DataFrame(out)
}

export { convertToNumerical }
