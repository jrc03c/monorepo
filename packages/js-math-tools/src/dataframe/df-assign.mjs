import { assert } from "../assert.mjs"
import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isJagged } from "../is-jagged.mjs"
import { isObject } from "../is-object.mjs"
import { isString } from "../is-string.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { MathError } from "../math-error.mjs"
import { shape } from "../shape.mjs"

// formulations:
// df.assign(col : string, values : Array)
// df.assign(col : Series)
// df.assign(data : DataFrame or object)
//   - in which key-value pairs are assigned basically the same way as in the
//     first formulation

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

    const out = df.copy()

    if (out.columns.includes(p1)) {
      const index = out.columns.indexOf(p1)
      out.columns[index] = p1
      forEach(out.values, (v, i) => (v[index] = p2[i]))
      return out
    } else {
      out._columns.push(p1)
      forEach(out._values, (v, i) => v.push(p2[i]))
      return out
    }
  } else {
    if (isDataFrame(p1)) {
      const out = df.copy()
      const outShape = out.shape
      const p1Shape = p1.shape

      for (let j=0; j<p1Shape[1]; j++) {
        const col = p1.columns[j]

        const colNewIndex =
          out.columns.includes(col)
          ? out.columns.indexOf(col)
          : out.columns.length

        if (!out.columns.includes(col)) {
          out._columns.push(col)
        }

        for (let i=0; i<outShape[0]; i++) {
          out._values[i][colNewIndex] = p1._values[i][j]
        }
      }

      return out
    } else if (isSeries(p1)) {
      return df.assign(p1.name, p1.values)
    } else if (isObject(p1)) {
      return df.assign(new DataFrame(p1))
    } else {
      throw new MathError(
        "You must pass a DataFrame, Series, or object into the `assign` method!",
      )
    }
  }
}

export { dfAssign }
