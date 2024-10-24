import { assert } from "../assert.mjs"
import { isArray } from "../is-array.mjs"
import { isJagged } from "../is-jagged.mjs"
import { isObject } from "../is-object.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { MathError } from "../math-error.mjs"
import { shape } from "../shape.mjs"

function dfAssign(DataFrame, Series, df, p1, p2) {
  const isDataFrame = x => x instanceof DataFrame
  const isSeries = x => x instanceof Series

  if (!isUndefined(p2)) {
    assert(
      isString(p1),
      "If passing two arguments into the `assign` method, then the first argument must be a string name!",
    )

    assert(
      isArray(p2) && !isJagged(p2) && shape(p2).length === 1,
      "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!",
    )

    const out = df.append(p2, 1)
    out.columns[out.columns.length - 1] = p1
    return out
  } else {
    if (isDataFrame(p1)) {
      return df.append(p1, 1)
    } else if (isSeries(p1)) {
      return df.append(p1, 1)
    } else if (isObject(p1)) {
      const maxColumnLength = Math.max(
        ...Object.keys(p1)
          .concat(Object.getOwnPropertySymbols(p1))
          .map(key => p1[key].length),
      )

      Object.keys(p1)
        .concat(Object.getOwnPropertySymbols(p1))
        .forEach(key => {
          while (p1[key].length < maxColumnLength) {
            p1[key].push(undefined)
          }
        })

      return df.append(new DataFrame(p1), 1)
    } else {
      throw new MathError(
        "You must pass a DataFrame, Series, or object into the `assign` method!",
      )
    }
  }
}

export { dfAssign }
