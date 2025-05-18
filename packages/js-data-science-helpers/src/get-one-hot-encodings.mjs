import {
  assert,
  DataFrame,
  filter,
  forEach,
  isArray,
  isSeries,
  isString,
  isUndefined,
  map,
  set,
  shape,
  sort,
} from "@jrc03c/js-math-tools"

function simpleStringify(x) {
  if (typeof x === "bigint") {
    return x.toString() + "n"
  } else {
    return x
  }
}

function getOneHotEncodings() {
  if (arguments.length === 1 && isSeries(arguments[0])) {
    const { name, values } = arguments[0]
    const encodings = getOneHotEncodings(name, values)
    const out = new DataFrame(encodings)
    out.index = arguments[0].index.slice()
    return out
  }

  const [name, values] = arguments

  assert(
    isString(name),
    "When passing two arguments into the `getOneHotEncodings` function, the first argument must be a string representing the name of the variable being encoded!",
  )

  assert(
    isArray(values) && shape(values).length === 1,
    "When passing two arguments into the `getOneHotEncodings` function, the second argument must be a 1-dimensional array!",
  )

  const out = {}

  const colNames = map(
    filter(
      filter(
        sort(set(values)),
        v => typeof v !== "number" || v.toString() !== "NaN",
      ),
      v => !isUndefined(v),
    ),
    v => name + "_" + simpleStringify(v),
  ).slice(0, -1)

  forEach(colNames, colName => {
    out[colName] = map(values, v => {
      if (colName === name + "_" + simpleStringify(v)) {
        return 1
      }

      if (typeof v === "number" && v.toString() === "NaN") {
        return NaN
      }

      if (isUndefined(v)) {
        return NaN
      }

      return 0
    })
  })

  return out
}

export { getOneHotEncodings }
