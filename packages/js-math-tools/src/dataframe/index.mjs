import { assert } from "../assert.mjs"
import { copy } from "../copy.mjs"
import { count } from "../count.mjs"
import { dfAppend } from "./df-append.mjs"
import { dfApply } from "./df-apply.mjs"
import { dfAssign } from "./df-assign.mjs"
import { dfCopy } from "./df-copy.mjs"
import { dfDrop } from "./df-drop.mjs"
import { dfDropMissing } from "./df-drop-missing.mjs"
import { dfDropNaN } from "./df-drop-nan.mjs"
import { dfFilter } from "./df-filter.mjs"
import { dfGet } from "./df-get.mjs"
import { dfGetDummies } from "./df-get-dummies.mjs"
import { dfGetSubsetByIndices } from "./df-get-subset-by-indices.mjs"
import { dfGetSubsetByNames } from "./df-get-subset-by-names.mjs"
import { dfPrint } from "./df-print.mjs"
import { dfResetIndex } from "./df-reset-index.mjs"
import { dfShuffle } from "./df-shuffle.mjs"
import { dfSort } from "./df-sort.mjs"
import { dfToDetailedObject } from "./df-to-detailed-object.mjs"
import { dfToJSON } from "./df-to-json.mjs"
import { dfToJSONString } from "./df-to-json-string.mjs"
import { dfToObject } from "./df-to-object.mjs"
import { forEach } from "../for-each.mjs"
import { isArray } from "../is-array.mjs"
import { isJagged } from "../is-jagged.mjs"
import { isObject } from "../is-object.mjs"
import { isUndefined } from "../is-undefined.mjs"
import { leftPad } from "../helpers/left-pad.mjs"
import { map } from "../map.mjs"
import { ndarray } from "../ndarray.mjs"
import { random } from "../random.mjs"
import { range } from "../range.mjs"
import { shape } from "../shape.mjs"
import { transpose } from "../transpose.mjs"

const DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe")

function makeKey(n) {
  const alpha = "abcdefghijklmnopqrstuvwxyz1234567890"
  let out = ""
  for (let i = 0; i < n; i++) out += alpha[Math.floor(random() * alpha.length)]
  return out
}

class DataFrame {
  static [Symbol.hasInstance](x) {
    try {
      return !!x._symbol && x._symbol === DATAFRAME_SYMBOL
    } catch (e) {
      return false
    }
  }

  constructor(data) {
    Object.defineProperty(this, "_symbol", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: DATAFRAME_SYMBOL,
    })

