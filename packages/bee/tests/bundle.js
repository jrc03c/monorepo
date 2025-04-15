(() => {
  // node_modules/@jrc03c/js-math-tools/src/is-number.mjs
  function isNumber(x) {
    return typeof x === "number" && !isNaN(x) || typeof x === "bigint";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-browser.mjs
  var isBrowser = new Function(
    `
    try {
      return this === window
    } catch(e) {}

    try {
      return !!importScripts
    } catch(e){}

    return false
  `
  );

  // node_modules/@jrc03c/js-math-tools/src/math-error.mjs
  var MathError = class extends Error {
    constructor(message) {
      if (isBrowser()) {
        super(message);
      } else {
        super("\n\n\x1B[31m" + message + "\n\x1B[0m");
      }
    }
  };

  // node_modules/@jrc03c/js-math-tools/src/assert.mjs
  function assert(isTrue, message) {
    if (!isTrue) throw new MathError(message);
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/array-types.mjs
  var arrayTypes = [
    Array,
    ArrayBuffer,
    BigInt64Array,
    BigUint64Array,
    Float32Array,
    Float64Array,
    Int16Array,
    Int32Array,
    Int8Array,
    Uint16Array,
    Uint32Array,
    Uint8Array,
    Uint8ClampedArray
  ];

  // node_modules/@jrc03c/js-math-tools/src/is-undefined.mjs
  function isUndefined(x) {
    return x === null || typeof x === "undefined";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-array.mjs
  var typeStrings = arrayTypes.map((s2) => s2.name);
  function isArray(obj) {
    try {
      if (obj instanceof Array) {
        return true;
      }
      if (!isUndefined(obj.constructor)) {
        return arrayTypes.indexOf(obj.constructor) > -1 || typeStrings.indexOf(obj.constructor.name) > -1;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-dataframe.mjs
  function isDataFrame(x) {
    try {
      return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/dataframe");
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-function.mjs
  function isFunction(fn) {
    return typeof fn === "function";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-object.mjs
  function isObject(x) {
    return typeof x === "object" && !isUndefined(x) && !isArray(x);
  }

  // node_modules/@jrc03c/js-math-tools/src/is-series.mjs
  function isSeries(x) {
    try {
      return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series");
    } catch (e) {
      return false;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/index-of.mjs
  function indexOf(x, fn) {
    if (isDataFrame(x)) {
      const index = indexOf(x.values, fn);
      if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
        index[0] = x.index[index[0]];
      }
      if (index.length > 1 && isNumber(index[1]) && index[1] >= 0 && index[1] < x.columns.length) {
        index[1] = x.columns[index[1]];
      }
      return index;
    }
    if (isSeries(x)) {
      const index = indexOf(x.values, fn);
      if (index.length > 0 && isNumber(index[0]) && index[0] >= 0 && index[0] < x.index.length) {
        index[0] = x.index[index[0]];
      }
      return index;
    }
    assert(
      isObject(x) || isArray(x),
      "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `indexOf` function!"
    );
    if (!isFunction(fn)) {
      const value = fn;
      fn = (v) => v === value;
    }
    function helper5(x2, fn2, checked) {
      checked = checked || [];
      if (checked.indexOf(x2) > -1) {
        return null;
      }
      if (isObject(x2)) {
        checked.push(x2);
        const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const value = x2[key];
          if (fn2(value)) {
            return [key];
          }
          const results = helper5(value, fn2, checked);
          if (results && results.length > 0) {
            return [key].concat(results);
          }
        }
      } else if (isArray(x2)) {
        checked.push(x2);
        for (let i = 0; i < x2.length; i++) {
          const value = x2[i];
          if (fn2(value)) {
            return [i];
          }
          const results = helper5(value, fn2, checked);
          if (results && results.length > 0) {
            return [i].concat(results);
          }
        }
      } else {
        if (fn2(x2)) {
          return [];
        }
      }
      return null;
    }
    function safeFn(v) {
      try {
        return fn(v);
      } catch (e) {
        return false;
      }
    }
    const paths = helper5(x, safeFn);
    if (paths && paths.length > 0) {
      return paths;
    } else {
      return null;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/copy.mjs
  function copy(x) {
    function helper5(x2) {
      if (typeof x2 === "object") {
        if (x2 === null) {
          return null;
        }
        if (isArray(x2)) {
          if (!(x2 instanceof Array)) {
            return x2.slice();
          }
          return x2.map((v) => copy(v));
        }
        if (isSeries(x2)) {
          const out2 = x2.copy();
          out2.values = copy(out2.values);
          return out2;
        }
        if (isDataFrame(x2)) {
          const out2 = x2.copy();
          out2.values = copy(x2.values);
          return out2;
        }
        if (x2 instanceof Date) {
          return new Date(x2.getTime());
        }
        x2 = decycle(x2);
        const out = {};
        Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
          out[key] = copy(x2[key]);
        });
        return out;
      } else {
        return x2;
      }
    }
    return helper5(decycle(x));
  }
  function decycle(x) {
    function helper5(x2, checked, currentPath) {
      checked = checked || [];
      currentPath = currentPath || "";
      if (checked.indexOf(x2) > -1) {
        const parts = currentPath.split("/").slice(currentPath.startsWith("/") ? 1 : 0);
        const isANestedCopy = parts.some((v, i) => {
          const subParts = parts.slice(0, parts.length - i - 1);
          let temp = orig;
          subParts.forEach((part) => {
            temp = temp[part];
          });
          return temp === x2;
        });
        if (isANestedCopy) {
          const pathToCopy = orig === x2 ? "/" : "/" + indexOf(orig, x2).join("/");
          return `<reference to "${pathToCopy}">`;
        }
      }
      if (typeof x2 === "object") {
        if (x2 === null) return null;
        checked.push(x2);
        if (isArray(x2)) {
          if (typeof x2.constructor !== "undefined" && x2.constructor.name !== "Array") {
            return x2.slice();
          }
          return x2.map((v, i) => helper5(v, checked, currentPath + "/" + i));
        } else {
          Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
            x2[key] = helper5(x2[key], checked, currentPath + "/" + key.toString());
          });
          return x2;
        }
      } else {
        return x2;
      }
    }
    const orig = x;
    let out = helper5(orig);
    if (isDataFrame(x)) {
      const temp = x.copy();
      temp._values = out.values;
      temp._columns = out.columns;
      temp._index = out.index;
      out = temp;
    }
    if (isSeries(x)) {
      const temp = x.copy();
      temp.name = out.name;
      temp._values = out.values;
      temp._index = out.index;
      out = temp;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/is-date.mjs
  function isDate(x) {
    return x instanceof Date && x.toString() !== "Invalid Date";
  }

  // node_modules/@jrc03c/js-math-tools/src/is-equal.mjs
  var numberTypes = ["number", "int", "float", "bigint"];
  function isEqual(a, b) {
    function helper5(a2, b2) {
      const aType = typeof a2;
      const bType = typeof b2;
      if (aType !== bType && !numberTypes.includes(aType) && !numberTypes.includes(bType))
        return false;
      if (aType === "undefined" && bType === "undefined") return true;
      if (aType === "boolean") return a2 === b2;
      if (aType === "symbol") return a2 === b2;
      if (aType === "number" || aType === "bigint") {
        try {
          const aString = a2.toString();
          const bString = b2.toString();
          return aString === bString;
        } catch (e) {
          return false;
        }
      }
      if (aType === "string") return a2 === b2;
      if (aType === "function") return a2 === b2;
      if (aType === "object") {
        if (a2 === null || b2 === null) {
          return a2 === null && b2 === null;
        } else {
          if (isDate(a2)) {
            if (isDate(b2)) {
              return a2.getTime() === b2.getTime();
            } else {
              return false;
            }
          } else if (isDate(b2)) {
            return false;
          }
          if (a2 instanceof RegExp && b2 instanceof RegExp) {
            return a2.toString() === b2.toString();
          }
          if (isArray(a2) !== isArray(b2)) {
            return false;
          }
          const aKeys = Object.keys(a2).concat(Object.getOwnPropertySymbols(a2));
          const bKeys = Object.keys(b2).concat(Object.getOwnPropertySymbols(b2));
          if (aKeys.length !== bKeys.length) return false;
          for (let i = 0; i < aKeys.length; i++) {
            const key = aKeys[i];
            if (!helper5(a2[key], b2[key])) return false;
          }
          return true;
        }
      }
    }
    try {
      return helper5(a, b);
    } catch (e) {
      return helper5(decycle(a), decycle(b));
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/counter.mjs
  function makeKey(n) {
    const alpha = "abcdefg1234567890";
    let out = "";
    while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)];
    return out;
  }
  var NULL_KEY = makeKey(16);
  var UNDEFINED_KEY = makeKey(16);
  var INFINITY_KEY = makeKey(16);
  var MINUS_INFINITY_KEY = makeKey(16);
  var SYMBOL_KEY = makeKey(16);
  var Counter = class {
    constructor() {
      this.clear();
    }
    get counts() {
      return this.values.map((v) => this.get(v));
    }
    get values() {
      return Object.values(this.valuesDict);
    }
    clear() {
      this.countsDict = {};
      this.valuesDict = {};
      return this;
    }
    count(x) {
      for (const v of x) {
        if (isArray(v)) {
          this.count(v);
        } else {
          this.increment(v);
        }
      }
      return this;
    }
    delete(value) {
      const key = this.getStandardizedKey(value);
      delete this.countsDict[key];
      delete this.valuesDict[key];
      return this;
    }
    get(value) {
      return this.countsDict[this.getStandardizedKey(value)] || 0;
    }
    getStandardizedKey(value) {
      return typeof value === "object" && value === null ? NULL_KEY : isUndefined(value) ? UNDEFINED_KEY : isFunction(value) ? value.toString() : typeof value === "symbol" ? value.toString() + " - " + SYMBOL_KEY : value === Infinity ? INFINITY_KEY : value === -Infinity ? MINUS_INFINITY_KEY : typeof value === "bigint" ? value.toString() : isDataFrame(value) ? value.toJSONString() : isSeries(value) ? JSON.stringify(value.toObject()) : JSON.stringify(value);
    }
    has(value) {
      return !isUndefined(this.countsDict[this.getStandardizedKey(value)]);
    }
    increment(value) {
      return this.set(value, this.get(value) + 1);
    }
    set(value, count2) {
      const key = this.getStandardizedKey(value);
      this.countsDict[key] = count2;
      this.valuesDict[key] = value;
      return this;
    }
    toArray() {
      return this.values.map((v) => ({ value: v, count: this.get(v) }));
    }
    toObject() {
      const out = {};
      this.values.forEach((value) => {
        out[value] = this.get(value);
      });
      return out;
    }
  };

  // node_modules/@jrc03c/js-math-tools/src/flatten.mjs
  function flatten(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return flatten(arr.values);
    }
    assert(
      isArray(arr),
      "The `flatten` function only works on arrays, Series, and DataFrames!"
    );
    function helper5(arr2) {
      let out = [];
      arr2.forEach((child) => {
        if (isArray(child)) {
          out = out.concat(helper5(child));
        } else {
          out.push(child);
        }
      });
      return out;
    }
    return helper5(arr);
  }

  // node_modules/@jrc03c/js-math-tools/src/stats.mjs
  function stats(x, options) {
    options = options || {};
    const counts = new Counter();
    const out = {};
    const xflat = flatten(x);
    const xnums = [];
    let max2 = -Infinity;
    let min2 = Infinity;
    let resultsShouldIncludeBigInts = false;
    let sum2 = 0;
    for (const v of xflat) {
      if (typeof v === "bigint") {
        resultsShouldIncludeBigInts = true;
      }
      if (!options.shouldDropNaNs || isNumber(v)) {
        try {
          if (v > max2) {
            max2 = v;
          }
          if (v < min2) {
            min2 = v;
          }
          sum2 += Number(v);
          xnums.push(v);
        } catch (e) {
          max2 = NaN;
          min2 = NaN;
          sum2 = NaN;
        }
      }
      counts.increment(v);
    }
    const mean2 = sum2 / xnums.length;
    out.counts = counts;
    out.max = max2;
    out.mean = mean2;
    out.min = min2;
    out.n = xflat.length;
    out.sum = sum2;
    if (isNaN(out.mean)) {
      out.max = NaN;
      out.min = NaN;
    }
    if (options.shouldDropNaNs) {
      out.nWithoutNaNs = xnums.length;
    }
    if (options.mode) {
      const sortedCountPairs = Array.from(
        counts.values.map((v) => [v, counts.get(v)])
      ).toSorted((a, b) => b[1] - a[1]);
      const highestCount = sortedCountPairs[0][1];
      const mode2 = [];
      for (const pair of sortedCountPairs) {
        if (pair[1] == highestCount) {
          mode2.push(pair[0]);
        } else {
          break;
        }
      }
      out.mode = mode2.toSorted();
    }
    if (options.median) {
      if (isNaN(mean2)) {
        out.median = NaN;
      } else {
        const xnumsSorted = xnums.toSorted((a, b) => Number(a) - Number(b));
        const middle = Math.floor(xnumsSorted.length / 2);
        if (xnumsSorted.length % 2 === 0) {
          const left = xnumsSorted[middle - 1];
          const right = xnumsSorted[middle];
          out.median = (Number(left) + Number(right)) / 2;
          if (resultsShouldIncludeBigInts && typeof left === "bigint" && typeof right === "bigint") {
            try {
              out.median = BigInt(out.median);
            } catch (e) {
            }
          }
        } else {
          out.median = xnumsSorted[middle];
        }
      }
    }
    if (options.stdev || options.variance) {
      let variance2 = 0;
      for (const v of xnums) {
        variance2 += Math.pow(Number(v) - mean2, 2);
      }
      variance2 /= xnums.length;
      const stdev2 = Math.sqrt(variance2);
      out.stdev = stdev2;
      out.variance = variance2;
    }
    if (resultsShouldIncludeBigInts) {
      try {
        out.sum = BigInt(out.sum);
      } catch (e) {
      }
      try {
        out.mean = BigInt(out.mean);
      } catch (e) {
      }
      if (options.mode) {
        out.mode = out.mode.map((v) => {
          try {
            return BigInt(v);
          } catch (e) {
            return v;
          }
        });
      }
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/count.mjs
  function count(arr, matcher) {
    const { counts } = stats(arr);
    if (!isUndefined(matcher)) {
      if (isFunction(matcher)) {
        counts.values.forEach((v) => {
          if (!matcher(v)) {
            counts.delete(v);
          }
        });
      } else {
        counts.values.forEach((v) => {
          if (!isEqual(v, matcher)) {
            counts.delete(v);
          }
        });
      }
    }
    return counts;
  }

  // node_modules/@jrc03c/js-math-tools/src/is-jagged.mjs
  function helper(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return helper(x.values);
    }
    if (isArray(x)) {
      let hasArrayValues = false;
      let hasNonArrayValues = false;
      let arrayLength = null;
      for (const v of x) {
        if (helper(v)) {
          return true;
        }
        if (isArray(v)) {
          if (arrayLength === null) {
            arrayLength = v.length;
          } else if (v.length !== arrayLength) {
            return true;
          }
          hasArrayValues = true;
        } else {
          hasNonArrayValues = true;
        }
        if (hasArrayValues && hasNonArrayValues) {
          return true;
        }
      }
    }
    return false;
  }
  function isJagged(x) {
    return helper(decycle(x));
  }

  // node_modules/@jrc03c/js-math-tools/src/is-nested.mjs
  function isNested(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return isNested(x.values);
    }
    assert(
      isArray(x),
      "The `isNested` function only works on arrays, Series, and DataFrames!"
    );
    for (let i = 0; i < x.length; i++) {
      if (isArray(x[i])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/@jrc03c/js-math-tools/src/ndarray.mjs
  var error = "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!";
  function ndarray(shape2) {
    assert(!isUndefined(shape2), error);
    if (!isArray(shape2)) shape2 = [shape2];
    assert(!isNested(shape2), error);
    assert(shape2.length > 0, error);
    let s2 = shape2[0];
    if (typeof s2 === "bigint") s2 = Number(s2);
    assert(isNumber(s2), error);
    assert(s2 >= 0, error);
    assert(Math.floor(s2) === s2, error);
    assert(
      s2 !== Infinity,
      "We can't create an array containing an infinite number of values!"
    );
    if (shape2.length === 1) {
      const out = [];
      for (let i = 0; i < s2; i++) out.push(void 0);
      return out;
    } else {
      const out = [];
      for (let i = 0; i < s2; i++) {
        out.push(ndarray(shape2.slice(1)));
      }
      return out;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/reverse.mjs
  function reverse(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      const out2 = arr.copy();
      out2.values = reverse(out2.values);
      out2.index = reverse(out2.index);
      return out2;
    }
    assert(
      isArray(arr),
      "The `reverse` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/range.mjs
  function range(a, b, step = 1) {
    assert(
      !isUndefined(a) && !isUndefined(b) && !isUndefined(step),
      "You must pass two numbers and optionally a step value to the `range` function!"
    );
    assert(
      isNumber(a) && isNumber(b) && isNumber(step),
      "You must pass two numbers and optionally a step value to the `range` function!"
    );
    assert(
      step > 0,
      "The step value must be greater than 0! (NOTE: The step value is a magnitude; it does not indicate direction.)"
    );
    let shouldReverse = false;
    const shouldIncludeBigInts = typeof a === "bigint" || typeof b === "bigint" || typeof step === "bigint";
    a = Number(a);
    b = Number(b);
    step = Number(step);
    if (a > b) {
      shouldReverse = true;
      const buffer = a;
      a = b + step;
      b = buffer + step;
    }
    let out = [];
    for (let i = a; i < b; i += step) {
      if (shouldIncludeBigInts) {
        try {
          out.push(BigInt(i));
        } catch (e) {
          out.push(i);
        }
      } else {
        out.push(i);
      }
    }
    if (shouldReverse) out = reverse(out);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/set.mjs
  function makeKey2(n) {
    const alpha = "abcdefg1234567890";
    let out = "";
    while (out.length < n) out += alpha[Math.floor(Math.random() * alpha.length)];
    return out;
  }
  var NULL_KEY2 = makeKey2(256);
  var UNDEFINED_KEY2 = makeKey2(256);
  var INFINITY_KEY2 = makeKey2(256);
  var MINUS_INFINITY_KEY2 = makeKey2(256);
  var SYMBOL_KEY2 = makeKey2(256);
  function set(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return set(arr.values);
    }
    assert(
      isArray(arr),
      "The `set` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    const temp = {};
    flatten(arr).forEach((item) => {
      const key = typeof item === "object" && item === null ? NULL_KEY2 : isUndefined(item) ? UNDEFINED_KEY2 : isFunction(item) ? item.toString() : typeof item === "symbol" ? item.toString() + " - " + SYMBOL_KEY2 : item === Infinity ? INFINITY_KEY2 : item === -Infinity ? MINUS_INFINITY_KEY2 : typeof item === "bigint" ? item.toString() : isDataFrame(item) ? item.toJSONString() : isSeries(item) ? JSON.stringify(item.toObject()) : JSON.stringify(item);
      if (!temp[key]) out.push(item);
      temp[key] = true;
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/shape.mjs
  function helper2(x) {
    if (isArray(x)) {
      const childShapes = helper2(x[0]);
      return [x.length].concat(childShapes || []);
    } else {
      return void 0;
    }
  }
  function shape(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return shape(x.values);
    }
    assert(
      isArray(x),
      "The `shape` function only works on arrays, Series, and DataFrames!"
    );
    return helper2(x);
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.mjs
  function dfAppend(df, x, axis) {
    if (isUndefined(axis)) {
      axis = 0;
    }
    assert(
      axis === 0 || axis === 1 || axis === "vertical" || axis === "horizontal",
      'The only valid axis values for use when appending data to a DataFrame are 0, 1, "vertical", and "horizontal". Note that 0 == "horizontal" and 1 == "vertical".'
    );
    if (isArray(x)) {
      assert(
        !isJagged(x),
        "The array of data you're trying to append to this DataFrame is jagged!"
      );
      const xShape = shape(x);
      if (xShape.length === 1) {
        if (axis === 0) {
          const out = df.copy();
          out._values.push(x);
          const maxRowLength = Math.max(df.shape[1], xShape[0]);
          out._values.forEach((row) => {
            while (row.length < maxRowLength) {
              row.push(void 0);
            }
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        } else {
          const maxColLength = Math.max(df.shape[0], xShape[0]);
          const out = df.copy();
          range(0, maxColLength).forEach((i) => {
            if (i >= out._values.length) {
              out._values.push(ndarray(df.shape[1]));
            }
            out._values[i].push(x[i]);
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < out._values[0].length) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        }
      } else if (xShape.length === 2) {
        if (axis === 0) {
          const maxRowLength = Math.max(
            ...x.map((row) => row.length).concat([df.shape[1]])
          );
          const out = df.copy();
          out._values = out._values.concat(x).map((row) => {
            while (row.length < maxRowLength) {
              row.push(void 0);
            }
            return row;
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        } else {
          const maxRowLength = Math.max(...x.map((row) => row.length)) + df.shape[1];
          const maxColLength = Math.max(df.shape[0], xShape[0]);
          const out = df.copy();
          range(0, maxColLength).forEach((i) => {
            if (i >= out._values.length) {
              out._values.push(ndarray(df.shape[1]));
            }
            out._values[i] = out._values[i].concat(x[i]);
            while (out._values[i].length < maxRowLength) {
              out._values[i].push(void 0);
            }
          });
          while (out._index.length < out._values.length) {
            out._index.push("row" + out._index.length);
          }
          while (out._columns.length < maxRowLength) {
            out._columns.push("col" + out._columns.length);
          }
          return out;
        }
      } else {
        throw new MathError(
          "Only 1- and 2-dimensional arrays can be appended to a DataFrame!"
        );
      }
    } else if (isSeries(x)) {
      const out = dfAppend(df, x.values, axis);
      if (axis === 0) {
        out.index[out.index.length - 1] = out.index.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
      } else {
        out.columns[out.columns.length - 1] = out.columns.indexOf(x.name) > -1 ? x.name + " (2)" : x.name;
      }
      return out;
    } else if (isDataFrame(x)) {
      if (axis === 0) {
        const out = df.copy();
        const maxRowLength = set(out._columns.concat(x._columns)).length;
        out._values.forEach((row) => {
          while (row.length < maxRowLength) {
            row.push(void 0);
          }
        });
        x.apply((row) => {
          const rowCopy = row.copy();
          const temp = [];
          out._columns.forEach((col) => {
            const index = rowCopy._index.indexOf(col);
            if (index > -1) {
              temp.push(rowCopy._values[index]);
              rowCopy._values.splice(index, 1);
              rowCopy._index.splice(index, 1);
            } else {
              temp.push(void 0);
            }
          });
          out._values.push(temp.concat(rowCopy._values));
        }, 1);
        out._columns = out._columns.concat(
          x._columns.filter((c) => out._columns.indexOf(c) < 0)
        );
        while (out._index.length < out._values.length) {
          const newRowName = "row" + out._index.length;
          out._index.push(
            newRowName + (df._index.indexOf(newRowName) > -1 ? " (2)" : "")
          );
        }
        return out;
      } else {
        const out = df.copy();
        out._index.forEach((rowName, i) => {
          const xIndex = x._index.indexOf(rowName);
          if (xIndex > -1) {
            out._values[i] = out._values[i].concat(x._values[xIndex]);
          } else {
            out._values[i] = out._values[i].concat(ndarray(x.shape[1]));
          }
        });
        x._index.forEach((rowName, i) => {
          const outIndex = out._index.indexOf(rowName);
          if (outIndex < 0) {
            out._index.push(rowName);
            out._values.push(ndarray(out._columns.length).concat(x._values[i]));
          }
        });
        out._columns = out._columns.concat(
          x._columns.map((c) => c + (out._columns.indexOf(c) > -1 ? " (2)" : ""))
        );
        return out;
      }
    } else {
      throw new MathError(
        "Only 1- or 2-dimensional arrays, Series, and DataFrames can be appended to a DataFrame!"
      );
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.mjs
  function dfApply(DataFrame2, Series2, df, fn, axis) {
    axis = axis || 0;
    assert(
      isFunction(fn),
      "The first parameter to the `apply` method must be a function."
    );
    assert(
      axis === 0 || axis === 1,
      "The second parameter to the `apply` method (the `axis`) must be 0 or 1."
    );
    if (axis === 0) {
      const temp = {};
      let shouldReturnADataFrame;
      df.columns.forEach((colName, i) => {
        const series = new Series2(df.values.map((row) => row[i]));
        series.name = colName;
        series.index = df.index;
        const value = fn(series, i, df);
        if (value instanceof Series2) {
          temp[colName] = value.values;
        } else {
          temp[colName] = value;
        }
        if (isUndefined(shouldReturnADataFrame)) {
          shouldReturnADataFrame = value instanceof Series2 || isArray(value);
        }
      });
      if (shouldReturnADataFrame) {
        const out = new DataFrame2(temp);
        out.index = df.index;
        return out;
      } else {
        const out = new Series2(df.columns.map((colName) => temp[colName]));
        out.index = df.columns;
        return out;
      }
    } else if (axis === 1) {
      let shouldReturnADataFrame;
      const temp = df.values.map((row, i) => {
        const series = new Series2(row);
        series.name = df.index[i];
        series.index = df.columns;
        const value = fn(series, i, df);
        if (isUndefined(shouldReturnADataFrame)) {
          shouldReturnADataFrame = value instanceof Series2 || isArray(value);
        }
        if (value instanceof Series2) {
          return value.values;
        } else {
          return value;
        }
      });
      if (shouldReturnADataFrame) {
        const out = new DataFrame2(temp);
        out.index = df.index;
        out.columns = df.columns;
        return out;
      } else {
        const out = new Series2(temp);
        out.index = df.index;
        return out;
      }
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/is-string.mjs
  function isString(s2) {
    return typeof s2 === "string";
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.mjs
  function dfAssign(DataFrame2, Series2, df, p1, p2) {
    const isDataFrame2 = (x) => x instanceof DataFrame2;
    const isSeries2 = (x) => x instanceof Series2;
    if (!isUndefined(p2)) {
      assert(
        isString(p1),
        "If passing two arguments into the `assign` method, then the first argument must be a string name!"
      );
      assert(
        isArray(p2) && !isJagged(p2) && shape(p2).length === 1,
        "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!"
      );
      const out = df.copy();
      if (out.columns.includes(p1)) {
        const index = out.columns.indexOf(p1);
        out.columns[index] = p1;
        out.values.forEach((v, i) => v[index] = p2[i]);
        return out;
      } else {
        out._columns.push(p1);
        out._values.forEach((v, i) => v.push(p2[i]));
        return out;
      }
    } else {
      if (isDataFrame2(p1)) {
        const out = df.copy();
        const outShape = out.shape;
        const p1Shape = p1.shape;
        for (let j = 0; j < p1Shape[1]; j++) {
          const col = p1.columns[j];
          const colNewIndex = out.columns.includes(col) ? out.columns.indexOf(col) : out.columns.length;
          if (!out.columns.includes(col)) {
            out._columns.push(col);
          }
          for (let i = 0; i < outShape[0]; i++) {
            out._values[i][colNewIndex] = p1._values[i][j];
          }
        }
        return out;
      } else if (isSeries2(p1)) {
        return df.assign(p1.name, p1.values);
      } else if (isObject(p1)) {
        return df.assign(new DataFrame2(p1));
      } else {
        throw new MathError(
          "You must pass a DataFrame, Series, or object into the `assign` method!"
        );
      }
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.mjs
  function dfCopy(DataFrame2, df) {
    if (df.isEmpty) return new DataFrame2();
    const out = new DataFrame2(copy(df.values));
    out.columns = df.columns.slice();
    out.index = df.index.slice();
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.mjs
  function dfDrop(DataFrame2, Series2, df, rows, cols) {
    if (isUndefined(rows)) rows = [];
    if (isUndefined(cols)) cols = [];
    if (isString(rows) || isNumber(rows)) rows = [rows];
    if (isString(cols) || isNumber(cols)) cols = [cols];
    assert(
      isArray(rows),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      isArray(cols),
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      shape(rows).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    assert(
      shape(cols).length === 1,
      "The `drop` method only works on 1-dimensional arrays of numerical indices and/or strings."
    );
    let outIndex, outColumns;
    df.index.forEach((row, i) => {
      if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
        if (!outIndex) outIndex = [];
        outIndex.push(row);
      }
    });
    df.columns.forEach((col, i) => {
      if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
        if (!outColumns) outColumns = [];
        outColumns.push(col);
      }
    });
    let out = df.get(outIndex, outColumns);
    if (out instanceof Series2) {
      let temp = new DataFrame2();
      temp = temp.assign(out);
      if (df.index.indexOf(out.name) > -1) temp = temp.transpose();
      out = temp;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-integer.mjs
  function isInteger(x) {
    return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x);
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.mjs
  function isWholeNumber(x) {
    return isInteger(x) && x >= 0;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.mjs
  function dfDropMissing(DataFrame2, Series2, df, axis, condition, threshold) {
    axis = axis || 0;
    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropMissing` method (the `axis`) must be 0 or 1."
    );
    threshold = threshold || 0;
    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropMissing` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` null values)."
    );
    condition = threshold > 0 ? "none" : condition || "any";
    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropMissing` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains null values, then it should be dropped; or that if 'all' of the data contains null values, then it should be dropped)."
    );
    function helper5(values) {
      if (threshold > 0) {
        let count2 = 0;
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (isUndefined(value)) count2++;
          if (count2 >= threshold) return [];
        }
      } else if (condition === "any") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (isUndefined(value)) return [];
        }
      } else if (condition === "all") {
        for (let i = 0; i < values.length; i++) {
          const value = values[i];
          if (!isUndefined(value)) return values;
        }
        return [];
      }
      return values;
    }
    let out = df.copy();
    const tempID = Math.random().toString();
    if (axis === 0) {
      out = out.assign(tempID, out.index);
      const newValues = out.values.map(helper5).filter((row) => row.length > 0);
      if (shape(newValues).length < 2) return new DataFrame2();
      out.values = newValues;
      let newIndex = out.get(null, tempID);
      if (isUndefined(newIndex)) return new DataFrame2();
      if (isString(newIndex)) newIndex = [newIndex];
      if (newIndex instanceof Series2) newIndex = newIndex.values;
      out.index = newIndex;
      out = out.drop(null, tempID);
    } else if (axis === 1) {
      const temp = {};
      out.columns.forEach((colName, i) => {
        const values = out.values.map((row) => row[i]);
        const newValues = helper5(values);
        if (newValues.length > 0) {
          temp[colName] = newValues;
        }
      });
      if (Object.keys(temp).length + Object.getOwnPropertySymbols(temp).length === 0) {
        return new DataFrame2();
      }
      const newOut = new DataFrame2(temp);
      newOut.index = out.index;
      return newOut;
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/drop-nan.mjs
  function dropNaN(x) {
    if (isDataFrame(x) || isSeries(x)) {
      return x.dropNaN(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(x),
      "The `dropNaN` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    x.forEach((v) => {
      try {
        return out.push(dropNaN(v));
      } catch (e) {
        if (isNumber(v)) {
          return out.push(v);
        }
      }
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.mjs
  function dfDropNaN(DataFrame2, df, axis, condition, threshold) {
    axis = axis || 0;
    assert(
      axis === 0 || axis === 1,
      "The first parameter of the `dropNaN` method (the `axis`) must be 0 or 1."
    );
    threshold = threshold || 0;
    assert(
      isWholeNumber(threshold),
      "The third parameter of the `dropNaN` method (the `threshold`) should be a whole number (meaning that data should be dropped if it contains more than `threshold` NaN values)."
    );
    condition = threshold > 0 ? "none" : condition || "any";
    assert(
      condition === "any" || condition === "all" || condition === "none",
      "The second parameter of the `dropNaN` method (the `condition` parameter, which indicates the condition under which data should be dropped) should be 'any' or 'all' (meaning that if 'any' of the data contains NaN values, then it should be dropped; or that if 'all' of the data contains NaN values, then it should be dropped)."
    );
    function helper5(values) {
      const numericalValues = dropNaN(values);
      if (threshold > 0) return values.length - numericalValues.length < threshold;
      if (condition === "any") return numericalValues.length === values.length;
      if (condition === "all") return numericalValues.length > 0;
      return true;
    }
    const out = df.copy();
    if (axis === 0) {
      const rowsToKeep = out.index.filter((row) => {
        const values = out.get(row, null).values;
        return helper5(values);
      });
      if (rowsToKeep.length > 0) return out.get(rowsToKeep, null);
      else return new DataFrame2();
    } else if (axis === 1) {
      const colsToKeep = out.columns.filter((col) => {
        const values = out.get(null, col).values;
        return helper5(values);
      });
      if (colsToKeep.length > 0) return out.get(null, colsToKeep);
      else return new DataFrame2();
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.mjs
  function arrayToObject(x) {
    const out = {};
    flatten(x).forEach((value, i) => {
      out[value] = i;
    });
    return out;
  }
  function undoArrayToObject(obj) {
    return Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)).sort((a, b) => obj[a] - obj[b]);
  }
  function dfFilter(DataFrame2, Series2, df, fn, axis) {
    assert(
      isFunction(fn),
      "The `filter` method takes a single parameter: a function that is used to filter the values."
    );
    if (isUndefined(axis)) axis = 0;
    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `filter` method must be 0 or 1."
    );
    let out = df.copy();
    if (out.isEmpty) return out;
    const index = arrayToObject(out.index);
    const columns = arrayToObject(out.columns);
    if (axis === 0) {
      let count2 = 0;
      const newValues = out.values.filter((row, i) => {
        const series = new Series2(row);
        series.name = df.index[i];
        series.index = df.columns;
        const shouldKeep = fn(series, i, df);
        if (shouldKeep) {
          count2++;
        } else {
          delete index[out.index[i]];
        }
        return shouldKeep;
      });
      if (count2 === 0) {
        return new DataFrame2();
      }
      if (count2 === 1) {
        const temp = new Series2(newValues[0]);
        temp.name = undoArrayToObject(index)[0];
        temp.index = undoArrayToObject(columns);
        return temp;
      }
      out.values = newValues;
      out.index = undoArrayToObject(index);
    } else if (axis === 1) {
      out = out.transpose();
      let count2 = 0;
      const newValues = out.values.filter((row, i) => {
        const series = new Series2(row);
        series.name = df.columns[i];
        series.index = df.index;
        const shouldKeep = fn(series, i, df);
        if (shouldKeep) {
          count2++;
        } else {
          delete columns[out.index[i]];
        }
        return shouldKeep;
      });
      if (count2 === 0) {
        return new DataFrame2();
      }
      if (count2 === 1) {
        const temp = new Series2(newValues[0]);
        temp.name = undoArrayToObject(columns)[0];
        temp.index = undoArrayToObject(index);
        return temp;
      }
      out.values = newValues;
      out.index = undoArrayToObject(columns);
      out = out.transpose();
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.mjs
  function dfGet(df, rows, cols) {
    if (isString(rows) || isNumber(rows)) rows = [rows];
    if (isString(cols) || isNumber(cols)) cols = [cols];
    for (const i in rows) {
      if (typeof rows[i] === "bigint") {
        rows[i] = Number(rows[i]);
      }
    }
    for (const i in cols) {
      if (typeof cols[i] === "bigint") {
        cols[i] = Number(cols[i]);
      }
    }
    const types = set((rows || []).concat(cols || []).map((v) => typeof v));
    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    );
    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (!isUndefined(rows)) {
      rows = rows.map((r) => {
        if (isString(r)) {
          assert(df.index.indexOf(r) > -1, `Row "${r}" does not exist!`);
          return r;
        }
        if (isNumber(r)) {
          assert(r >= 0, `Index ${r} is out of bounds!`);
          assert(Math.floor(r) === r, `Row numbers must be integers!`);
          assert(r < df.index.length, `Index ${r} is out of bounds!`);
          return df.index[r];
        }
      });
    }
    if (!isUndefined(cols)) {
      cols = cols.map((c) => {
        if (isString(c)) {
          assert(df.columns.indexOf(c) > -1, `Column "${c}" does not exist!`);
          return c;
        }
        if (isNumber(c)) {
          assert(c >= 0, `Column ${c} is out of bounds!`);
          assert(Math.floor(c) === c, `Column numbers must be integers!`);
          assert(c < df.columns.length, `Column ${c} is out of bounds!`);
          return df.columns[c];
        }
      });
    }
    return df.getSubsetByNames(rows, cols);
  }

  // node_modules/@jrc03c/js-math-tools/src/sort.mjs
  function alphaSort(a, b) {
    try {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    } catch (e) {
      a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString();
      b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }
  }
  function sort(arr, fn) {
    if (isUndefined(fn)) fn = alphaSort;
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.sort(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(arr),
      "The `sort` function only works on arrays, Series, and DataFrames!"
    );
    assert(
      isFunction(fn),
      "The second parameter of the `sort` function must be a comparison function!"
    );
    const out = arr.slice();
    out.sort(fn);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.mjs
  function camelify(text) {
    const temp = text.toLowerCase();
    let out = "";
    for (let i = 0; i < temp.length; i++) {
      const char = temp[i];
      if (char.match(/[a-z0-9]/g)) {
        out += char;
      } else {
        out += " ";
      }
    }
    const words = out.split(" ").filter((word) => word.length > 0);
    return words[0] + words.slice(1).map((word) => word[0].toUpperCase() + word.substring(1)).join("");
  }
  function dfGetDummies(DataFrame2, df, columns) {
    if (isUndefined(columns)) {
      columns = df.columns;
    } else if (isString(columns)) {
      columns = [columns];
    }
    const temp = {};
    columns.forEach((col) => {
      assert(
        isString(col),
        "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!"
      );
      const colIndex = df.columns.indexOf(col);
      assert(
        colIndex > -1,
        `The given DataFrame does not have a column called "${col}"!`
      );
      const values = df.values.map((row) => row[colIndex]);
      const valuesSet = sort(set(values));
      values.forEach((value) => {
        valuesSet.forEach((orig) => {
          const colName = col + "_" + camelify(orig.toString());
          if (!temp[colName]) {
            temp[colName] = [];
          }
          if (value === orig) {
            temp[colName].push(1);
          } else {
            temp[colName].push(0);
          }
        });
      });
    });
    const out = new DataFrame2(temp);
    out.index = df.index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.mjs
  function dfGetSubsetByIndices(df, rowIndices, colIndices) {
    const dataShape = df.shape;
    if (isUndefined(rowIndices)) rowIndices = range(0, dataShape[0]);
    if (isUndefined(colIndices)) colIndices = range(0, dataShape[1]);
    if (isNumber(rowIndices)) rowIndices = [rowIndices];
    if (isNumber(colIndices)) colIndices = [colIndices];
    assert(
      isArray(rowIndices) && isArray(colIndices),
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    );
    assert(
      shape(rowIndices).length === 1 && shape(colIndices).length === 1,
      "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
    );
    assert(
      rowIndices.length > 0,
      "The `rowIndices` array must contain at least one index."
    );
    assert(
      colIndices.length > 0,
      "The `colIndices` array must contain at least one index."
    );
    rowIndices.forEach((rowIndex) => {
      assert(
        isWholeNumber(rowIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        rowIndex < df.index.length,
        `The row index ${rowIndex} is out of bounds.`
      );
    });
    colIndices.forEach((colIndex) => {
      assert(
        isWholeNumber(colIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        colIndex < df.columns.length,
        `The column index ${colIndex} is out of bounds.`
      );
    });
    const rows = rowIndices.map((i) => df.index[i]);
    const cols = colIndices.map((i) => df.columns[i]);
    return df.getSubsetByNames(rows, cols);
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.mjs
  function dfGetSubsetByNames(DataFrame2, Series2, df, rows, cols) {
    if (isUndefined(rows)) rows = df.index;
    if (isUndefined(cols)) cols = df.columns;
    if (isString(rows)) rows = [rows];
    if (isString(cols)) cols = [cols];
    assert(
      isArray(rows) && isArray(cols),
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    );
    assert(
      shape(rows).length === 1 && shape(cols).length === 1,
      "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
    );
    assert(
      rows.length > 0,
      "The `rows` array must contain at least one row name."
    );
    assert(
      cols.length > 0,
      "The `cols` array must contain at least one column name."
    );
    rows.forEach((row) => {
      assert(
        isString(row),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.index.indexOf(row) > -1,
        `The row name "${row}" does not exist in the list of rows.`
      );
    });
    cols.forEach((col) => {
      assert(
        isString(col),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.columns.indexOf(col) > -1,
        `The column name "${col}" does not exist in the list of columns.`
      );
    });
    const values = rows.map((row) => {
      return cols.map((col) => {
        return df.values[df.index.indexOf(row)][df.columns.indexOf(col)];
      });
    });
    if (rows.length === 1 && cols.length === 1) {
      return values[0][0];
    }
    if (rows.length === 1) {
      const out2 = new Series2(values[0]);
      out2.name = rows[0];
      out2.index = cols;
      return out2;
    }
    if (cols.length === 1) {
      const out2 = new Series2(values.map((v) => v[0]));
      out2.name = cols[0];
      out2.index = rows;
      return out2;
    }
    const out = new DataFrame2(values);
    out.columns = cols;
    out.index = rows;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.mjs
  function dfPrint(DataFrame2, Series2, df) {
    function truncate(s2, maxLength2) {
      if (isString(s2)) {
        if (s2.length > maxLength2) {
          return s2.substring(0, maxLength2 - 3) + "...";
        } else {
          return s2;
        }
      } else {
        return s2;
      }
    }
    if (df.isEmpty) {
      console.table({});
      console.log("Shape:", [0, 0], "\n");
      return df;
    }
    const maxRows = typeof window === "undefined" ? 20 : 10;
    const halfMaxRows = Math.floor(maxRows / 2);
    const maxColumns = 4;
    const halfMaxColumns = Math.floor(maxColumns / 2);
    const tempRows = maxRows > df.index.length ? null : range(0, halfMaxRows).concat(
      range(df.index.length - halfMaxRows, df.index.length)
    );
    const tempColumns = maxColumns > df.columns.length ? null : range(0, halfMaxColumns).concat(
      range(df.columns.length - halfMaxColumns, df.columns.length)
    );
    let temp = df.get(tempRows, tempColumns);
    if (temp instanceof Series2) {
      if (df.shape[0] === 1) {
        temp = new DataFrame2([temp.values]);
        temp.index = df.index;
        temp.columns = new Series2(df.columns).get(tempColumns).values;
      } else if (df.shape[1] === 1) {
        temp = new DataFrame2([temp.values]).transpose();
        temp.index = new Series2(df.index).get(tempRows).values;
        temp.columns = df.columns;
      }
    }
    if (maxRows <= df.index.length) {
      temp._index.splice(halfMaxRows, 0, "...");
      temp._values.splice(
        halfMaxRows,
        0,
        range(0, temp.columns.length).map(() => "...")
      );
    }
    if (maxColumns <= df.columns.length) {
      temp._columns.splice(halfMaxColumns, 0, "...");
      temp._values = temp._values.map((row) => {
        row.splice(halfMaxColumns, 0, "...");
        return row;
      });
    }
    const maxLength = 28;
    if (temp instanceof Series2) {
      temp.values = temp.values.map((value) => truncate(value, maxLength));
      temp.name = truncate(temp.name, maxLength);
      temp.index = temp.index.map((row) => truncate(row, maxLength));
    } else {
      temp.values = temp.values.map((row) => {
        return row.map((value) => truncate(value, maxLength));
      });
      temp.columns = temp.columns.map((col) => truncate(col, maxLength));
      temp.index = temp.index.map((row) => truncate(row, maxLength));
    }
    console.table(temp.toDetailedObject());
    console.log("Shape:", df.shape, "\n");
    return df;
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.mjs
  function leftPad(x, maxLength) {
    assert(isNumber(x), "The `leftPad` function only works on numbers!");
    let out = x.toString();
    while (out.length < maxLength) out = "0" + out;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.mjs
  function dfResetIndex(df, shouldSkipCopying) {
    const out = shouldSkipCopying ? df : df.copy();
    out.index = range(0, df.shape[0]).map((i) => {
      return "row" + leftPad(i, (out.index.length - 1).toString().length);
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/product.mjs
  function product(arr, shouldDropNaNs) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return product(arr.values, shouldDropNaNs);
    }
    assert(
      isArray(arr),
      "The `product` function only works on arrays, Series, and DataFrames!"
    );
    try {
      if (arr.length === 0) return NaN;
      const temp = flatten(arr);
      let resultShouldBeABigInt = false;
      let out = 1;
      for (let v of temp) {
        if (!isNumber(v)) {
          if (shouldDropNaNs) {
            v = 1;
          } else {
            return NaN;
          }
        }
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out *= v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-natural-number.mjs
  function isNaturalNumber(x) {
    return isInteger(x) && x > 0;
  }

  // node_modules/@jrc03c/js-math-tools/src/reshape.mjs
  function reshape(x, newShape) {
    if (isDataFrame(x) || isSeries(x)) {
      return reshape(x.values, newShape);
    }
    assert(
      isArray(x),
      "The first argument passed into the `reshape` function must be an array!"
    );
    if (isNumber(newShape)) newShape = [newShape];
    assert(
      isArray(newShape),
      "The second argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    );
    assert(
      shape(newShape).length === 1,
      "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
    );
    newShape = newShape.map((v) => {
      if (typeof v === "bigint") {
        v = Number(v);
      }
      assert(
        isNaturalNumber(v),
        "The first argument passed into the `reshape` function must be a whole number or a one-dimensional array of whole numbers!"
      );
      return Number(v);
    });
    if (newShape.length === 0) {
      return flatten(x);
    }
    const temp = flatten(x);
    if (newShape.length === 1 && newShape[0] === temp.length) {
      return temp;
    }
    assert(
      product(newShape) === temp.length,
      "The new shape doesn't match the number of values available in `x` (the first argument passed into the `reshape` function)!"
    );
    const out = [];
    const step = Math.floor(temp.length / newShape[0]);
    for (let i = 0; i < newShape[0]; i++) {
      const row = temp.slice(i * step, (i + 1) * step);
      out.push(reshape(row, newShape.slice(1)));
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/random.mjs
  var MAX = Math.pow(2, 64);
  var s = [];
  seed(Math.floor(Math.random() * MAX));
  function splitmix64(state, n) {
    state = uint(state);
    function helper5() {
      state += uint("0x9e3779b97f4a7c15");
      let z = copy(state);
      z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
      z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
      return z ^ z >> BigInt(31);
    }
    const out = [];
    for (let i = 0; i < n; i++) out.push(helper5());
    return out;
  }
  function uint(x) {
    return BigInt.asUintN(64, BigInt(x));
  }
  function rotl(x, k) {
    x = uint(x);
    k = BigInt(k);
    return uint(uint(x << k) | uint(x >> uint(BigInt(64) - k)));
  }
  function seed(val) {
    if (typeof val === "bigint") {
      val = Number(val);
    }
    if (!isUndefined(val)) {
      assert(
        isNumber(val),
        "If passing a value into the `seed` function, then that value must be an integer!"
      );
      const temp = splitmix64(Math.floor(val), 4);
      s[0] = temp[0];
      s[1] = temp[1];
      s[2] = temp[2];
      s[3] = temp[3];
    } else {
      return copy(s);
    }
  }
  function next() {
    const result = uint(rotl(s[0] + s[3], 23) + s[0]);
    const t = uint(s[1] << BigInt(17));
    s[2] = uint(s[2] ^ s[0]);
    s[3] = uint(s[3] ^ s[1]);
    s[1] = uint(s[1] ^ s[2]);
    s[0] = uint(s[0] ^ s[3]);
    s[2] = uint(s[2] ^ t);
    s[3] = rotl(s[3], 45);
    return Math.floor(Number(result)) / MAX;
  }
  function random(shape2) {
    if (isUndefined(shape2)) return next();
    if (!isArray(shape2)) shape2 = [shape2];
    return reshape(ndarray(product(shape2)).map(next), shape2);
  }

  // node_modules/@jrc03c/js-math-tools/src/shuffle.mjs
  function shuffle(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.shuffle(...Object.values(arguments).slice(1));
    }
    assert(
      isArray(arr),
      "The `shuffle` function only works on arrays, Series, and DataFrames!"
    );
    const out = [];
    const temp = arr.slice();
    for (let i = 0; i < arr.length; i++) {
      const index = Math.floor(random() * temp.length);
      out.push(temp.splice(index, 1)[0]);
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.mjs
  function dfShuffle(df, axis) {
    if (isUndefined(axis)) axis = 0;
    assert(
      axis === 0 || axis === 1,
      "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
    );
    return df.get(
      axis === 0 ? shuffle(df.index) : null,
      axis === 1 ? shuffle(df.columns) : null
    );
  }

  // node_modules/@jrc03c/js-math-tools/src/is-boolean.mjs
  function isBoolean(x) {
    return typeof x === "boolean";
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.mjs
  function dfSort(df, a, b) {
    if (isFunction(a)) {
      return dfSortByFunction(df, a, b);
    } else {
      return dfSortByColumns(df, a, b);
    }
  }
  function dfSortByFunction(df, fn, axis) {
    axis = isUndefined(axis) ? 0 : axis;
    assert(
      isFunction(fn),
      "When sorting a DataFrame using a function, the first argument to the `sort` method must be a function!"
    );
    assert(
      isNumber(axis),
      "When sorting a DataFrame using a function, the second argument to the `sort` method must be null, undefined, 0, or 1 to indicate the axis along which the data should be sorted! An axis of 0 means that the rows will be sorted relative to each other, whereas an axis of 1 means that the columns will be sorted relative to each other."
    );
    if (axis === 0) {
      const index = sort(df.index, (a, b) => {
        return fn(df.get(a, null), df.get(b, null));
      });
      return df.get(index, null);
    } else {
      const columns = sort(df.columns, (a, b) => {
        return fn(df.get(null, a), df.get(null, b));
      });
      return df.get(null, columns);
    }
  }
  function dfSortByColumns(df, cols, directions) {
    let out = df.copy();
    const indexID = random().toString();
    out = out.assign(indexID, out.index);
    if (isUndefined(cols)) {
      cols = [indexID];
      directions = [true];
    }
    if (isNumber(cols) || isString(cols)) {
      cols = [cols];
      if (isBoolean(directions) || isString(directions)) directions = [directions];
    }
    assert(
      isArray(cols),
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    );
    assert(
      shape(cols).length === 1,
      "The first parameter of the `sort` method must be (1) a string or index representing a column name or index, respectively; (2) a 1-dimensional array of strings and/or indices; or (3) null."
    );
    if (isUndefined(directions))
      directions = range(0, cols.length).map(() => true);
    assert(
      isArray(directions),
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    );
    assert(
      shape(directions).length === 1,
      "The second parameter of the `sort` method must be (1) a string or boolean representing the sort direction ('ascending' / 'descending', or true / false); (2) a 1-dimensional array of strings and/or booleans; or (3) null."
    );
    assert(
      cols.length === directions.length,
      "The arrays passed into the `sort` method must be equal in length."
    );
    cols = cols.map((col) => {
      assert(
        isString(col) || isNumber(col),
        "Column references can either be column names (as strings) or column indices (as whole numbers)."
      );
      if (isString(col)) {
        const index = out.columns.indexOf(col);
        assert(index > -1, `The column "${col}" does not exist!`);
        return index;
      }
      if (isNumber(col)) {
        assert(isWholeNumber(col), "Column indices must be whole numbers!");
        assert(col < out.columns.length, `The index ${col} is out of bounds!`);
        return col;
      }
    });
    directions = directions.map((dir) => {
      assert(
        isString(dir) || isBoolean(dir),
        "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
      );
      if (isString(dir)) {
        const value = dir.trim().toLowerCase();
        assert(
          value === "ascending" || value === "descending",
          "Direction references can either be strings ('ascending' or 'descending') or booleans (true or false)."
        );
        return value === "ascending";
      }
      if (isBoolean(dir)) {
        return dir;
      }
    });
    out.values = sort(out.values, (a, b) => {
      let counter = 0;
      while (a[cols[counter]] === b[cols[counter]] && counter < cols.length) {
        counter++;
      }
      const isAscending = directions[counter];
      if (a[cols[counter]] === b[cols[counter]]) return 0;
      if (a[cols[counter]] < b[cols[counter]]) return isAscending ? -1 : 1;
      if (a[cols[counter]] > b[cols[counter]]) return isAscending ? 1 : -1;
    });
    const indexNumber = out.columns.indexOf(indexID);
    out.index = out.values.map((row) => row[indexNumber]);
    out = out.dropColumns(indexID);
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-detailed-object.mjs
  function dfToDetailedObject(df, axis) {
    if (isUndefined(axis)) {
      axis = 0;
    } else {
      assert(
        axis === 0 || axis === 1,
        "The axis parameter of the `toDetailedObject` method must be undefined, 0, or 1. An axis of 0 indicates that the returned object should be organized first by rows and then by columns. An axis of 1 indicates that the returned object should be organized first by columns and then by rows."
      );
    }
    const out = {};
    if (axis === 0) {
      df.index.forEach((rowName, i) => {
        const temp = {};
        df.columns.forEach((colName, j) => {
          temp[colName] = df.values[i][j];
        });
        out[rowName] = temp;
      });
    } else {
      df.columns.forEach((colName, j) => {
        const temp = {};
        df.index.forEach((rowName, i) => {
          temp[rowName] = df.values[i][j];
        });
        out[colName] = temp;
      });
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.mjs
  function dfToJSONString(df, axis) {
    return JSON.stringify(df.toObject(axis));
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.mjs
  async function dfToJSON(df, axis) {
    return JSON.parse(dfToJSONString(df, axis));
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.mjs
  function dfToObject(df) {
    const out = {};
    df.columns.forEach((col) => {
      out[col] = df.get(col).values;
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/transpose.mjs
  function transpose(arr) {
    if (isDataFrame(arr) || isSeries(arr)) {
      return arr.transpose();
    }
    assert(
      isArray(arr),
      "The `transpose` function only works on arrays, Series, and DataFrames!"
    );
    const theShape = shape(arr);
    assert(
      theShape.length <= 2,
      "I'm not smart enough to know how to transpose arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `transpose` function!"
    );
    if (theShape.length === 1) {
      return reverse(arr);
    } else if (theShape.length === 2) {
      const out = ndarray(reverse(theShape));
      for (let row = 0; row < theShape[0]; row++) {
        for (let col = 0; col < theShape[1]; col++) {
          out[col][row] = arr[row][col];
        }
      }
      return out;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-append.mjs
  function seriesAppend(Series2, series, x) {
    if (isSeries(x)) {
      return new Series2(series.values.concat(x.values));
    }
    if (isArray(x)) {
      const xShape = shape(x);
      assert(
        xShape.length === 1 && !isNested(xShape),
        "Only vectors can be appended to Series!"
      );
      const out = series.copy();
      x.forEach((v, i) => {
        out._values.push(v);
        out._index.push("item" + (series.values.length + i));
      });
      return out;
    }
    return seriesAppend(series, [x]);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-apply.mjs
  function seriesApply(series, fn) {
    assert(
      isFunction(fn),
      "The parameter to the `apply` method must be a function."
    );
    const out = series.copy();
    out._values = out._values.map((v, i) => fn(v, i));
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.mjs
  function seriesDropMissing(series) {
    const out = series.copy();
    const outIndex = [];
    out._values = out.values.filter((v, i) => {
      if (isUndefined(v)) {
        return false;
      } else {
        outIndex.push(out.index[i]);
        return true;
      }
    });
    out._index = outIndex;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.mjs
  function seriesDropNaN(Series2, series) {
    const index = [];
    const values = [];
    series.values.forEach((value, i) => {
      if (isNumber(value)) {
        values.push(value);
        index.push(series.index[i]);
      }
    });
    const out = new Series2(values);
    out.name = series.name;
    out.index = index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-filter.mjs
  function seriesFilter(Series2, series, fn) {
    let out = series.copy();
    const index = copy(out.index);
    const indicesToRemove = [];
    const newValues = out.values.filter((value, i) => {
      const shouldKeep = fn(value, i, out.values);
      if (!shouldKeep) indicesToRemove.push(out.index[i]);
      return shouldKeep;
    });
    indicesToRemove.forEach((i) => {
      index.splice(index.indexOf(i), 1);
    });
    if (newValues.length === 0) {
      out = new Series2();
      out.name = series.name;
      return out;
    }
    out.values = newValues;
    out.index = index;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get.mjs
  function seriesGet(series, indices) {
    if (isString(indices) || isNumber(indices)) indices = [indices];
    for (const i in indices) {
      if (typeof indices[i] === "bigint") {
        indices[i] = Number(indices[i]);
      }
    }
    const types = set((indices || []).map((v) => typeof v));
    assert(
      types.length <= 2,
      "Only whole numbers and/or strings are allowed in `get` arrays!"
    );
    if (types.length === 1) {
      assert(
        types[0] === "string" || types[0] === "number",
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (types.length === 2) {
      assert(
        types.indexOf("string") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
      assert(
        types.indexOf("number") > -1,
        "Only whole numbers and/or strings are allowed in `get` arrays!"
      );
    }
    if (!isUndefined(indices)) {
      indices = indices.map((i) => {
        if (typeof i === "string") {
          assert(series.index.indexOf(i) > -1, `Index "${i}" does not exist!`);
          return i;
        }
        if (typeof i === "number") {
          assert(i >= 0, `Index ${i} is out of bounds!`);
          assert(Math.floor(i) === i, `Indices must be integers!`);
          assert(i < series.index.length, `Index ${i} is out of bounds!`);
          return series.index[i];
        }
      });
    }
    return series.getSubsetByNames(indices);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.mjs
  function seriesGetSubsetByIndices(series, indices) {
    const dataShape = series.shape;
    if (isUndefined(indices)) indices = range(0, dataShape[0]);
    assert(
      isArray(indices),
      "The `indices` array must be 1-dimensional array of whole numbers."
    );
    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of whole numbers."
    );
    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index."
    );
    indices.forEach((index) => {
      assert(
        isWholeNumber(index),
        "The `indices` array must be a 1-dimensional array of whole numbers."
      );
      assert(
        index < series.index.length,
        `The row index ${index} is out of bounds.`
      );
    });
    const rows = indices.map((i) => series.index[i]);
    return series.getSubsetByNames(rows);
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.mjs
  function seriesGetSubsetByNames(Series2, series, indices) {
    if (isUndefined(indices)) indices = series.index;
    assert(
      isArray(indices),
      "The `indices` array must be a 1-dimensional array of strings."
    );
    assert(
      shape(indices).length === 1,
      "The `indices` array must be a 1-dimensional array of strings."
    );
    assert(
      indices.length > 0,
      "The `indices` array must contain at least one index name."
    );
    indices.forEach((name) => {
      assert(isString(name), "The `indices` array must contain only strings.");
      assert(
        series.index.indexOf(name) > -1,
        `The name "${name}" does not exist in the index.`
      );
    });
    const values = indices.map((name) => {
      return series.values[series.index.indexOf(name)];
    });
    if (values.length === 1) return values[0];
    const out = new Series2(values);
    out.index = indices;
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-print.mjs
  function seriesPrint(series) {
    let temp = series.copy();
    const maxRows = typeof window === "undefined" ? 20 : 10;
    if (temp.index.length > maxRows) {
      temp = temp.get(
        range(0, maxRows / 2).concat(
          range(temp.index.length - maxRows / 2, temp.index.length)
        )
      );
      const tempIndex = copy(temp.index);
      tempIndex.splice(Math.floor(tempIndex.length / 2), 0, "...");
      temp.values.push("...");
      temp.index.push("...");
      temp = temp.get(tempIndex);
    }
    const out = {};
    temp.values.forEach((value, i) => {
      const obj = {};
      obj[temp.name] = value;
      out[temp.index[i]] = obj;
    });
    console.table(out);
    console.log("Shape:", series.shape, "\n");
    return series;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.mjs
  function seriesShuffle(series) {
    const out = series.copy();
    return out.get(shuffle(out.index));
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort.mjs
  function seriesSort(Series2, series, fn) {
    fn = fn || ((a, b) => a < b ? -1 : 1);
    assert(
      isUndefined(fn) || isFunction(fn),
      "You must pass undefined, null, or a comparison function as the second argument to the `sort` method!"
    );
    const pairs = transpose([series.values, series.index]);
    const temp = sort(pairs, (aPair, bPair) => {
      return fn(aPair[0], bPair[0]);
    });
    const newValues = [];
    const newIndex = [];
    temp.forEach((pair) => {
      newValues.push(pair[0]);
      newIndex.push(pair[1]);
    });
    const out = new Series2();
    out._values = newValues;
    out._index = newIndex;
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.mjs
  function seriesSortByIndex(Series2, series) {
    let temp = transpose([series.values, series.index]);
    temp = transpose(
      sort(temp, (a, b) => {
        if (a[1] === b[1]) return 0;
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return 1;
      })
    );
    const out = new Series2(temp[0]);
    out.index = temp[1];
    out.name = series.name;
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-to-object.mjs
  function seriesToObject(series) {
    const out = {};
    out[series.name] = {};
    series.index.forEach((index, i) => {
      out[series.name][index] = series.values[i];
    });
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/index.mjs
  var SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series");
  function createSeriesClass(DataFrame2) {
    class Series2 {
      static [Symbol.hasInstance](x) {
        try {
          return !!x._symbol && x._symbol === SERIES_SYMBOL;
        } catch (e) {
          return false;
        }
      }
      constructor(data) {
        this.name = "data";
        Object.defineProperty(this, "_symbol", {
          configurable: false,
          enumerable: false,
          writable: false,
          value: SERIES_SYMBOL
        });
        Object.defineProperty(this, "_values", {
          value: [],
          configurable: true,
          enumerable: false,
          writable: true
        });
        Object.defineProperty(this, "values", {
          configurable: true,
          enumerable: true,
          get() {
            return this._values;
          },
          set(x) {
            assert(isArray(x), "The new values must be a 1-dimensional array!");
            const dataShape = shape(x);
            assert(
              dataShape.length === 1,
              "The new array of values must be 1-dimensional!"
            );
            if (dataShape[0] < this._index.length) {
              this._index = this._index.slice(0, dataShape[0]);
            } else if (dataShape[0] > this._index.length) {
              this._index = this._index.concat(
                range(this._index.length, dataShape[0]).map((i) => {
                  return "item" + leftPad(i, (x.length - 1).toString().length);
                })
              );
            }
            this._values = x;
          }
        });
        Object.defineProperty(this, "_index", {
          value: [],
          configurable: true,
          enumerable: false,
          writable: true
        });
        Object.defineProperty(this, "index", {
          configurable: true,
          enumerable: true,
          get() {
            return this._index;
          },
          set(x) {
            assert(
              isArray(x),
              "The new index must be a 1-dimensional array of strings!"
            );
            assert(
              x.length === this.shape[0],
              "The new index must be the same length as the old index!"
            );
            assert(
              shape(x).length === 1,
              "The new index must be a 1-dimensional array of strings!"
            );
            x.forEach((value) => {
              assert(isString(value), "All of the row names must be strings!");
            });
            this._index = x;
          }
        });
        if (data) {
          if (data instanceof Series2) {
            this.name = data.name;
            this.values = copy(data.values);
            this.index = copy(data.index);
          } else if (isArray(data)) {
            const dataShape = shape(data);
            assert(
              dataShape.length === 1,
              "When passing an array into the constructor of a Series, the array must be 1-dimensional!"
            );
            this.values = data;
          } else if (data instanceof Object) {
            const keys = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
            assert(
              keys.length === 1,
              "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
            );
            const name = keys[0];
            const values = data[name];
            assert(
              shape(values).length === 1,
              "When passing an object into the constructor of a Series, the object must have only 1 key-value pair, where the key is the name of the data and the value is the 1-dimensional array of values!"
            );
            this.name = name;
            this.values = values.slice();
          }
        }
      }
      get shape() {
        return shape(this.values);
      }
      get length() {
        return this.shape[0];
      }
      get isEmpty() {
        return this.values.filter((v) => !isUndefined(v)).length === 0;
      }
      clear() {
        const out = this.copy();
        out.values.forEach((v, i) => {
          out.values[i] = void 0;
        });
        return out;
      }
      get(indices) {
        return seriesGet(this, indices);
      }
      getSubsetByNames(indices) {
        return seriesGetSubsetByNames(Series2, this, indices);
      }
      getSubsetByIndices(indices) {
        return seriesGetSubsetByIndices(this, indices);
      }
      loc(indices) {
        return this.getSubsetByNames(indices);
      }
      iloc(indices) {
        return this.getSubsetByIndices(indices);
      }
      reverse() {
        const out = new Series2(reverse(this.values));
        out.index = reverse(this.index);
        out.name = this.name;
        return out;
      }
      resetIndex() {
        const out = this.copy();
        out.index = range(0, this.shape[0]).map((i) => {
          return "item" + leftPad(i, (out.index.length - 1).toString().length);
        });
        return out;
      }
      copy() {
        const out = new Series2();
        out._values = copy(this.values);
        out._index = copy(this.index);
        out.name = this.name;
        return out;
      }
      append(x) {
        return seriesAppend(Series2, this, x);
      }
      apply(fn) {
        return seriesApply(this, fn);
      }
      concat(x) {
        return this.append(x);
      }
      dropMissing(condition, threshold) {
        return seriesDropMissing(this, condition, threshold);
      }
      dropNaN() {
        return seriesDropNaN(Series2, this);
      }
      toObject() {
        return seriesToObject(this);
      }
      print() {
        return seriesPrint(this);
      }
      shuffle() {
        return seriesShuffle(this);
      }
      sort(direction) {
        return seriesSort(Series2, this, direction);
      }
      sortByIndex() {
        return seriesSortByIndex(Series2, this);
      }
      filter(fn) {
        return seriesFilter(Series2, this, fn);
      }
      toDataFrame() {
        const out = new DataFrame2(transpose([this.values]));
        out.columns = [this.name];
        out.index = this.index;
        return out;
      }
      transpose() {
        const out = this.copy();
        out.values = reverse(out.values);
        out.index = reverse(out.index);
        return out;
      }
      getDummies() {
        return this.toDataFrame().getDummies();
      }
      oneHotEncode() {
        return this.getDummies();
      }
    }
    return Series2;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/index.mjs
  var DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe");
  function makeKey3(n) {
    const alpha = "abcdefghijklmnopqrstuvwxyz1234567890";
    let out = "";
    for (let i = 0; i < n; i++) out += alpha[Math.floor(random() * alpha.length)];
    return out;
  }
  var DataFrame = class _DataFrame {
    static [Symbol.hasInstance](x) {
      try {
        return !!x._symbol && x._symbol === DATAFRAME_SYMBOL;
      } catch (e) {
        return false;
      }
    }
    constructor(data) {
      Object.defineProperty(this, "_symbol", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: DATAFRAME_SYMBOL
      });
      Object.defineProperty(this, "_values", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "values", {
        configurable: true,
        enumerable: true,
        get() {
          if (this._values.length === 0 || !isUndefined(this._values[0]) && this._values[0].length === 0) {
            return [[]];
          }
          return this._values;
        },
        set(x) {
          assert(isArray(x), "The new values must be a 2-dimensional array!");
          const dataShape = shape(x);
          assert(
            dataShape.length === 2,
            "The new array of values must be 2-dimensional!"
          );
          if (dataShape[0] < this._index.length) {
            this._index = this._index.slice(0, dataShape[0]);
          } else if (dataShape[0] > this._index.length) {
            this._index = this._index.concat(
              range(this._index.length, dataShape[0]).map((i) => {
                return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
              })
            );
          }
          if (dataShape[1] < this._columns.length) {
            this._columns = this._columns.slice(0, dataShape[1]);
          } else if (dataShape[1] > this._columns.length) {
            this._columns = this._columns.concat(
              range(this._columns.length, dataShape[1]).map((i) => {
                return "col" + leftPad(i, (dataShape[1] - 1).toString().length);
              })
            );
          }
          this._values = x;
        }
      });
      Object.defineProperty(this, "_columns", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "columns", {
        configurable: true,
        enumerable: true,
        get() {
          return this._columns;
        },
        set(x) {
          assert(
            isArray(x),
            "The new columns list must be a 1-dimensional array of strings!"
          );
          assert(
            this.isEmpty || x.length === this.shape[1],
            "The new columns list must be the same length as the old columns list!"
          );
          assert(
            shape(x).length === 1,
            "The new columns list must be a 1-dimensional array of strings!"
          );
          x = x.map((v) => {
            if (typeof v !== "string") {
              v = JSON.stringify(v) || v.toString();
            }
            if (v.trim().length === 0) {
              return "untitled_" + makeKey3(8);
            }
            return v.trim();
          });
          const counts = (() => {
            const temp = count(x);
            const out = {};
            temp.values.forEach((v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = x.map((v) => {
            if (counts[v] > 1) {
              return v + "_" + makeKey3(8);
            }
            return v;
          });
          this._columns = x;
        }
      });
      Object.defineProperty(this, "_index", {
        value: [],
        configurable: true,
        enumerable: false,
        writable: true
      });
      Object.defineProperty(this, "index", {
        configurable: true,
        enumerable: true,
        get() {
          return this._index;
        },
        set(x) {
          assert(
            isArray(x),
            "The new index must be a 1-dimensional array of strings!"
          );
          assert(
            this.isEmpty || x.length === this.shape[0],
            "The new index must be the same length as the old index!"
          );
          assert(
            shape(x).length === 1,
            "The new index must be a 1-dimensional array of strings!"
          );
          x = x.map((v) => {
            if (typeof v !== "string") {
              v = JSON.stringify(v) || v.toString();
            }
            if (v.trim().length === 0) {
              return "untitled_" + makeKey3(8);
            }
            return v.trim();
          });
          const counts = (() => {
            const temp = count(x);
            const out = {};
            temp.values.forEach((v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = x.map((v) => {
            if (counts[v] > 1) {
              return v + "_" + makeKey3(8);
            }
            return v;
          });
          this._index = x;
        }
      });
      assert(
        isUndefined(data) || isObject(data) || isArray(data),
        "The `data` passed into the constructor of a DataFrame must be either (1) an object where the key-value pairs are (respectively) column names and 1-dimensional arrays of values, or (2) a 2-dimensional array of values."
      );
      if (data) {
        if (data instanceof _DataFrame) {
          this.values = copy(data.values);
          this.columns = copy(data.columns);
          this.index = copy(data.index);
        } else if (isArray(data)) {
          const dataShape = shape(data);
          assert(
            dataShape.length === 2,
            "The `data` array passed into the constructor of a DataFrame must be 2-dimensional!"
          );
          assert(
            !isJagged(data),
            "The 2-dimensional array passed into the constructor of a DataFrame must not contain sub-arrays (i.e., rows) of different lengths!"
          );
          this.values = data;
        } else {
          this._columns = Object.keys(data).concat(Object.getOwnPropertySymbols(data)).map((v) => v.toString());
          const temp = [];
          let lastColName = null;
          let lastColLength = null;
          this._columns.forEach((col) => {
            if (isUndefined(lastColLength)) {
              lastColName = col;
              lastColLength = data[col].length;
            }
            assert(
              data[col].length === lastColLength,
              `The object passed into the DataFrame constructor contains arrays of different lengths! The key "${lastColName}" points to an array containing ${lastColLength} items, and the key "${col}" points to an array containing ${data[col].length} items.`
            );
            lastColLength = data[col].length;
            const values = data[col];
            temp.push(values);
          });
          this._values = transpose(temp);
          const dataShape = shape(this.values);
          this._index = range(0, dataShape[0]).map((i) => {
            return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
          });
        }
      }
    }
    get shape() {
      return shape(this.values);
    }
    get length() {
      return this.shape[0];
    }
    get width() {
      return this.shape[1];
    }
    get rows() {
      return this.index;
    }
    set rows(rows) {
      this.index = rows;
    }
    get isEmpty() {
      return this.values.length === 0 || this.values.every((row) => row.length === 0);
    }
    clear() {
      const out = new _DataFrame(ndarray(this.shape));
      out.columns = this.columns.slice();
      out.index = this.index.slice();
      return out;
    }
    get(rows, cols) {
      if (arguments.length === 0) {
        return this;
      }
      if (arguments.length === 1) {
        try {
          return this.get(null, rows);
        } catch (e) {
          return this.get(rows, null);
        }
      }
      return dfGet(this, rows, cols);
    }
    getSubsetByNames(rows, cols) {
      return dfGetSubsetByNames(_DataFrame, Series, this, rows, cols);
    }
    getSubsetByIndices(rowIndices, colIndices) {
      return dfGetSubsetByIndices(this, rowIndices, colIndices);
    }
    getDummies(columns) {
      return dfGetDummies(_DataFrame, this, columns);
    }
    oneHotEncode(columns) {
      return dfGetDummies(_DataFrame, this, columns);
    }
    transpose() {
      const out = new _DataFrame(transpose(this.values));
      out.columns = this.index.slice();
      out.index = this.columns.slice();
      return out;
    }
    get T() {
      return this.transpose();
    }
    resetIndex(shouldSkipCopying) {
      return dfResetIndex(this, shouldSkipCopying);
    }
    copy() {
      return dfCopy(_DataFrame, this);
    }
    assign(p1, p2) {
      return dfAssign(_DataFrame, Series, this, p1, p2);
    }
    apply(fn, axis) {
      return dfApply(_DataFrame, Series, this, fn, axis);
    }
    dropMissing(axis, condition, threshold) {
      return dfDropMissing(_DataFrame, Series, this, axis, condition, threshold);
    }
    dropNaN(axis, condition, threshold) {
      return dfDropNaN(_DataFrame, this, axis, condition, threshold);
    }
    drop(rows, cols) {
      return dfDrop(_DataFrame, Series, this, rows, cols);
    }
    dropColumns(columns) {
      return this.drop(null, columns);
    }
    dropRows(rows) {
      return this.drop(rows, null);
    }
    toDetailedObject(axis) {
      return dfToDetailedObject(this, axis);
    }
    toObject() {
      return dfToObject(this);
    }
    toJSONString(axis) {
      return dfToJSONString(this, axis);
    }
    saveAsJSON(filename, axis) {
      return dfToJSON(this, filename, axis);
    }
    print() {
      return dfPrint(_DataFrame, Series, this);
    }
    sort(cols, directions) {
      return dfSort(this, cols, directions);
    }
    sortByIndex() {
      return this.sort();
    }
    filter(fn, axis) {
      return dfFilter(_DataFrame, Series, this, fn, axis);
    }
    shuffle(axis) {
      return dfShuffle(this, axis);
    }
    append(x, axis) {
      return dfAppend(this, x, axis);
    }
    concat(x, axis) {
      return this.append(x, axis);
    }
    join(x, axis) {
      return this.append(x, axis);
    }
    toString() {
      return JSON.stringify(this);
    }
  };
  var Series = createSeriesClass(DataFrame);

  // node_modules/@jrc03c/js-math-tools/src/max.mjs
  function max(arr, shouldDropNaNs) {
    return stats(arr, { shouldDropNaNs }).max;
  }

  // node_modules/@jrc03c/js-math-tools/src/vectorize.mjs
  function vectorize(fn) {
    assert(
      isFunction(fn),
      "You must pass a function into the `vectorize` function!"
    );
    return function helper5() {
      let hasSeries, hasDataFrames;
      const series = [];
      const dataframes = [];
      const childArrays = Object.keys(arguments).filter((key) => {
        const arg = arguments[key];
        if (isArray(arg)) {
          return true;
        } else if (isSeries(arg)) {
          hasSeries = true;
          series.push(arg);
          return true;
        } else if (isDataFrame(arg)) {
          hasDataFrames = true;
          dataframes.push(arg);
          return true;
        } else {
          return false;
        }
      }).map((key) => arguments[key]);
      childArrays.slice(0, -1).forEach((s2, i) => {
        assert(
          isEqual(
            isArray(s2) ? shape(s2) : s2.shape,
            isArray(childArrays[i + 1]) ? shape(childArrays[i + 1]) : childArrays[i + 1].shape
          ),
          `When passing multiple arrays into the \`${fn.name}\` function, all of the arrays must have the same shape!`
        );
      });
      if (childArrays.length > 0) {
        const maxLength = max(
          childArrays.map((a) => a.length ? a.length : a.values.length)
        );
        const out = range(0, maxLength).map((i) => {
          const args = Object.keys(arguments).map((key) => {
            if (isArray(arguments[key])) {
              return arguments[key][i];
            } else if (isSeries(arguments[key])) {
              return arguments[key].values[i];
            } else if (isDataFrame(arguments[key])) {
              return arguments[key].values[i];
            } else {
              return arguments[key];
            }
          });
          return helper5(...args);
        });
        if (hasDataFrames) {
          try {
            if (dataframes.length === 1 && isEqual(shape(dataframes[0]), shape(out))) {
              const temp = new DataFrame(out);
              temp.index = dataframes[0].index.slice();
              temp.columns = dataframes[0].columns.slice();
              return temp;
            } else {
              return new DataFrame(out);
            }
          } catch (e) {
            return out;
          }
        }
        if (hasSeries) {
          try {
            if (series.length === 1 && series[0].length === out.length) {
              const temp = new Series(out);
              temp.name = series[0].name;
              temp.index = series[0].index.slice();
              return temp;
            } else {
              return new Series(out);
            }
          } catch (e) {
            return out;
          }
        }
        return out;
      } else {
        return fn(...arguments);
      }
    };
  }

  // node_modules/@jrc03c/js-math-tools/src/abs.mjs
  function abs(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        return x < 0 ? -x : x;
      } else {
        return Math.abs(x);
      }
    } catch (e) {
      return NaN;
    }
  }
  var vabs = vectorize(abs);

  // node_modules/@jrc03c/js-math-tools/src/add.mjs
  function add() {
    try {
      let out = 0;
      let resultShouldBeABigInt = false;
      const x = Object.values(arguments);
      for (let v of x) {
        if (!isNumber(v)) return NaN;
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out += v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }
  var vadd = vectorize(add);

  // node_modules/@jrc03c/js-math-tools/src/apply.mjs
  function apply(x, fn) {
    try {
      return fn(x);
    } catch (e) {
      return NaN;
    }
  }
  var vapply = vectorize(apply);

  // node_modules/@jrc03c/js-math-tools/src/arccos.mjs
  function arccos(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.acos(x);
    } catch (e) {
      return NaN;
    }
  }
  var varccos = vectorize(arccos);

  // node_modules/@jrc03c/js-math-tools/src/arcsin.mjs
  function arcsin(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.asin(x);
    } catch (e) {
      return NaN;
    }
  }
  var varcsin = vectorize(arcsin);

  // node_modules/@jrc03c/js-math-tools/src/arctan.mjs
  function arctan(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.atan(x);
    } catch (e) {
      return NaN;
    }
  }
  var varctan = vectorize(arctan);

  // node_modules/@jrc03c/js-math-tools/src/ceil.mjs
  function ceil(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      return Math.ceil(x);
    } catch (e) {
      return NaN;
    }
  }
  var vceil = vectorize(ceil);

  // node_modules/@jrc03c/js-math-tools/src/chop.mjs
  function chop(x, threshold) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      if (isUndefined(threshold)) {
        threshold = 1e-10;
      } else if (!isNumber(threshold)) {
        return NaN;
      }
      return vabs(x) < threshold ? 0 : x;
    } catch (e) {
      return NaN;
    }
  }
  var vchop = vectorize(chop);

  // node_modules/@jrc03c/js-math-tools/src/int.mjs
  function int(x) {
    if (isDataFrame(x) || isSeries(x)) {
      const out = x.copy();
      out.values = int(out.values);
      return out;
    }
    if (isArray(x)) {
      return x.map((v) => int(v));
    } else {
      try {
        const out = JSON.parse(x);
        if (isNumber(out)) {
          return typeof out === "bigint" ? Number(out) : out >= 0 ? Math.floor(out) : Math.ceil(out);
        }
        return NaN;
      } catch (e) {
        return NaN;
      }
    }
  }
  var vint = vectorize(int);

  // node_modules/@jrc03c/js-math-tools/src/clamp.mjs
  function clamp(x, a, b) {
    try {
      if (!isNumber(x)) return NaN;
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (typeof x === "bigint") {
        return BigInt(clamp(vint(x), a, b));
      }
      if (x < a) return a;
      if (x > b) return b;
      return x;
    } catch (e) {
      return NaN;
    }
  }
  var vclamp = vectorize(clamp);

  // node_modules/@jrc03c/js-math-tools/src/cos.mjs
  function cos(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.cos(x);
    } catch (e) {
      return NaN;
    }
  }
  var vcos = vectorize(cos);

  // node_modules/@jrc03c/js-math-tools/src/helpers/data-types.mjs
  var dataTypes = Object.freeze({
    boolean: "boolean",
    date: "date",
    null: "null",
    number: "number",
    object: "object",
    string: "string"
  });

  // node_modules/@jrc03c/js-math-tools/src/pow.mjs
  function pow(x, p) {
    try {
      if (!isNumber(x)) return NaN;
      if (!isNumber(p)) return NaN;
      if (typeof x === "bigint" || typeof p === "bigint") {
        const out = pow(Number(x), Number(p));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.pow(x, p);
    } catch (e) {
      return NaN;
    }
  }
  var vpow = vectorize(pow);

  // node_modules/@jrc03c/js-math-tools/src/sqrt.mjs
  function sqrt(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        const out = sqrt(Number(x));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.sqrt(x);
    } catch (e) {
      return NaN;
    }
  }
  var vsqrt = vectorize(sqrt);

  // node_modules/@jrc03c/js-math-tools/src/multiply.mjs
  function multiply() {
    try {
      const x = Object.values(arguments);
      if (x.length === 0) return NaN;
      let resultShouldBeABigInt = false;
      let out = 1;
      for (let v of x) {
        if (!isNumber(v)) return NaN;
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
          v = Number(v);
        }
        out *= v;
      }
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  }
  var vmultiply = vectorize(multiply);

  // node_modules/@jrc03c/js-math-tools/src/exp.mjs
  function exp(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        if (x === 0n) {
          return 1n;
        } else {
          x = Number(x);
        }
      }
      return Math.exp(x);
    } catch (e) {
      return NaN;
    }
  }
  var vexp = vectorize(exp);

  // node_modules/@jrc03c/js-math-tools/src/factorial.mjs
  function factorial(n) {
    try {
      if (typeof n === "bigint") {
        return BigInt(factorial(vint(n)));
      }
      if (n !== vint(n)) return NaN;
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    } catch (e) {
      return NaN;
    }
  }
  var vfactorial = vectorize(factorial);

  // node_modules/@jrc03c/js-math-tools/src/float.mjs
  function float(x) {
    try {
      if (x === "Infinity") {
        return Infinity;
      }
      if (x === "-Infinity") {
        return -Infinity;
      }
      const out = JSON.parse(x);
      if (isNumber(out)) return out;
      return NaN;
    } catch (e) {
      return NaN;
    }
  }
  var vfloat = vectorize(float);

  // node_modules/@jrc03c/js-math-tools/src/floor.mjs
  function floor(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        return x;
      }
      return Math.floor(x);
    } catch (e) {
      return NaN;
    }
  }
  var vfloor = vectorize(floor);

  // node_modules/@jrc03c/js-math-tools/src/lerp.mjs
  function lerp(a, b, f) {
    try {
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (!isNumber(f)) return NaN;
      if (typeof a === "bigint" || typeof b === "bigint") {
        const out = lerp(Number(a), Number(b), f);
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return f * (b - a) + a;
    } catch (e) {
      return NaN;
    }
  }
  var vlerp = vectorize(lerp);

  // node_modules/@jrc03c/js-math-tools/src/log.mjs
  function log(x, base) {
    try {
      base = isUndefined(base) ? Math.E : base;
      if (!isNumber(x)) return NaN;
      if (!isNumber(base)) return NaN;
      if (typeof x === "bigint" || typeof base === "bigint") {
        const out = log(Number(x), Number(base));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return Math.log(x) / Math.log(base);
    } catch (e) {
      return NaN;
    }
  }
  var vlog = vectorize(log);

  // node_modules/@jrc03c/js-math-tools/src/mod.mjs
  function mod(a, b) {
    try {
      if (!isNumber(a)) return NaN;
      if (!isNumber(b)) return NaN;
      if (typeof a === "bigint" || typeof b === "bigint") {
        const out = mod(Number(a), Number(b));
        try {
          return BigInt(out);
        } catch (e) {
          return out;
        }
      }
      return a % b;
    } catch (e) {
      return NaN;
    }
  }
  var vmod = vectorize(mod);

  // node_modules/@jrc03c/js-math-tools/src/normal.mjs
  function helper3() {
    const u1 = random();
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
  function normal(shape2) {
    if (isUndefined(shape2)) return helper3();
    return vapply(ndarray(shape2), helper3);
  }

  // node_modules/@jrc03c/js-math-tools/src/remap.mjs
  var helper4 = vectorize((x, a, b, c, d) => {
    try {
      let resultShouldBeABigInt = false;
      for (const v of [x, a, b, c, d]) {
        if (!isNumber(v)) {
          return NaN;
        }
        if (typeof v === "bigint") {
          resultShouldBeABigInt = true;
        }
      }
      if (resultShouldBeABigInt) {
        x = Number(x);
        a = Number(a);
        b = Number(b);
        c = Number(c);
        d = Number(d);
      }
      const num = (d - c) * (x - a);
      const den = b - a;
      if (den === 0) return NaN;
      const out = num / den + c;
      if (resultShouldBeABigInt) {
        try {
          return BigInt(out);
        } catch (e) {
        }
      }
      return out;
    } catch (e) {
      return NaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/round.mjs
  function round(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return x;
      return Math.round(x);
    } catch (e) {
      return NaN;
    }
  }
  var vround = vectorize(round);

  // node_modules/@jrc03c/js-math-tools/src/sign.mjs
  function sign(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") return BigInt(sign(Number(x)));
      if (x < 0) return -1;
      if (x > 0) return 1;
      return 0;
    } catch (e) {
      return NaN;
    }
  }
  var vsign = vectorize(sign);

  // node_modules/@jrc03c/js-math-tools/src/sin.mjs
  function sin(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.sin(x);
    } catch (e) {
      return NaN;
    }
  }
  var vsin = vectorize(sin);

  // node_modules/@jrc03c/js-math-tools/src/tan.mjs
  function tan(x) {
    try {
      if (!isNumber(x)) return NaN;
      if (typeof x === "bigint") {
        x = Number(x);
      }
      return Math.tan(x);
    } catch (e) {
      return NaN;
    }
  }
  var vtan = vectorize(tan);

  // node_modules/@jrc03c/make-key/src/index.mjs
  function makeKey4(keyLength, keySeed, charset) {
    if (arguments.length === 2) {
      if (isNumber(arguments[1])) {
        charset = null;
      } else {
        charset = keySeed;
        keySeed = null;
      }
    }
    assert(
      isNumber(keyLength) && vint(keyLength) === keyLength,
      "`keyLength` must be an integer!"
    );
    if (keySeed) {
      assert(
        isNumber(keySeed) && vint(keySeed) === keySeed,
        "`keySeed` must be an integer!"
      );
      seed(keySeed);
    }
    if (charset) {
      assert(isString(charset), "`charset` must be a string!");
    }
    let out = "";
    charset = charset || "abcdefg1234567890";
    for (let i = 0; i < keyLength; i++) {
      out += charset[vint(random() * charset.length)];
    }
    return out;
  }

  // node_modules/@jrc03c/js-text-tools/src/helpers/convert-object-to-typed-array.mjs
  var context = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : void 0;
  function convertObjectToTypedArray(x) {
    const typedArrayConstructorSymbol = Symbol.for("@TypedArrayConstructor");
    const typedArrayConstructorString = "Symbol(@TypedArrayConstructor)";
    const typedArrayConstructorKey = typedArrayConstructorSymbol in x ? typedArrayConstructorSymbol : typedArrayConstructorString in x ? typedArrayConstructorString : void 0;
    if (typedArrayConstructorKey) {
      if (!("values" in x)) {
        throw new Error(
          "The value passed into the `convertObjectToTypedArray` must have a 'values' property!"
        );
      }
      if (x[typedArrayConstructorKey] === "ArrayBuffer") {
        return new Uint8Array(x.values).buffer;
      }
      return new context[x[typedArrayConstructorKey]](x.values);
    }
    if (isArray(x) && x.constructor.name === "Array") {
      return x;
    }
    throw new Error(
      "The value passed into the `convertObjectToTypedArray` must be an object that can be converted into a typed array!"
    );
  }

  // node_modules/@jrc03c/js-text-tools/src/helpers/convert-typed-array-to-object.mjs
  function convertTypedArrayToObject(x) {
    if (x instanceof ArrayBuffer || x instanceof BigInt64Array || x instanceof BigUint64Array || x instanceof Float32Array || x instanceof Float64Array || x instanceof Int16Array || x instanceof Int32Array || x instanceof Int8Array || x instanceof Uint16Array || x instanceof Uint32Array || x instanceof Uint8Array || x instanceof Uint8ClampedArray) {
      return {
        [Symbol.for("@TypedArrayConstructor")]: x.constructor.name,
        values: x instanceof ArrayBuffer ? Array.from(new Uint8Array(x)) : Array.from(x)
      };
    }
    if (isArray(x)) {
      return x.map((v) => {
        try {
          return convertTypedArrayToObject(v);
        } catch (e) {
          return v;
        }
      });
    }
    if (typeof x === "object" & x !== null) {
      if (isDate(x)) {
        return new Date(x.getTime());
      }
      const out = {};
      Object.keys(x).forEach((key) => {
        try {
          out[key] = convertTypedArrayToObject(x[key]);
        } catch (e) {
          out[key] = x[key];
        }
      });
      return out;
    }
    throw new Error(
      "The value passed into the `convertTypedArrayToObject` function must be a typed array! Valid types include: ArrayBuffer, Float32Array, Float64Array, Int16Array, Int32Array, Int8Array, Uint16Array, Uint32Array, Uint8Array, and Uint8ClampedArray."
    );
  }

  // node_modules/@jrc03c/js-text-tools/src/helpers/is-a-number-string.mjs
  function isANumberString(x) {
    x = x.trim();
    return !!(x.match(/^-?\d+(\.\d+)?$/g) || x.match(/^-?\d+(\.\d+)?e-?\d+(\.\d+)?$/g) || x.match(/^-?\.\d+$/g) || x === "NaN");
  }

  // node_modules/@jrc03c/js-text-tools/src/parse.mjs
  var specials = {
    "@Infinity": Infinity,
    "@NegativeInfinity": -Infinity,
    "@NaN": NaN,
    "@undefined": void 0
  };
  function fixUndefineds(x) {
    if (typeof x === "object") {
      if (x === null) {
        return x;
      }
      if (isArray(x)) {
        for (let i = 0; i < x.length; i++) {
          x[i] = fixUndefineds(x[i]);
        }
      } else {
        Object.keys(x).concat(Object.getOwnPropertySymbols(x)).forEach((key) => {
          x[key] = fixUndefineds(x[key]);
        });
      }
      return x;
    } else {
      if (typeof x === "undefined") {
        return void 0;
      }
      if (x === "Symbol(@undefined)") {
        return void 0;
      }
      return x;
    }
  }
  function parseAsBigInt(x) {
    if (typeof x === "bigint") {
      return x;
    } else if (typeof x === "string") {
      if (x.match(/^\s*?-?\d+n\s*?$/g)) {
        try {
          return BigInt(x.split("n")[0]);
        } catch (e) {
          return NaN;
        }
      } else {
        return NaN;
      }
    } else {
      return NaN;
    }
  }
  function parseAsNumber(x) {
    if (typeof x !== "string") {
      if (typeof x === "number") {
        return x;
      } else {
        return;
      }
    }
    if (isANumberString(x)) {
      return parseFloat(x);
    }
  }
  function parseAsString(x) {
    if (typeof x !== "string") {
      return;
    }
    const replacement = "@jrc03c/js-text-tools/newline-replacer";
    x = x.replaceAll("\n", replacement);
    if (x.trim().match(/^("|')?Symbol\(@String\):.*?("|')?$/g)) {
      let out = x.replace("Symbol(@String):", "");
      if (out.match(/^".*?"$/g)) {
        try {
          return JSON.parse(out);
        } catch (e) {
          out = out.substring(1, out.length - 1);
        }
      }
      out = out.replaceAll(replacement, "\n");
      return out;
    }
  }
  function parseAsSymbol(x) {
    if (typeof x !== "string") {
      if (typeof x === "symbol") {
        return { out: x, isASymbol: true };
      } else {
        return;
      }
    }
    if (x.trim().match(/^'?"?Symbol\(.*?\)"?'?$/g)) {
      const xTemp = x.replace(/^.*?Symbol\(/g, "").replace(/\).*?$/g, "");
      if (xTemp in specials) {
        return { out: specials[xTemp], isASymbol: true };
      }
      return { out: Symbol.for(xTemp), isASymbol: true };
    }
  }
  function parseAsRegex(x) {
    if (typeof x !== "string") {
      if (x instanceof RegExp) {
        return x;
      } else {
        return;
      }
    }
    const xTrimmed = x.trim();
    if (xTrimmed.match(/^\/.*?\/(d|g|i|m|s|u|v|y)*?$/g)) {
      try {
        const pattern = xTrimmed.replace(/^\//g, "").replace(/\/(d|g|i|m|s|u|v|y)*?$/g, "");
        const flags = xTrimmed.match(/\/(d|g|i|m|s|u|v|y)*?$/g).at(-1).split("/").at(-1);
        return new RegExp(pattern, flags);
      } catch (e) {
      }
    }
  }
  function parseWithJSONParse(x) {
    if (typeof x !== "string") {
      if (typeof x === "object") {
        return x;
      } else {
        return "Symbol(@undefined)";
      }
    }
    try {
      let out = JSON.parse(x, (key, value) => {
        try {
          const out2 = parse(value);
          return typeof out2 === "undefined" ? "Symbol(@undefined)" : out2;
        } catch (e) {
          return typeof value === "undefined" ? "Symbol(@undefined)" : value;
        }
      });
      if (isArray(out)) {
        out = fixUndefineds(out);
      }
      return out;
    } catch (e) {
      return x;
    }
  }
  function parseAsDate(x) {
    if (typeof x !== "string") {
      if (x instanceof Date && x.toString() !== "Invalid Date") {
        return x;
      } else {
        return;
      }
    }
    try {
      const d = new Date(Date.parse(x));
      if (d.toString() !== "Invalid Date") {
        return d;
      }
    } catch (e) {
    }
  }
  function parseObjectKeysAndValues(x) {
    if (typeof x === "object") {
      if (x !== null) {
        return fixUndefineds(x);
      }
      return;
    }
    Object.keys(x).concat(Object.getOwnPropertySymbols(x)).forEach((key) => {
      try {
        let origKey = key;
        try {
          key = parse(key);
        } catch (e) {
        }
        x[key] = parse(x[origKey]);
        if (key !== origKey) {
          delete x[origKey];
        }
      } catch (e) {
      }
    });
    return fixUndefineds(x);
  }
  function parse(x) {
    function helper5(x2) {
      if (typeof x2 === "string") {
        let out = parseAsString(x2);
        if (typeof out === "string") {
          return out;
        }
        const results = parseAsSymbol(x2);
        out = results ? results.out : void 0;
        if (results && results.isASymbol) {
          return out;
        }
        out = parseAsRegex(x2);
        if (out instanceof RegExp) {
          return out;
        }
        out = parseAsBigInt(x2);
        if (typeof out === "bigint") {
          return out;
        }
        out = parseAsNumber(x2);
        if (typeof out === "number") {
          return out;
        }
        out = parseAsDate(x2);
        if (out instanceof Date) {
          return out;
        }
        out = parseWithJSONParse(x2);
        if (typeof out !== "undefined") {
          if (out === "Symbol(@undefined)") {
            return void 0;
          } else {
            return out;
          }
        }
        return x2;
      }
      if (typeof x2 === "object") {
        if (x2 === null) {
          return null;
        }
        let out;
        try {
          out = convertObjectToTypedArray(x2);
          if (isArray(out)) return out;
        } catch (e) {
        }
        out = parseObjectKeysAndValues(x2);
        if (out) {
          try {
            return convertObjectToTypedArray(out);
          } catch (e) {
            return out;
          }
        }
        return x2;
      }
      return x2;
    }
    return helper5(x);
  }

  // node_modules/@jrc03c/js-text-tools/src/stringify.mjs
  function prefix(s2, n) {
    if (!s2 || n <= 0) return "";
    return range(0, n).map(() => s2).join("");
  }
  function stringify(x, indent2) {
    assert(
      isString(indent2) || isUndefined(indent2),
      "The second parameter to the `stringify` function must be undefined or a string!"
    );
    const newline = indent2 ? "\n" : "";
    function helper5(x2, indent3, depth) {
      depth = depth || 0;
      if (typeof x2 === "bigint") {
        return JSON.stringify(x2.toString() + "n");
      }
      if (typeof x2 === "number") {
        if (x2 === Infinity) {
          return '"Symbol(@Infinity)"';
        }
        if (x2 === -Infinity) {
          return '"Symbol(@NegativeInfinity)"';
        }
        if (isNaN(x2)) {
          return '"Symbol(@NaN)"';
        }
        return x2.toString();
      }
      if (typeof x2 === "string") {
        return JSON.stringify("Symbol(@String):" + x2);
      }
      if (typeof x2 === "boolean") {
        return x2.toString();
      }
      if (typeof x2 === "undefined") {
        return '"Symbol(@undefined)"';
      }
      if (typeof x2 === "symbol") {
        return JSON.stringify(x2.toString());
      }
      if (typeof x2 === "function") {
        return JSON.stringify(x2.toString());
      }
      if (x2 instanceof RegExp) {
        return x2.toString();
      }
      if (typeof x2 === "object") {
        if (x2 === null) {
          return "null";
        }
        if (isDate(x2)) {
          return JSON.stringify(x2.toJSON());
        }
        if (isArray(x2)) {
          if (x2.length === 0) {
            return prefix(indent3, depth - 1) + "[]";
          }
          if (!(x2 instanceof Array)) {
            return helper5(convertTypedArrayToObject(x2), null, indent3);
          }
          return prefix(indent3, depth - 1) + "[" + newline + x2.map((v) => {
            let child = (() => {
              try {
                return helper5(convertTypedArrayToObject(v), indent3, depth + 1);
              } catch (e) {
                return helper5(v, indent3, depth + 1);
              }
            })();
            if (isString(child)) child = child.trim();
            return prefix(indent3, depth + 1) + child;
          }).join("," + newline) + newline + prefix(indent3, depth) + "]";
        }
        if (Object.keys(x2).length + Object.getOwnPropertySymbols(x2).length === 0) {
          return prefix(indent3, depth - 1) + "{}";
        }
        return prefix(indent3, depth - 1) + "{" + newline + Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).map((key) => {
          let child = (() => {
            try {
              return helper5(
                convertTypedArrayToObject(x2[key]),
                indent3,
                depth + 1
              );
            } catch (e) {
              return helper5(x2[key], indent3, depth + 1);
            }
          })();
          if (isString(child)) child = child.trim();
          const stringifiedKey = typeof key === "symbol" ? helper5(key) : JSON.stringify(key);
          return prefix(indent3, depth + 1) + stringifiedKey + ":" + (indent3 ? " " : "") + child;
        }).join("," + newline) + newline + prefix(indent3, depth) + "}";
      }
      return "undefined";
    }
    return helper5(decycle(x), indent2);
  }

  // src/subscription-service.mjs
  Array.prototype.remove = function(x) {
    let index = this.indexOf(x);
    while (index > -1) {
      this.splice(index, 1);
      index = this.indexOf(x);
    }
    return this;
  };
  var alive = {};
  var SubscriptionService = class {
    context = void 0;
    rejects = [];
    resolves = [];
    unsubs = [];
    constructor() {
      this.context = globalThis;
      const id = makeKey4(8);
      Object.defineProperty(this, "id", {
        configurable: false,
        enumerable: true,
        get: () => id,
        set() {
          throw new Error(
            `The \`id\` property of this SubscriptionService instance is read-only!`
          );
        }
      });
      alive[this.id] = true;
    }
    get hasBeenDestroyed() {
      return !alive[this.id];
    }
    set hasBeenDestroyed(value) {
      throw new Error(
        `The \`hasBeenDestroyed\` property of this SubscriptionService instance is read-only! To destroy this SubscriptionService instance, invoke its \`destroy\` method.`
      );
    }
    destroy(error2) {
      if (this.hasBeenDestroyed) {
        throw new Error(
          `This SubscriptionService instance has already been destroyed!`
        );
      }
      delete alive[this.id];
      this.unsubs.forEach((unsub) => unsub());
      if (error2) {
        this.rejects.forEach((reject) => reject(error2));
      } else {
        this.resolves.forEach((resolve) => resolve());
      }
      delete this.context;
      delete this.rejects;
      delete this.resolves;
      delete this.unsubs;
    }
    emit(signal, payload) {
      if (this.hasBeenDestroyed) {
        throw new Error(
          `This SubscriptionService instance has already been destroyed!`
        );
      }
      return new Promise((resolve, reject) => {
        try {
          const cbid = makeKey4(8);
          const callback = (event) => {
            if (event.data.signal === cbid) {
              this.context.removeEventListener("message", callback);
              this.resolves.remove(resolve);
              this.rejects.remove(reject);
              let out = event.data.payload;
              try {
                out = parse(out);
              } catch (e) {
              }
              return resolve(out);
            }
          };
          this.context.addEventListener("message", callback);
          this.resolves.push(resolve);
          this.rejects.push(reject);
          try {
            payload = stringify(payload);
          } catch (e) {
          }
          this.context.postMessage({
            cbid,
            signal,
            payload
          });
        } catch (e) {
          this.resolves.remove(resolve);
          this.rejects.remove(reject);
          return reject(e);
        }
      });
    }
    on(signal, callback) {
      if (this.hasBeenDestroyed) {
        throw new Error(
          `This SubscriptionService instance has already been destroyed!`
        );
      }
      const inner = (event) => {
        if (event.data.signal === signal) {
          const cbid = event.data.cbid;
          let payload = event.data.payload;
          try {
            payload = parse(payload);
          } catch (e) {
          }
          const request = { data: payload };
          const response = {
            send: (result) => {
              try {
                result = stringify(result);
              } catch (e) {
              }
              if (!this.hasBeenDestroyed) {
                this.context.postMessage({
                  signal: cbid,
                  payload: result
                });
              }
            }
          };
          callback(request, response);
        }
      };
      const unsub = () => {
        if (this.context) {
          this.context.removeEventListener("message", inner);
        }
        if (this.unsubs) {
          this.unsubs.remove(unsub);
        }
      };
      this.unsubs.push(unsub);
      this.context.addEventListener("message", inner);
      return unsub;
    }
  };

  // src/drone.mjs
  var Drone = class extends SubscriptionService {
    constructor(path, options) {
      super();
      if (typeof window === "undefined") {
        if (typeof path !== "undefined") {
          throw new Error(
            "You must not pass a `path` to a `Drone` created in a web worker context! (Passing a `path` only makes sense when creating a `Drone` in a window context.)"
          );
        }
      } else if (typeof path === "undefined") {
        throw new Error("You must pass a `path` into the `Drone` constructor!");
      }
      if (path) {
        this.context = new Worker(path, options);
      }
    }
    get isDead() {
      return this.hasBeenDestroyed;
    }
    set isDead(value) {
      throw new Error(
        `The \`isDead\` property of this Drone instance is read-only! To destroy this Drone instance, invoke its \`destroy\` method.`
      );
    }
    propose(signal, payload) {
      return this.emit(signal, payload);
    }
    destroy() {
      if (this.context instanceof Worker) {
        this.context.terminate();
      }
      return super.destroy();
    }
  };

  // src/queen.mjs
  var Queen = class extends SubscriptionService {
    hive = [];
    constructor(path, n) {
      super();
      if (path) {
        n = n || 1;
        this.addDrones(path, n);
      }
    }
    get isDead() {
      return this.hasBeenDestroyed;
    }
    set isDead(value) {
      throw new Error(
        `The \`isDead\` property of this Queen instance is read-only! To destroy this Queen instance, invoke her \`destroy\` method.`
      );
    }
    addDrone(path, options) {
      if (this.isDead) {
        throw new Error("The queen is dead!");
      }
      const drone = new Drone(path, options);
      this.hive.push(drone);
      return drone;
    }
    addDrones(path, n, options) {
      const out = [];
      for (let i = 0; i < n; i++) {
        out.push(this.addDrone(path, options));
      }
      return out;
    }
    removeDrone(drone) {
      if (this.isDead) {
        throw new Error("The queen is dead!");
      }
      drone.destroy();
      this.hive.remove(drone);
      return this;
    }
    removeDrones(drones) {
      drones.forEach((drone) => this.removeDrone(drone));
      return this;
    }
    on(signal, callback, specificDrones) {
      if (typeof specificDrones !== "undefined" && specificDrones instanceof Drone) {
        specificDrones = [specificDrones];
      }
      const unsubs = (specificDrones || this.hive).map((drone) => {
        return drone.on(signal, callback);
      });
      const unsub = () => unsubs.forEach((unsub2) => unsub2());
      this.unsubs.push(unsub);
      return unsub;
    }
    emit(signal, payload, specificDrones) {
      if (this.isDead) {
        throw new Error("The queen is dead!");
      }
      if (typeof specificDrones !== "undefined" && specificDrones instanceof Drone) {
        specificDrones = [specificDrones];
      }
      const drones = specificDrones || this.hive;
      if (drones.length === 0) {
        throw new Error(
          `The queen issued a "${signal}" command, but there are no drones in the hive!`
        );
      }
      return new Promise((resolve, reject) => {
        try {
          const results = new Array(drones.length);
          const promises = drones.map((drone, i) => {
            return new Promise((resolve2, reject2) => {
              try {
                this.resolves.push(resolve2);
                this.rejects.push(reject2);
                drone.emit(signal, payload).then((result) => {
                  if (!this.hasBeenDestroyed) {
                    this.resolves.remove(resolve2);
                    this.rejects.remove(reject2);
                    results[i] = result;
                    resolve2();
                  }
                });
              } catch (e) {
                this.resolves.remove(resolve2);
                this.rejects.remove(reject2);
                return reject2(e);
              }
            });
          });
          this.resolves.push(resolve);
          this.rejects.push(reject);
          Promise.all(promises).then(() => {
            if (!this.hasBeenDestroyed) {
              this.resolves.remove(resolve);
              this.rejects.remove(reject);
              if (results.length === 1) {
                return resolve(results[0]);
              } else {
                return resolve(results);
              }
            }
          });
        } catch (e) {
          this.resolves.remove(resolve);
          this.rejects.remove(reject);
          return reject(e);
        }
      });
    }
    command() {
      return this.emit(...arguments);
    }
    destroy(error2) {
      if (this.isDead) {
        throw new Error("The queen is dead!");
      }
      const out = super.destroy(error2);
      this.hive.forEach((drone) => {
        drone.destroy(error2);
      });
      delete this.hive;
      return out;
    }
  };

  // tests/fake-jest.js
  async function test(desc, fn) {
    const container = document.getElementById("container");
    const el = document.createElement("div");
    el.classList.add("result");
    el.classList.add("running");
    el.innerHTML = `TEST: ${desc}`;
    container.appendChild(el);
    try {
      await fn();
      el.classList.add("success");
    } catch (e) {
      const text = e ? e.toString() : "";
      el.innerHTML += `<span class="reason">(${text.toString()})</span>`;
      el.classList.add("error");
    }
    el.classList.remove("running");
  }
  function expect(v1) {
    return {
      toBe(v2) {
        if (!isEqual(v1, v2)) {
          throw new Error(
            `Expected ${v2} (${typeof v2}) but received ${v1} (${typeof v1})!`
          );
        }
      },
      toBeLessThan(v2) {
        if (v1 >= v2) {
          throw new Error(
            `${v1} is supposed to be less than ${v2}, but it's not!`
          );
        }
      },
      toBeGreaterThan(v2) {
        if (v1 <= v2) {
          throw new Error(
            `${v1} is supposed to be greater than ${v2}, but it's not!`
          );
        }
      },
      toThrow() {
        let threw = false;
        try {
          v1();
        } catch (e) {
          threw = true;
        }
        if (!threw) {
          throw new Error(
            "The function should've thrown an error, but it didn't!"
          );
        }
      },
      async toThrowAsync() {
        let threw = false;
        try {
          await v1();
        } catch (e) {
          threw = true;
        }
        if (!threw) {
          throw new Error(
            "The function should've thrown an error, but it didn't!"
          );
        }
      }
    };
  }

  // node_modules/@jrc03c/pause/src/index.mjs
  function pauseAsync(ms) {
    return new Promise((resolve, reject) => {
      try {
        const start = /* @__PURE__ */ new Date();
        return setTimeout(() => resolve(/* @__PURE__ */ new Date() - start), ms);
      } catch (e) {
        return reject(e);
      }
    });
  }

  // tests/main.mjs
  async function runTests() {
    await test("that queens can only send commands when they have drones and are alive", async () => {
      const queen = new Queen();
      expect(queen.hasBeenDestroyed).toBe(false);
      expect(queen.isDead).toBe(false);
      await expect(async () => {
        queen.command("do-something");
      }).toThrowAsync();
      queen.addDrone("worker-bundle.js");
      const result = await queen.command("double", 234);
      expect(result).toBe(468);
      queen.destroy();
      expect(queen.hasBeenDestroyed).toBe(true);
      expect(queen.isDead).toBe(true);
      await expect(async () => {
        await queen.command("double", 345);
      }).toThrowAsync();
    });
    await test("that queens shut everything down immediately when destroyed", async () => {
      const queen = new Queen("worker-bundle.js");
      const drone = queen.hive[0];
      const start = /* @__PURE__ */ new Date();
      const duration = 500;
      setTimeout(() => queen.destroy(), 100);
      await queen.command("wait", duration);
      const stop = /* @__PURE__ */ new Date();
      expect(stop - start).toBeLessThan(duration);
      expect(queen.isDead).toBe(true);
      expect(drone.isDead).toBe(true);
      await expect(async () => {
        await pauseAsync(1e3);
        await drone.emit("double", 234);
      }).toThrowAsync();
    });
    await test("that drones shut down immediately when destroyed", async () => {
      const drone = new Drone("worker-bundle.js");
      await (async () => {
        let elapsedTime = 0;
        const callback = (event) => {
          if (event.data.signal === "pulse-elapsed-time") {
            elapsedTime = event.data.payload;
          }
        };
        globalThis.addEventListener("message", callback);
        drone.emit("pulse");
        await pauseAsync(250);
        drone.destroy();
        expect(elapsedTime).toBeLessThan(300);
        const finalElapsedTime = elapsedTime;
        await pauseAsync(250);
        expect(elapsedTime).toBe(finalElapsedTime);
        globalThis.removeEventListener("message", callback);
      })();
    });
    await test("that all data types can be transmitted back and forth correctly", async () => {
      const queen = new Queen("worker-bundle.js");
      const selfReferencer = [2, 3, 4];
      selfReferencer.push(selfReferencer);
      let df = new DataFrame({
        ints: range(0, 100).map(() => Math.floor(Math.random() * 10 - 5)),
        floats: normal(100),
        strings: range(0, 100).map(() => makeKey4(8)),
        bools: range(0, 100).map(() => Math.random() < 0.5 ? true : false),
        nans: range(0, 100).map(
          () => Math.random() < 0.33 ? Infinity : Math.random() < 0.5 ? -Infinity : NaN
        ),
        nones: range(0, 100).map(() => Math.random() < 0.5 ? void 0 : null),
        symbols: range(0, 100).map(() => Symbol.for(makeKey4(8))),
        dates: range(0, 100).map(
          () => new Date(Math.round(Math.random() * 999999999))
        )
      });
      const series = new Series(normal(100));
      const variables = [
        0,
        1,
        2.3,
        -2.3,
        Infinity,
        -Infinity,
        NaN,
        "foo",
        true,
        false,
        null,
        void 0,
        Symbol.for("Hello, world!"),
        [2, 3, 4],
        [
          [2, 3, 4],
          [5, 6, 7]
        ],
        { hello: "world" },
        selfReferencer,
        df,
        series
      ];
      for (const vTrue of variables) {
        const vPred = await queen.command("send-it-right-back", vTrue);
        expect(vPred).toBe(decycle(vTrue));
      }
      class Person {
        constructor(name, age) {
          this.name = name;
          this.age = age;
        }
      }
      const alice = new Person("Alice", 23);
      const aliceTrue = { name: alice.name, age: alice.age };
      const alicePred = await queen.command("send-it-right-back", alice);
      expect(alicePred).toBe(aliceTrue);
      queen.destroy();
    });
    await test("that queens can have multiple drones in their hives", async () => {
      const queen = new Queen("worker-bundle.js", 5);
      const x = 234;
      const yTrue = queen.hive.map(() => x * 2);
      const yPred = await queen.command("double", x);
      expect(yPred).toBe(yTrue);
      queen.destroy();
    });
    await test("that drones in the same hive don't share the same context (worker-side)", async () => {
      const queen = new Queen("worker-bundle.js", 5);
      await queen.command("set-random-number");
      const numbers = await queen.command("get-random-number");
      numbers.forEach((v1, i) => {
        numbers.forEach((v2, j) => {
          if (i !== j) {
            expect(v1 !== v2).toBe(true);
          }
        });
      });
      queen.destroy();
    });
    await test("that drones can do their own work without a queen", async () => {
      const drone = new Drone("worker-bundle.js");
      expect(await drone.emit("double", 12345)).toBe(24690);
      drone.destroy();
    });
    await test("that workers can initiate messages", async () => {
      await (() => {
        return new Promise((resolve, reject) => {
          try {
            const drone = new Drone("worker-bundle.js");
            drone.on("message-initiated-by-worker", (request) => {
              expect(request.data).toBe("The worker says hi!");
              drone.destroy();
              resolve();
            });
          } catch (e) {
            return reject(e);
          }
        });
      })();
      await (() => {
        return new Promise((resolve, reject) => {
          try {
            const queen = new Queen("worker-bundle.js");
            queen.on("message-initiated-by-worker", (request) => {
              expect(request.data).toBe("The worker says hi!");
              queen.destroy();
              resolve();
            });
          } catch (e) {
            return reject(e);
          }
        });
      })();
    });
    await test("that multiple callbacks can be added the same signal by a single drone", async () => {
      const drone = new Drone("worker-bundle.js");
      const results = [];
      drone.on("called-you-back", (request, response) => {
        results.push(request.data);
        return response.send();
      });
      drone.on("called-you-back", (request, response) => {
        results.push(request.data * 2);
        return response.send();
      });
      drone.on("called-you-back", (request, response) => {
        results.push(request.data * 4);
        return response.send();
      });
      await drone.emit("call-me-back");
      results.sort();
      expect(results).toBe([234, 468, 936]);
      drone.destroy();
    });
    await test("that the `on` method's returned unsubscribe function works as expected", async () => {
      await (async () => {
        const drone = new Drone("worker-bundle.js");
        let count2 = 0;
        const unsub = drone.on("called-you-back", (request, response) => {
          count2++;
          return response.send();
        });
        for (let i = 0; i < 10; i++) {
          await drone.emit("call-me-back");
        }
        expect(count2).toBe(10);
        unsub();
        for (let i = 0; i < 10; i++) {
          drone.emit("call-me-back");
        }
        setTimeout(() => {
          expect(count2).toBe(10);
          drone.destroy();
        }, 250);
      })();
      await (async () => {
        const queen = new Queen("worker-bundle.js");
        let count2 = 0;
        const unsub = queen.on("called-you-back", (request, response) => {
          count2++;
          return response.send();
        });
        for (let i = 0; i < 10; i++) {
          await queen.emit("call-me-back");
        }
        expect(count2).toBe(10);
        unsub();
        for (let i = 0; i < 10; i++) {
          queen.emit("call-me-back");
        }
        setTimeout(() => {
          expect(count2).toBe(10);
          queen.destroy();
        }, 250);
      })();
    });
    await test("that errors are thrown when attempting to write to read-only properties", () => {
      const queen = new Queen("worker-bundle.js");
      expect(() => {
        queen.id = "foobar";
      }).toThrow();
      expect(() => {
        queen.hasBeenDestroyed = true;
      }).toThrow();
      expect(() => {
        queen.isDead = true;
      }).toThrow();
      queen.destroy();
    });
    await test("that the queen can send commands to specific drones (i.e., not all drones)", async () => {
      const queen = new Queen("worker-bundle.js", 5);
      const subset = queen.hive.slice(0, 3);
      const r = Math.random();
      const vals = [];
      const unsub = queen.on("didnt-tell-the-others", (request, response) => {
        vals.push(request.data);
        return response.send();
      });
      await queen.command("dont-tell-the-others", r, subset);
      expect(vals.length).toBe(subset.length);
      vals.forEach((v) => expect(v).toBe(r));
      unsub();
      const all = await queen.command("get-secret-message");
      expect(all.length).toBe(queen.hive.length);
      expect(all.filter((v) => !!v).length).toBe(vals.length);
      queen.destroy();
    });
    await test("that the queen can listen to specific drones (i.e., not all drones)", async () => {
      const queen = new Queen("worker-bundle.js", 5);
      const subset = queen.hive.slice(3);
      let count2 = 0;
      const unsub = queen.on(
        "message-from-some-drones",
        (request, response) => {
          count2++;
          return response.send();
        },
        subset
      );
      await queen.command("some-call-back");
      await pauseAsync(1e3);
      expect(count2).toBe(subset.length);
      unsub();
      queen.destroy();
    });
    await test("that queens can send commands to drones that aren't in their hives", async () => {
      const queen = new Queen();
      const drone = new Drone("worker-bundle.js");
      const n = await queen.command("send-favorite-number", null, drone);
      expect(typeof n === "number" && n >= 0 && n <= 1).toBe(true);
      queen.destroy();
      drone.destroy();
    });
    await test("that queens can have drones from different worker scripts in their hives", async () => {
      const queen = new Queen();
      queen.addDrone("worker-bundle.js");
      queen.addDrone("worker2-bundle.js");
      const results = await queen.command("send-filename");
      expect(results.includes("worker.js")).toBe(true);
      expect(results.includes("worker2.js")).toBe(true);
      queen.destroy();
    });
    await test("that drones can be run as modules and use `import`", async () => {
      const queen = new Queen();
      queen.addDrone("worker3-bundle.js", { type: "module" });
      const result = await queen.command("add-some-numbers", {
        a: 234,
        b: 567
      });
      expect(result).toBe(234 + 567);
    });
    const done = document.createElement("div");
    done.classList.add("result");
    done.classList.add("info");
    done.innerHTML = "DONE!";
    document.querySelector("#container").appendChild(done);
  }
  runTests();
})();