    Object.defineProperty(this, "_values", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(this, "values", {
      configurable: true,
      enumerable: true,

      get() {
        if (
          this._values.length === 0 ||
          (!isUndefined(this._values[0]) && this._values[0].length === 0)
        ) {
          return [[]]
        }

        return this._values
      },

      set(x) {
        assert(isArray(x), "The new values must be a 2-dimensional array!")

        const dataShape = shape(x)

        assert(
          dataShape.length === 2,
          "The new array of values must be 2-dimensional!",
        )

        if (dataShape[0] < this._index.length) {
          this._index = this._index.slice(0, dataShape[0])
        } else if (dataShape[0] > this._index.length) {
          this._index = this._index.concat(
            map(range(this._index.length, dataShape[0]), i => {
              return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
            }),
          )
        }

        if (dataShape[1] < this._columns.length) {
          this._columns = this._columns.slice(0, dataShape[1])
        } else if (dataShape[1] > this._columns.length) {
          this._columns = this._columns.concat(
            map(range(this._columns.length, dataShape[1]), i => {
              return "col" + leftPad(i, (dataShape[1] - 1).toString().length)
            }),
          )
        }

        this._values = x
      },
    })

    Object.defineProperty(this, "_columns", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(this, "columns", {
      configurable: true,
      enumerable: true,

      get() {
        return this._columns
      },

      set(x) {
        assert(
          isArray(x),
          "The new columns list must be a 1-dimensional array of strings!",
        )

        assert(
          this.isEmpty || x.length === this.shape[1],
          "The new columns list must be the same length as the old columns list!",
        )

        assert(
          shape(x).length === 1,
          "The new columns list must be a 1-dimensional array of strings!",
        )

        x = map(x, v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          forEach(temp.values, v => {
            out[v] = temp.get(v)
          })

          return out
        })()

        x = map(x, v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        this._columns = x
      },
    })

    Object.defineProperty(this, "_index", {
      value: [],
      configurable: true,
      enumerable: false,
      writable: true,
    })

    Object.defineProperty(this, "index", {
      configurable: true,
      enumerable: true,

      get() {
        return this._index
      },

      set(x) {
        assert(
          isArray(x),
          "The new index must be a 1-dimensional array of strings!",
        )

        assert(
          this.isEmpty || x.length === this.shape[0],
          "The new index must be the same length as the old index!",
        )

        assert(
          shape(x).length === 1,
          "The new index must be a 1-dimensional array of strings!",
        )

        x = map(x, v => {
          if (typeof v !== "string") {
            v = JSON.stringify(v) || v.toString()
          }

          if (v.trim().length === 0) {
            return "untitled_" + makeKey(8)
          }

          return v.trim()
        })

        const counts = (() => {
          const temp = count(x)
          const out = {}

          forEach(temp.values, v => {
            out[v] = temp.get(v)
          })

          return out
        })()

        x = map(x, v => {
          if (counts[v] > 1) {
            return v + "_" + makeKey(8)
          }

          return v
        })

        this._index = x
      },
    })

    assert(
      isUndefined(data) || isObject(data) || isArray(data),
      "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values.",
    )

    if (data) {
      if (data instanceof DataFrame) {
        this.values = copy(data.values)
        this.columns = copy(data.columns)
        this.index = copy(data.index)
      } else if (isArray(data)) {
        const dataShape = shape(data)

        assert(
          dataShape.length === 2,
          "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!",
        )

        assert(
          !isJagged(data),
          "The 2-dimensional array passed into the constructor of a DataFrame must not contain sub-arrays (i.e., rows) of different lengths!",
        )

        this.values = data
      } else {
        this._columns = map(
          Object.keys(data).concat(Object.getOwnPropertySymbols(data)),
          v => v.toString(),
        )

        const temp = []
        let lastColName = null
        let lastColLength = null

        forEach(this._columns, col => {
          if (isUndefined(lastColLength)) {
            lastColName = col
            lastColLength = data[col].length
          }

          assert(
            data[col].length === lastColLength,
            `The object passed into the DataFrame constructor contains arrays of different lengths! The key "${lastColName}" points to an array containing ${lastColLength} items, and the key "${col}" points to an array containing ${data[col].length} items.`,
          )

          lastColLength = data[col].length
          const values = data[col]
          temp.push(values)
        })

        this._values = transpose(temp)

        const dataShape = shape(this.values)

        this._index = map(range(0, dataShape[0]), i => {
          return "row" + leftPad(i, (dataShape[0] - 1).toString().length)
        })
      }
    }
  }

  get shape() {
    return shape(this.values)
  }

  get length() {
    return this.shape[0]
  }

  get width() {
    return this.shape[1]
  }

  get rows() {
    return this.index
  }

  set rows(rows) {
    this.index = rows
  }

  get isEmpty() {
    return (
      this.values.length === 0 || this.values.every(row => row.length === 0)
    )
  }

  clear() {
    const out = new DataFrame(ndarray(this.shape))
    out.columns = this.columns.slice()
    out.index = this.index.slice()
    return out
  }

  get(rows, cols) {
    if (arguments.length === 0) {
      return this
    }

    if (arguments.length === 1) {
      try {
        return this.get(null, rows)
      } catch (e) {
        return this.get(rows, null)
      }
    }

    return dfGet(this, rows, cols)
  }

  getSubsetByNames(rows, cols) {
    return dfGetSubsetByNames(DataFrame, Series, this, rows, cols)
  }

  getSubsetByIndices(rowIndices, colIndices) {
    return dfGetSubsetByIndices(this, rowIndices, colIndices)
  }

  getDummies(columns) {
    return dfGetDummies(DataFrame, this, columns)
  }

  oneHotEncode(columns) {
    return dfGetDummies(DataFrame, this, columns)
  }

  transpose() {
    const out = new DataFrame(transpose(this.values))
    out.columns = this.index.slice()
    out.index = this.columns.slice()
    return out
  }

  get T() {
    return this.transpose()
  }

  resetIndex(shouldSkipCopying) {
    return dfResetIndex(this, shouldSkipCopying)
  }

  copy() {
    return dfCopy(DataFrame, this)
  }

  assign(p1, p2) {
    return dfAssign(DataFrame, Series, this, p1, p2)
  }

  apply(fn, axis) {
    return dfApply(DataFrame, Series, this, fn, axis)
  }

  dropMissing(axis, condition, threshold) {
    return dfDropMissing(DataFrame, Series, this, axis, condition, threshold)
  }

  dropNaN(axis, condition, threshold) {
    return dfDropNaN(DataFrame, this, axis, condition, threshold)
  }

  drop(rows, cols) {
    return dfDrop(DataFrame, Series, this, rows, cols)
  }

  dropColumns(columns) {
    return this.drop(null, columns)
  }

  dropRows(rows) {
    return this.drop(rows, null)
  }

  toDetailedObject(axis) {
    return dfToDetailedObject(this, axis)
  }

  toObject() {
    return dfToObject(this)
  }

  toJSONString(axis) {
    return dfToJSONString(this, axis)
  }

  saveAsJSON(filename, axis) {
    return dfToJSON(this, filename, axis)
  }

  print() {
    return dfPrint(DataFrame, Series, this)
  }

  sort(cols, directions) {
    return dfSort(this, cols, directions)
  }

  sortByIndex() {
    return this.sort()
  }

  filter(fn, axis) {
    return dfFilter(DataFrame, Series, this, fn, axis)
  }

  shuffle(axis) {
    return dfShuffle(this, axis)
  }

  append(x, axis) {
    return dfAppend(this, x, axis)
  }

  concat(x, axis) {
    return this.append(x, axis)
  }

  join(x, axis) {
    return this.append(x, axis)
  }

  toString() {
    return JSON.stringify(this)
  }
}

import { createSeriesClass } from "../series/index.mjs"
const Series = createSeriesClass(DataFrame)

export { DataFrame, Series }
