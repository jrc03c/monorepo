(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/index.mjs
  var index_exports = {};
  __export(index_exports, {
    IndexMatcher: () => IndexMatcher2,
    KMeans: () => KMeans,
    MathError: () => MathError,
    OutlierMitigator: () => OutlierMitigator,
    StandardScaler: () => StandardScaler,
    cohensd: () => cohensd,
    convertToNumerical: () => convertToNumerical,
    diagonalize: () => diagonalize,
    getCorrelationMatrix: () => getCorrelationMatrix,
    getHighlyCorrelatedColumns: () => getHighlyCorrelatedColumns,
    getMagnitude: () => getMagnitude,
    getOneHotEncodings: () => getOneHotEncodings,
    getPValueMatrix: () => getPValueMatrix,
    getPercentages: () => getPercentages,
    hunterChainSort: () => hunterChainSort,
    isBinary: () => isBinary,
    isCorrelationMatrix: () => isCorrelationMatrix,
    isWholeNumber: () => isWholeNumber2,
    normalize: () => normalize,
    orthonormalize: () => orthonormalize,
    pValue: () => ttest,
    project: () => project,
    rScore: () => rScore,
    rSquared: () => rSquared,
    standardize: () => standardize,
    trainTestSplit: () => trainTestSplit
  });

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

  // node_modules/@jrc03c/js-math-tools/src/argmax.mjs
  function argmax(x, shouldDropNaNs) {
    if (isDataFrame(x)) {
      const index = argmax(x.values, shouldDropNaNs);
      return [x.index[index[0]], x.columns[index[1]]];
    }
    if (isSeries(x)) {
      const index = argmax(x.values, shouldDropNaNs);
      return x.index[index];
    }
    assert(
      isArray(x),
      "The `argmax` function only works on arrays, Series, and DataFrames!"
    );
    try {
      const out = indexOf(x, max(x, shouldDropNaNs));
      if (out) {
        if (out.length === 0) {
          return void 0;
        } else if (out.length === 1) {
          return out[0];
        } else {
          return out;
        }
      } else {
        return void 0;
      }
    } catch (e) {
      return void 0;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/min.mjs
  function min(arr, shouldDropNaNs) {
    return stats(arr, { shouldDropNaNs }).min;
  }

  // node_modules/@jrc03c/js-math-tools/src/argmin.mjs
  function argmin(x, shouldDropNaNs) {
    if (isDataFrame(x)) {
      const index = argmin(x.values, shouldDropNaNs);
      return [x.index[index[0]], x.columns[index[1]]];
    }
    if (isSeries(x)) {
      const index = argmin(x.values, shouldDropNaNs);
      return x.index[index];
    }
    assert(
      isArray(x),
      "The `argmin` function only works on arrays, Series, and DataFrames!"
    );
    try {
      const out = indexOf(x, min(x, shouldDropNaNs));
      if (out) {
        if (out.length === 0) {
          return void 0;
        } else if (out.length === 1) {
          return out[0];
        } else {
          return out;
        }
      } else {
        return void 0;
      }
    } catch (e) {
      return void 0;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/cast.mjs
  function cast(value, type) {
    if (isDataFrame(value) || isSeries(value)) {
      return value.apply((item) => cast(item, type));
    }
    if (isArray(value)) {
      return value.map((v) => cast(v, type));
    }
    if (type === "null") {
      return null;
    }
    if (type === "number") {
      if (isUndefined(value)) {
        return NaN;
      }
      const booleanValue = cast(value, "boolean");
      if (isBoolean(booleanValue)) {
        return booleanValue ? 1 : 0;
      }
      try {
        JSON.parse(value);
      } catch (e) {
        const dateValue = cast(value, "date");
        if (isDate(dateValue)) {
          return dateValue.getTime();
        }
      }
      const out = parseFloat(value);
      if (isNaN(out)) return NaN;
      return out;
    }
    if (type === "int") {
      const out = cast(value, "number");
      return out >= 0 ? Math.floor(out) : Math.ceil(out);
    }
    if (type === "float") {
      return cast(value, "number");
    }
    if (type === "bigint") {
      if (typeof value === "bigint") {
        return value;
      }
      return BigInt(cast(value, "int"));
    }
    if (type === "boolean") {
      if (isBoolean(value)) {
        return value;
      }
      if (isNumber(value)) {
        if (value === 0) {
          return false;
        }
        if (value === 1) {
          return true;
        }
        return null;
      }
      try {
        const vBool = (typeof value === "object" ? value.toString() === "null" ? "false" : JSON.stringify(value) : value.toString()).trim().toLowerCase();
        if (vBool === "true" || vBool === "yes" || vBool === "y") {
          return true;
        }
        if (vBool === "false" || vBool === "no" || vBool === "n") {
          return false;
        }
        return null;
      } catch (e) {
        return null;
      }
    }
    if (type === "date") {
      if (isDate(value)) {
        return value;
      }
      if (isUndefined(value)) {
        return null;
      }
      const valueFloat = parseFloat(value);
      if (!isNaN(valueFloat)) {
        const out = new Date(value);
        if (!isDate(out)) return null;
        return out;
      }
      const valueDate = Date.parse(value);
      if (!isNaN(valueDate)) {
        return new Date(valueDate);
      }
      return null;
    }
    if (type === "object") {
      if (isObject(value)) {
        return value;
      }
      const booleanValue = cast(value, "boolean");
      if (isBoolean(booleanValue)) {
        return null;
      }
      try {
        const numberValue = cast(value, "number");
        if (isNumber(numberValue)) {
          JSON.parse(value);
          return null;
        }
      } catch (e) {
      }
      const dateValue = cast(value, "date");
      if (dateValue) {
        return dateValue;
      }
      try {
        const out = JSON.parse(value);
        if (isArray(out)) {
          return out.map((v) => cast(v, type));
        } else {
          return out;
        }
      } catch (e) {
        return null;
      }
    }
    if (type === "string") {
      if (isUndefined(value)) {
        if (isEqual(value, void 0)) {
          return "undefined";
        }
        return "null";
      }
      if (value instanceof Date) {
        return value.toJSON();
      }
      const valueString = (() => {
        if (typeof value === "object") {
          if (value === null) {
            return "null";
          } else {
            return JSON.stringify(value);
          }
        } else {
          return value.toString();
        }
      })();
      return valueString;
    }
  }

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

  // node_modules/@jrc03c/js-math-tools/src/intersect.mjs
  function intersect() {
    const arrays = Object.values(arguments).map((x) => {
      if (isDataFrame(x) || isSeries(x)) {
        return set(x.values);
      }
      assert(
        isArray(x),
        "The `intersect` function only works on arrays, Series, and DataFrames!"
      );
      return set(x);
    });
    const all = set(arrays);
    return all.filter((v) => {
      return arrays.every((arr) => arr.findIndex((other) => isEqual(other, v)) > -1);
    });
  }

  // node_modules/@jrc03c/js-math-tools/src/index-matcher.mjs
  var IndexMatcher = class _IndexMatcher {
    static DROP_NAN_MODE = "DROP_NAN_MODE";
    static DROP_MISSING_MODE = "DROP_MISSING_MODE";
    constructor(mode2) {
      assert(
        isUndefined(mode2) || mode2 === _IndexMatcher.DROP_NAN_MODE || mode2 === _IndexMatcher.DROP_MISSING_MODE,
        "The `mode` value passed into the `IndexMatcher` constructor must be undefined or one of [IndexMatcher.DROP_NAN_MODE, IndexMatcher.DROP_MISSING_MODE]! (By default, the mode is `Indexer.DROP_MISSING_MODE`.)"
      );
      this.mode = !isUndefined(mode2) ? mode2 : _IndexMatcher.DROP_NAN_MODE;
      this.index = null;
    }
    fit() {
      const indices = [];
      Object.values(arguments).forEach((x) => {
        if (isArray(x)) {
          const xshape = shape(x);
          if (xshape.length === 1) {
            x = new Series(x);
          } else if (xshape.length === 2) {
            x = new DataFrame(x);
          } else {
            throw new Error(
              "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!"
            );
          }
        }
        assert(
          isDataFrame(x) || isSeries(x),
          "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!"
        );
        if (this.mode === _IndexMatcher.DROP_MISSING_MODE) {
          indices.push(x.dropMissing().index);
        } else {
          indices.push(x.dropNaN().index);
        }
      });
      this.index = intersect(...indices);
      return this;
    }
    transform() {
      assert(
        !!this.index,
        "The IndexMatcher hasn't been fitted yet! Please call the `fit` method before calling the `transform` method."
      );
      const out = Object.values(arguments).map((x) => {
        if (isArray(x)) {
          const xshape = shape(x);
          if (xshape.length === 1) {
            return new Series(x).get(this.index).values;
          } else if (xshape.length === 2) {
            return new DataFrame(x).get(this.index, null).values;
          } else {
            throw new Error(
              "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!"
            );
          }
        }
        assert(
          isDataFrame(x) || isSeries(x),
          "The `IndexMatcher.fit` method only works on arrays, Series, and DataFrames!"
        );
        return x.get(this.index, null);
      });
      return out.length === 1 ? out[0] : out;
    }
    fitAndTransform() {
      return this.fit(...arguments).transform(...arguments);
    }
  };

  // node_modules/@jrc03c/js-math-tools/src/covariance.mjs
  function covariance(x, y, shouldDropNaNs, shouldAlsoReturnStatsObjects) {
    if (isSeries(x)) {
      return covariance(x.values, y, shouldDropNaNs, shouldAlsoReturnStatsObjects);
    }
    if (isSeries(y)) {
      return covariance(x, y.values, shouldDropNaNs, shouldAlsoReturnStatsObjects);
    }
    assert(
      isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
      "The `covariance` function only works on 1-dimensional arrays and Series!"
    );
    assert(
      x.length === y.length,
      "The two arrays or Series passed into the `covariance` function must have the same length!"
    );
    if (shouldDropNaNs) {
      return covariance(
        ...new IndexMatcher().fitAndTransform(x, y),
        false,
        shouldAlsoReturnStatsObjects
      );
    }
    try {
      const xstats = stats(x, { stdev: shouldAlsoReturnStatsObjects });
      const ystats = stats(y, { stdev: shouldAlsoReturnStatsObjects });
      const mx = Number(xstats.mean);
      const my = Number(ystats.mean);
      if (!isNumber(mx) || !isNumber(my)) {
        return NaN;
      }
      const n = Math.max(x.length, y.length);
      let out = 0;
      for (let i = 0; i < n; i++) {
        let vx = x[i];
        let vy = y[i];
        if (!isNumber(vx)) return NaN;
        if (!isNumber(vy)) return NaN;
        if (typeof vx === "bigint") {
          vx = Number(vx);
        }
        if (typeof vy === "bigint") {
          vy = Number(vy);
        }
        out += (vx - mx) * (vy - my);
      }
      if (shouldAlsoReturnStatsObjects) {
        return [out / x.length, xstats, ystats];
      } else {
        return out / x.length;
      }
    } catch (e) {
      return NaN;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/correl.mjs
  function correl(x, y, shouldDropNaNs) {
    if (isSeries(x)) {
      return correl(x.values, y, shouldDropNaNs);
    }
    if (isSeries(y)) {
      return correl(x, y.values, shouldDropNaNs);
    }
    assert(
      isArray(x) && isArray(y) && shape(x).length === 1 && shape(y).length === 1,
      "The `correl` function only works on 1-dimensional arrays and Series!"
    );
    assert(
      x.length === y.length,
      "The two arrays or Series passed into the `correl` function must have the same length!"
    );
    try {
      const shouldAlsoReturnStatsObjects = true;
      const [num, xstats, ystats] = covariance(
        x,
        y,
        shouldDropNaNs,
        shouldAlsoReturnStatsObjects
      );
      const den = xstats.stdev * ystats.stdev;
      return num / den;
    } catch (e) {
      return NaN;
    }
  }

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

  // node_modules/@jrc03c/js-math-tools/src/scale.mjs
  function scale() {
    return vmultiply(...arguments);
  }

  // node_modules/@jrc03c/js-math-tools/src/subtract.mjs
  function subtract(a, b) {
    return vadd(a, scale(b, -1));
  }

  // node_modules/@jrc03c/js-math-tools/src/sum.mjs
  function sum(arr, shouldDropNaNs) {
    return stats(arr, { shouldDropNaNs }).sum;
  }

  // node_modules/@jrc03c/js-math-tools/src/divide.mjs
  function divide(a, b) {
    return scale(a, vpow(b, -1));
  }

  // node_modules/@jrc03c/js-math-tools/src/dot.mjs
  function dot(a, b) {
    if (isDataFrame(a)) {
      const temp = dot(a.values, b);
      if (shape(temp).length === 1) {
        const out = new Series(temp);
        out.name = isSeries(b) ? b.name : out.name;
        out.index = a.index.slice();
        return out;
      } else {
        const out = new DataFrame(temp);
        out.index = a.index.slice();
        if (isDataFrame(b)) {
          out.columns = b.columns.slice();
        }
        return out;
      }
    }
    if (isDataFrame(b)) {
      const temp = dot(a, b.values);
      if (shape(temp).length === 1) {
        const out = new Series(temp);
        out.name = isSeries(a) ? a.name : out.name;
        out.index = b.columns.slice();
        return out;
      } else {
        const out = new DataFrame(temp);
        out.columns = b.columns.slice();
        return out;
      }
    }
    if (isSeries(a)) {
      return dot(a.values, b);
    }
    if (isSeries(b)) {
      return dot(a, b.values);
    }
    assert(
      isArray(a) && isArray(b),
      "The `dot` function only works on arrays, Series, and DataFrames!"
    );
    const aShape = shape(a);
    const bShape = shape(b);
    assert(
      aShape.length <= 2 && bShape.length <= 2,
      "I'm not smart enough to know how to get the dot-product of arrays that have more than 2 dimensions. Sorry for the inconvenience! Please only pass 1- or 2-dimensional arrays into the `dot` function!"
    );
    assert(
      aShape[aShape.length - 1] === bShape[0],
      `There's a dimension misalignment in the two arrays you passed into the \`dot\` function. (${aShape[aShape.length - 1]} !== ${bShape[0]})`
    );
    if (aShape.length === 1 && bShape.length === 1) {
      return sum(scale(a, b));
    } else if (aShape.length === 1 && bShape.length === 2) {
      return transpose(b).map((col) => dot(a, col));
    } else if (aShape.length === 2 && bShape.length === 1) {
      return a.map((row) => dot(row, b));
    } else if (aShape.length === 2 && bShape.length === 2) {
      const bTranspose = transpose(b);
      const out = [];
      for (let i = 0; i < a.length; i++) {
        const row = [];
        for (let j = 0; j < bTranspose.length; j++) {
          row.push(dot(a[i], bTranspose[j]));
        }
        out.push(row);
      }
      return out;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/drop-nan-pairwise.mjs
  function dropNaNPairwise(a, b) {
    if (isDataFrame(a) || isSeries(a)) {
      return dropNaNPairwise(a.values, b);
    }
    if (isDataFrame(b) || isSeries(b)) {
      return dropNaNPairwise(a, b.values);
    }
    assert(
      isArray(a) && isArray(b),
      "The `dropNaNPairwise` only works on arrays, Series, and DataFrames!"
    );
    assert(
      isEqual(shape(a), shape(b)),
      "The two arrays, Series, and/or DataFrames passed into the `dropNaNPairwise` must have the same shape!"
    );
    const aOut = [];
    const bOut = [];
    for (let i = 0; i < a.length; i++) {
      try {
        const [aChildren, bChildren] = dropNaNPairwise(a[i], b[i]);
        aOut.push(aChildren);
        bOut.push(bChildren);
      } catch (e) {
        if (isNumber(a[i]) && isNumber(b[i])) {
          aOut.push(a[i]);
          bOut.push(b[i]);
        }
      }
    }
    return [aOut, bOut];
  }

  // node_modules/@jrc03c/js-math-tools/src/every.mjs
  function every(x, fn) {
    if (isDataFrame(x) || isSeries(x)) {
      return every(x.values, fn);
    }
    assert(
      isArray(x),
      "The first argument passed into the `every` function must be an array, Series, or DataFrame!"
    );
    assert(
      isFunction(fn),
      "The second argument passed into the `every` function must be a function!"
    );
    for (const v of x) {
      if (isArray(v)) {
        if (!every(v, fn)) {
          return false;
        }
      } else {
        if (!fn(v)) {
          return false;
        }
      }
    }
    return true;
  }

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

  // node_modules/@jrc03c/js-math-tools/src/zeros.mjs
  function zeros(shape2) {
    if (isNumber(shape2)) shape2 = [shape2];
    const out = [];
    const n = product(shape2);
    for (let i = 0; i < n; i++) out.push(0);
    return reshape(out, shape2);
  }

  // node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.mjs
  var booleanValues = ["true", "false", "yes", "no"];

  // node_modules/@jrc03c/js-math-tools/src/helpers/null-values.mjs
  var nullValues = ["null", "none", "nan", "na", "n/a", "", "undefined"];

  // node_modules/@jrc03c/js-math-tools/src/infer-type.mjs
  function checkIfInteger(results) {
    if (results.type === "number") {
      if (typeof results.value !== "undefined") {
        results.isInteger = vint(results.value) === results.value;
      } else {
        results.isInteger = every(
          results.values,
          (v) => isNumber(v) ? vint(v) === v : true
        );
      }
    }
    return results;
  }
  function inferType(arr) {
    if (isDataFrame(arr)) {
      const out = arr.copy();
      const results = inferType(arr.values);
      out.values = results.values;
      return checkIfInteger({ type: results.type, values: out });
    }
    if (isSeries(arr)) {
      const out = arr.copy();
      const results = inferType(arr.values);
      out.values = results.values;
      return checkIfInteger({ type: results.type, values: out });
    }
    if (!isArray(arr)) {
      const out = inferType([arr]);
      out.value = out.values[0];
      delete out.values;
      return checkIfInteger(out);
    }
    assert(
      isArray(arr),
      "The `inferType` function only works on arrays, Series, and DataFrames!"
    );
    const types = flatten(arr).map((v) => {
      if (v === void 0) return "null";
      try {
        if (typeof v === "object") {
          const temp = new Date(v.getTime());
          if (isDate(temp)) {
            return "date";
          }
        }
      } catch (e) {
      }
      if (!isString(v)) {
        if (typeof v === "bigint") {
          v = v.toString() + "n";
        } else {
          v = JSON.stringify(v);
        }
      }
      const vLower = v.toLowerCase();
      const vLowerTrimmed = vLower.trim();
      if (nullValues.indexOf(vLowerTrimmed) > -1) {
        return "null";
      }
      if (booleanValues.indexOf(vLowerTrimmed) > -1) {
        return "boolean";
      }
      try {
        if (v.match(/^-?\d+n$/g)) {
          return "bigint";
        }
        const vParsed = JSON.parse(v);
        if (isNumber(vParsed)) {
          return "number";
        }
        if (typeof vParsed === "object") {
          if (isArray(vParsed)) return "string";
          return "object";
        }
        return "string";
      } catch (e) {
        const vDate = new Date(v);
        if (isDate(vDate)) {
          return "date";
        }
        return "string";
      }
    });
    const counts = count(types);
    const sortedValues = counts.values.toSorted(
      (a, b) => counts.get(b) - counts.get(a)
    );
    const primaryType = sortedValues[0];
    return checkIfInteger({
      type: primaryType,
      values: vapply(arr, (v) => cast(v, primaryType))
    });
  }

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

  // node_modules/@jrc03c/js-math-tools/src/mean.mjs
  function mean(arr, shouldDropNaNs) {
    return stats(arr, { shouldDropNaNs }).mean;
  }

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
  function remap(x, a, b, c, d) {
    if (isArray(x) && isUndefined(c) && isUndefined(d)) {
      c = a;
      d = b;
      const results = stats(x);
      a = results.min;
      b = results.max;
    }
    return helper4(x, a, b, c, d);
  }

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

  // src/cohens-d.mjs
  function cohensd(arr1, arr2, shouldIgnoreNaNs) {
    if (isSeries(arr1)) {
      return cohensd(arr1.values, arr2);
    }
    if (isSeries(arr2)) {
      return cohensd(arr1, arr2.values);
    }
    assert(
      isArray(arr1) && isArray(arr2) && shape(arr1).length === 1 && shape(arr2).length === 1,
      "The `cohensd` function only works on 1-dimensional arrays and Series!"
    );
    assert(
      arr1.length === arr2.length,
      "Two arrays or Series passed into the `cohensd` function must have the same length!"
    );
    if (shouldIgnoreNaNs) {
      const results = new IndexMatcher().fitAndTransform(arr1, arr2);
      arr1 = results[0];
      arr2 = results[1];
    }
    try {
      const stats1 = stats(arr1, { variance: true });
      const stats2 = stats(arr2, { variance: true });
      const m1 = stats1.mean;
      const m2 = stats2.mean;
      return (m1 - m2) / Math.sqrt((stats1.variance + stats2.variance) / 2);
    } catch (e) {
      return NaN;
    }
  }

  // src/get-one-hot-encodings.mjs
  function simpleStringify(x) {
    if (typeof x === "bigint") {
      return x.toString() + "n";
    } else {
      return x;
    }
  }
  function getOneHotEncodings() {
    if (arguments.length === 1 && isSeries(arguments[0])) {
      const { name: name2, values: values2 } = arguments[0];
      const encodings = getOneHotEncodings(name2, values2);
      const out2 = new DataFrame(encodings);
      out2.index = arguments[0].index.slice();
      return out2;
    }
    const [name, values] = arguments;
    assert(
      isString(name),
      "When passing two arguments into the `getOneHotEncodings` function, the first argument must be a string representing the name of the variable being encoded!"
    );
    assert(
      isArray(values) && shape(values).length === 1,
      "When passing two arguments into the `getOneHotEncodings` function, the second argument must be a 1-dimensional array!"
    );
    const out = {};
    const colNames = sort(set(values)).filter((v) => typeof v !== "number" || v.toString() !== "NaN").filter((v) => !isUndefined(v)).map((v) => name + "_" + simpleStringify(v)).slice(0, -1);
    colNames.forEach((colName) => {
      out[colName] = values.map((v) => {
        if (colName === name + "_" + simpleStringify(v)) {
          return 1;
        }
        if (typeof v === "number" && v.toString() === "NaN") {
          return NaN;
        }
        if (isUndefined(v)) {
          return NaN;
        }
        return 0;
      });
    });
    return out;
  }

  // src/is-whole-number.mjs
  function isWholeNumber2(x) {
    return isNumber(x) && x >= 0 && Math.floor(x) === x && x < Infinity;
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

  // src/convert-to-numerical.mjs
  function convertToNumerical(df, config) {
    config = config || {};
    const maxUniqueValues = isNumber(config.maxUniqueValues) ? config.maxUniqueValues : 7;
    const minNonMissingValues = isNumber(config.minNonMissingValues) ? config.minNonMissingValues : 15;
    const maxCorrelationThreshold = isNumber(config.maxCorrelationThreshold) ? config.maxCorrelationThreshold : 1 - 1e-5;
    const progress = config.progress || null;
    if (isArray(df)) {
      assert(
        shape(df).length === 2 && !isJagged(df),
        "The `convertToNumerical` function only works on non-jagged 2-dimensional arrays and DataFrames!"
      );
      return convertToNumerical(new DataFrame(df));
    }
    assert(
      isDataFrame(df),
      "You must pass a DataFrame into the `convertToNumerical` function!"
    );
    assert(
      isWholeNumber2(maxUniqueValues),
      "`maxUniqueValues` must be a whole number!"
    );
    assert(
      isWholeNumber2(minNonMissingValues),
      "`minNonMissingValues` must be a whole number!"
    );
    assert(
      isNumber(maxCorrelationThreshold),
      "`maxCorrelationThreshold` must be a number!"
    );
    if (!isUndefined(progress)) {
      assert(isFunction(progress), "If defined, `progress` must be a function!");
    }
    const out = {};
    const shouldIgnoreNaNs = true;
    df.apply((col, colIndex) => {
      if (progress) {
        progress(colIndex / df.columns.length);
      }
      const inferred = inferType(col.values);
      if (inferred.type === "boolean") {
        inferred.values = inferred.values.map((v) => v ? 1 : 0);
      }
      if (inferred.type === "date") {
        inferred.values = inferred.values.map((v) => {
          try {
            return v.getTime();
          } catch (e) {
            return NaN;
          }
        });
      }
      if (inferred.type === "null") {
        return;
      }
      if (inferred.type === "number" || inferred.type === "bigint") {
      }
      if (inferred.type === "object") {
        inferred.values = inferred.values.map((v) => stringify(v));
      }
      if (inferred.type === "string") {
      }
      const nonMissingValues = inferred.values.filter((v) => !isUndefined(v));
      if (inferred.values.length - nonMissingValues.length > minNonMissingValues.length) {
        return;
      }
      if (inferred.type !== "boolean") {
        const counts = sort(
          count(nonMissingValues).toArray().filter((item) => !isUndefined(item.value) && isNumber(item.count)),
          (a, b) => b.count - a.count
        );
        const topNPercent = sum(
          counts.slice(0, maxUniqueValues).map((item) => item.count),
          shouldIgnoreNaNs
        ) / nonMissingValues.length;
        if (topNPercent >= 0.9) {
          if (counts.length < 2) {
            return;
          }
          const oneHotEncodings = getOneHotEncodings(col.name, inferred.values);
          while (Object.keys(oneHotEncodings).length > 0) {
            const key = Object.keys(oneHotEncodings)[0];
            const values = oneHotEncodings[key];
            delete oneHotEncodings[key];
            const otherColNames = Object.keys(out);
            for (let i = 0; i < otherColNames.length; i++) {
              const otherColValues = out[otherColNames[i]];
              const r = correl(values, otherColValues, shouldIgnoreNaNs);
              if (r > maxCorrelationThreshold) {
                return;
              }
            }
            out[key] = values;
          }
          return;
        }
        if (inferred.type === "object" || inferred.type === "string") {
          return;
        }
      }
      if (inferred.type === "boolean" || inferred.type === "date" || inferred.type === "number" || inferred.type === "bigint") {
        const otherColNames = Object.keys(out);
        for (let i = 0; i < otherColNames.length; i++) {
          const otherColValues = out[otherColNames[i]];
          const r = correl(inferred.values, otherColValues, shouldIgnoreNaNs);
          if (r > maxCorrelationThreshold) {
            return;
          }
        }
        out[col.name] = inferred.values;
      }
    });
    return new DataFrame(out);
  }

  // src/diagonalize.mjs
  function diagonalize(x) {
    if (isSeries(x)) {
      const out2 = new DataFrame(diagonalize(x.values));
      out2.index = x.index.slice();
      out2.columns = x.index.slice();
      return out2;
    }
    assert(
      isArray(x),
      "The `diagonalize` function only works on 1-dimensional arrays and Series!"
    );
    const xShape = shape(x);
    assert(
      xShape.length === 1,
      "The `diagonalize` function only works on 1-dimensional arrays and Series!"
    );
    const isAllBigInts = x.every((v) => typeof v === "bigint");
    const out = zeros([xShape[0], xShape[0]]);
    x.forEach((v, i) => out[i][i] = v);
    if (isAllBigInts) {
      for (let i = 0; i < out.length; i++) {
        for (let j = 0; j < out[i].length; j++) {
          try {
            out[i][j] = BigInt(out[i][j]);
          } catch (e) {
          }
        }
      }
    }
    return out;
  }

  // src/get-correlation-matrix.mjs
  function stamp(x) {
    const prop = "@jrc03c/js-data-science-helpers/get-correlation-matrix";
    Object.defineProperty(x, prop, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Symbol.for(prop)
    });
    return x;
  }
  function getCorrelationMatrix(a, b, shouldIgnoreNaNs) {
    if (isUndefined(b)) {
      b = a;
    }
    if (isDataFrame(a)) {
      const out2 = new DataFrame(getCorrelationMatrix(a.values, b));
      out2.index = a.columns.slice();
      out2.columns = isDataFrame(b) ? b.columns.slice() : new DataFrame(b).columns.slice();
      return stamp(out2);
    }
    if (isDataFrame(b)) {
      const out2 = new DataFrame(getCorrelationMatrix(a, b.values));
      out2.index = isDataFrame(a) ? a.columns.slice() : new DataFrame(a).columns.slice();
      out2.columns = b.columns.slice();
      return stamp(out2);
    }
    assert(
      isArray(a) && isArray(b),
      "The `getCorrelationMatrix` function only works on 2-dimensional arrays and DataFrames!"
    );
    assert(
      !isJagged(a) && !isJagged(b),
      "The `getCorrelationMatrix` function only works on non-jagged 2-dimensional arrays and DataFrames!"
    );
    assert(
      a.length === b.length,
      `The dimensions of the matrices you passed into the \`getCorrelationMatrix\` function aren't compatible! ([shape(a).join(", ")] vs. [shape(b).join(", ")]) The function expects that you'll be comparing the columns of two matrices where the columns are all of the same length, so please make sure that the matrices are oriented accordingly.`
    );
    const out = ndarray([a[0].length, b[0].length]);
    for (let i = 0; i < a[0].length; i++) {
      const acol = a.map((row) => row[i]);
      for (let j = 0; j < b[0].length; j++) {
        const bcol = b.map((row) => row[j]);
        if (shouldIgnoreNaNs) {
          out[i][j] = correl(...dropNaNPairwise(acol, bcol));
        } else {
          out[i][j] = correl(acol, bcol);
        }
      }
    }
    return stamp(vclamp(out, -1, 1));
  }

  // src/get-highly-correlated-columns.mjs
  function getHighlyCorrelatedColumns(x, threshold, shouldIgnoreNaNs) {
    threshold = isUndefined(threshold) ? 1 - 1e-5 : threshold;
    if (!isDataFrame(x)) {
      x = new DataFrame(x);
    }
    const xshape = shape(x);
    assert(
      (isArray(x) || isDataFrame(x)) && xshape.length === 2,
      "The first argument passed into the `getHighlyCorrelatedColumns` function must be a 2-dimensional array or DataFrame!"
    );
    assert(
      isNumber(threshold) && threshold >= -1 && threshold <= 1,
      "The second argument passed into the `getHighlyCorrelatedColumns` must be a number in the range [-1, 1] representing the threshold above which two columns will be considered to be highly correlated!"
    );
    const out = {};
    if (shouldIgnoreNaNs) {
      x = x.dropNaN();
    }
    for (let i = 0; i < xshape[1] - 1; i++) {
      for (let j = i + 1; j < xshape[1]; j++) {
        const col1 = x.columns[i];
        const col2 = x.columns[j];
        const r = correl(x.get(col1), x.get(col2));
        if (r > threshold) {
          if (!out[col1]) {
            out[col1] = [];
          }
          out[col1].push({ column: col2, correlation: r });
          if (!out[col2]) {
            out[col2] = [];
          }
          out[col2].push({ column: col1, correlation: r });
        }
      }
    }
    Object.keys(out).forEach((key) => {
      out[key] = sort(out[key], (a, b) => a.column < b.column ? -1 : 1);
    });
    return out;
  }

  // src/get-magnitude.mjs
  function getMagnitude(x, shouldIgnoreNaNs) {
    if (isDataFrame(x) || isSeries(x)) {
      return getMagnitude(x.values);
    }
    if (isNumber(x)) {
      return vabs(x);
    }
    if (isArray(x)) {
      if (shouldIgnoreNaNs) {
        x = dropNaN(x);
      }
      return vsqrt(sum(vpow(x, 2)));
    }
    return NaN;
  }

  // src/get-percentages.mjs
  function getPercentages(x, shouldIgnoreNaNs) {
    const results = stats(x, { shouldDropNaNs: shouldIgnoreNaNs });
    const n = shouldIgnoreNaNs ? results.nWithoutNaNs : results.n;
    return results.counts.values.filter((v) => isNumber(v) || !shouldIgnoreNaNs).map((v) => {
      const c = results.counts.get(v);
      return { value: v, count: c, percentage: c / n };
    });
  }

  // src/z-table.mjs
  var zTable = [
    0.5,
    0.49601,
    0.49202,
    0.48803,
    0.48405,
    0.48006,
    0.47608,
    0.4721,
    0.46812,
    0.46414,
    0.46017,
    0.4562,
    0.45224,
    0.44828,
    0.44433,
    0.44038,
    0.4364,
    0.43251,
    0.42858,
    0.42465,
    0.42074,
    0.41683,
    0.41294,
    0.40905,
    0.40517,
    0.40129,
    0.39743,
    0.39358,
    0.38974,
    0.38591,
    0.38209,
    0.37828,
    0.37448,
    0.3707,
    0.36693,
    0.36317,
    0.35942,
    0.35569,
    0.35197,
    0.34827,
    0.34458,
    0.3409,
    0.33724,
    0.3336,
    0.32997,
    0.32636,
    0.32276,
    0.31918,
    0.31561,
    0.31207,
    0.30854,
    0.30503,
    0.30153,
    0.29806,
    0.2946,
    0.29116,
    0.28774,
    0.28434,
    0.28096,
    0.2776,
    0.27425,
    0.27093,
    0.26763,
    0.26435,
    0.26109,
    0.25785,
    0.25463,
    0.25143,
    0.24825,
    0.2451,
    0.24196,
    0.23885,
    0.23576,
    0.2327,
    0.22965,
    0.22663,
    0.22363,
    0.22065,
    0.2177,
    0.21476,
    0.21186,
    0.20897,
    0.20611,
    0.20327,
    0.20045,
    0.19766,
    0.19489,
    0.19215,
    0.18943,
    0.18673,
    0.18406,
    0.18141,
    0.17879,
    0.17619,
    0.17361,
    0.17106,
    0.16853,
    0.16602,
    0.16354,
    0.16109,
    0.15866,
    0.15625,
    0.15386,
    0.15151,
    0.14917,
    0.14686,
    0.14457,
    0.14231,
    0.14007,
    0.13786,
    0.13567,
    0.1335,
    0.13136,
    0.12924,
    0.12714,
    0.12507,
    0.12302,
    0.121,
    0.119,
    0.11702,
    0.11507,
    0.11314,
    0.11123,
    0.10935,
    0.10749,
    0.10565,
    0.10383,
    0.10204,
    0.10027,
    0.09853,
    0.0968,
    0.0951,
    0.09342,
    0.09176,
    0.09012,
    0.08851,
    0.08692,
    0.08534,
    0.08379,
    0.08226,
    0.08076,
    0.07927,
    0.0778,
    0.07636,
    0.07493,
    0.07353,
    0.07215,
    0.07078,
    0.06944,
    0.06811,
    0.06681,
    0.06552,
    0.06426,
    0.06301,
    0.06178,
    0.06057,
    0.05938,
    0.05821,
    0.05705,
    0.05592,
    0.0548,
    0.0537,
    0.05262,
    0.05155,
    0.0505,
    0.04947,
    0.04846,
    0.04746,
    0.04648,
    0.04551,
    0.04457,
    0.04363,
    0.04272,
    0.04182,
    0.04093,
    0.04006,
    0.0392,
    0.03836,
    0.03754,
    0.03673,
    0.03593,
    0.03515,
    0.03438,
    0.03362,
    0.03288,
    0.03216,
    0.03144,
    0.03074,
    0.03005,
    0.02938,
    0.02872,
    0.02807,
    0.02743,
    0.0268,
    0.02619,
    0.02559,
    0.025,
    0.02442,
    0.02385,
    0.0233,
    0.02275,
    0.02222,
    0.02169,
    0.02118,
    0.02068,
    0.02018,
    0.0197,
    0.01923,
    0.01876,
    0.01831,
    0.01786,
    0.01743,
    0.017,
    0.01659,
    0.01618,
    0.01578,
    0.01539,
    0.015,
    0.01463,
    0.01426,
    0.0139,
    0.01355,
    0.01321,
    0.01287,
    0.01255,
    0.01222,
    0.01191,
    0.0116,
    0.0113,
    0.01101,
    0.01072,
    0.01044,
    0.01017,
    99e-4,
    964e-5,
    939e-5,
    914e-5,
    889e-5,
    866e-5,
    842e-5,
    82e-4,
    798e-5,
    776e-5,
    755e-5,
    734e-5,
    714e-5,
    695e-5,
    676e-5,
    657e-5,
    639e-5,
    621e-5,
    604e-5,
    587e-5,
    57e-4,
    554e-5,
    539e-5,
    523e-5,
    508e-5,
    494e-5,
    48e-4,
    466e-5,
    453e-5,
    44e-4,
    427e-5,
    415e-5,
    402e-5,
    391e-5,
    379e-5,
    368e-5,
    357e-5,
    347e-5,
    336e-5,
    326e-5,
    317e-5,
    307e-5,
    298e-5,
    289e-5,
    28e-4,
    272e-5,
    264e-5,
    256e-5,
    248e-5,
    24e-4,
    233e-5,
    226e-5,
    219e-5,
    212e-5,
    205e-5,
    199e-5,
    193e-5,
    187e-5,
    181e-5,
    175e-5,
    169e-5,
    164e-5,
    159e-5,
    154e-5,
    149e-5,
    144e-5,
    139e-5,
    135e-5,
    131e-5,
    126e-5,
    122e-5,
    118e-5,
    114e-5,
    111e-5,
    107e-5,
    104e-5,
    1e-3,
    97e-5,
    94e-5,
    9e-4,
    87e-5,
    84e-5,
    82e-5,
    79e-5,
    76e-5,
    74e-5,
    71e-5,
    69e-5,
    66e-5,
    64e-5,
    62e-5,
    6e-4,
    58e-5,
    56e-5,
    54e-5,
    52e-5,
    5e-4,
    48e-5,
    47e-5,
    45e-5,
    43e-5,
    42e-5,
    4e-4,
    39e-5,
    38e-5,
    36e-5,
    35e-5,
    34e-5,
    32e-5,
    31e-5,
    3e-4,
    29e-5,
    28e-5,
    27e-5,
    26e-5,
    25e-5,
    24e-5,
    23e-5,
    22e-5,
    22e-5,
    21e-5,
    2e-4,
    19e-5,
    19e-5,
    18e-5,
    17e-5,
    17e-5,
    16e-5,
    15e-5,
    15e-5,
    14e-5,
    14e-5,
    13e-5,
    13e-5,
    12e-5,
    12e-5,
    11e-5,
    11e-5,
    1e-4,
    1e-4,
    1e-4,
    9e-5,
    9e-5,
    8e-5,
    8e-5,
    8e-5,
    8e-5,
    7e-5,
    7e-5,
    7e-5,
    6e-5,
    6e-5,
    6e-5,
    6e-5,
    5e-5,
    5e-5,
    5e-5,
    5e-5,
    5e-5,
    4e-5,
    4e-5,
    4e-5,
    4e-5,
    4e-5,
    4e-5,
    3e-5,
    3e-5,
    3e-5,
    3e-5,
    3e-5,
    3e-5,
    3e-5,
    3e-5,
    2e-5,
    2e-5,
    2e-5,
    2e-5
  ];

  // src/p-value.mjs
  function probability(z) {
    if (vabs(z) > 4.1) return 0;
    return zTable[vround(remap(vabs(z), 0, 4.1, 0, zTable.length))];
  }
  function ttest(a, b, shouldIgnoreNaNs) {
    if (isDataFrame(a) || isSeries(a)) {
      return ttest(a.values, b);
    }
    if (isDataFrame(b) || isSeries(b)) {
      return ttest(a, b.values);
    }
    assert(
      isArray(a) && isArray(b) && isEqual(shape(a), shape(b)),
      "You must pass two identically-shaped arrays, Series, or DataFrames into the `pValue` function!"
    );
    const [aTemp, bTemp] = shouldIgnoreNaNs ? dropNaNPairwise(flatten(a), flatten(b)) : [flatten(a), flatten(b)];
    if (aTemp.length === 0 || bTemp.length === 0) {
      return NaN;
    }
    const astats = stats(aTemp, { stdev: true });
    const bstats = stats(bTemp, { stdev: true });
    const m1 = astats.mean;
    const m2 = bstats.mean;
    const s1 = astats.stdev;
    const s2 = bstats.stdev;
    const n1 = aTemp.length;
    const n2 = bTemp.length;
    const t = (m1 - m2) / vsqrt(s1 * s1 / n1 + s2 * s2 / n2);
    return 2 * probability(t);
  }

  // src/get-p-value-matrix.mjs
  function stamp2(x) {
    const prop = "@jrc03c/js-data-science-helpers/get-p-value-matrix";
    Object.defineProperty(x, prop, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Symbol.for(prop)
    });
    return x;
  }
  function getPValueMatrix(a, b, shouldIgnoreNaNs) {
    if (isUndefined(b)) {
      b = a;
    }
    if (isDataFrame(a)) {
      const out2 = new DataFrame(getPValueMatrix(a.values, b));
      out2.index = a.columns.slice();
      out2.columns = isDataFrame(b) ? b.columns.slice() : new DataFrame(b).columns.slice();
      return stamp2(out2);
    }
    if (isDataFrame(b)) {
      const out2 = new DataFrame(getPValueMatrix(a, b.values));
      out2.index = isDataFrame(a) ? a.columns.slice() : new DataFrame(a).columns.slice();
      out2.columns = b.columns.slice();
      return stamp2(out2);
    }
    assert(
      isArray(a) && isArray(b),
      "The `getPValueMatrix` function only works on 2-dimensional arrays and DataFrames!"
    );
    assert(
      !isJagged(a) && !isJagged(b),
      "The `getPValueMatrix` function only works on non-jagged 2-dimensional arrays and DataFrames!"
    );
    assert(
      a.length === b.length,
      `The dimensions of the matrices you passed into the \`getPValueMatrix\` function aren't compatible! ([shape(a).join(", ")] vs. [shape(b).join(", ")]) The function expects that you'll be comparing the columns of two matrices where the columns are all of the same length, so please make sure that the matrices are oriented accordingly.`
    );
    const out = ndarray([a[0].length, b[0].length]);
    for (let i = 0; i < a[0].length; i++) {
      const acol = a.map((row) => row[i]);
      for (let j = 0; j < b[0].length; j++) {
        const bcol = b.map((row) => row[j]);
        if (shouldIgnoreNaNs) {
          out[i][j] = ttest(...dropNaNPairwise(acol, bcol));
        } else {
          out[i][j] = ttest(acol, bcol);
        }
      }
    }
    return stamp2(vclamp(out, 0, 1));
  }

  // src/hunter-chain-sort.mjs
  function hunterChainSort(c) {
    if (isArray(c)) {
      assert(
        shape(c).length === 2 && !isJagged(c),
        "The `hunterChainSort` function only works on non-jagged 2-dimensional arrays and DataFrames!"
      );
      const temp = new DataFrame(c);
      temp.index = temp.columns.slice();
      return hunterChainSort(temp).values;
    }
    assert(
      isDataFrame(c),
      "You must pass a 2-dimensional array or DataFrame into the `hunterChainSort` function!"
    );
    const shouldIgnoreNaNs = true;
    const freeRows = c.index.slice();
    const fixedRows = [];
    while (freeRows.length > 1) {
      if (fixedRows.length === 0) {
        const firstRowName = freeRows[argmax(
          freeRows.map(
            (rowName) => sum(vpow(c.values[c.index.indexOf(rowName)], 2), shouldIgnoreNaNs)
          ),
          shouldIgnoreNaNs
        )];
        freeRows.splice(freeRows.indexOf(firstRowName), 1);
        fixedRows.push(firstRowName);
      } else {
        const lastRowName = fixedRows.at(-1);
        const lastRow = c.values[c.index.indexOf(lastRowName)].filter(
          (v, i) => freeRows.includes(c.index[i])
        );
        const nextRowName = freeRows[argmax(lastRow, shouldIgnoreNaNs)];
        freeRows.splice(freeRows.indexOf(nextRowName), 1);
        fixedRows.push(nextRowName);
      }
    }
    fixedRows.push(freeRows[0]);
    const reversedFixedRows = reverse(fixedRows);
    const out = c.get(reversedFixedRows, null);
    return out;
  }

  // src/index-matcher.mjs
  var IndexMatcher2 = class _IndexMatcher {
    static DROP_NAN_MODE = "DROP_NAN_MODE";
    static DROP_MISSING_MODE = "DROP_MISSING_MODE";
    constructor(mode2) {
      const self2 = this;
      assert(
        isUndefined(mode2) || mode2 === _IndexMatcher.DROP_NAN_MODE || mode2 === _IndexMatcher.DROP_MISSING_MODE,
        "The `mode` value passed into the `IndexMatcher` constructor must be undefined or one of [IndexMatcher.DROP_NAN_MODE, IndexMatcher.DROP_MISSING_MODE]! (By default, the mode is `Indexer.DROP_MISSING_MODE`.)"
      );
      self2.mode = !isUndefined(mode2) ? mode2 : _IndexMatcher.DROP_MISSING_MODE;
      self2.index = null;
    }
    fit() {
      const self2 = this;
      const indices = [];
      Object.values(arguments).forEach((x) => {
        assert(
          isDataFrame(x) || isSeries(x),
          "The `IndexMatcher` only works on Series and DataFrames! To drop NaN values in a pair-wise fashion from regular arrays, use the `dropNaNPairwise` function from the @jrc03c/js-math-tools library."
        );
        if (self2.mode === _IndexMatcher.DROP_MISSING_MODE) {
          indices.push(x.dropMissing().index);
        } else {
          indices.push(x.dropNaN().index);
        }
      });
      self2.index = intersect(...indices);
      return self2;
    }
    transform() {
      const self2 = this;
      assert(
        !!self2.index,
        "The IndexMatcher hasn't been fitted yet! Please call the `fit` method before calling the `transform` method."
      );
      const out = Object.values(arguments).map((x) => {
        assert(
          isDataFrame(x) || isSeries(x),
          "The `IndexMatcher` only works on Series and DataFrames! To drop NaN values in a pair-wise fashion from regular arrays, use the `dropNaNPairwise` function from the @jrc03c/js-math-tools library."
        );
        return x.get(self2.index, null);
      });
      return out.length === 1 ? out[0] : out;
    }
    fitAndTransform() {
      const self2 = this;
      return self2.fit(...arguments).transform(...arguments);
    }
  };

  // src/is-binary.mjs
  function isBinary(x, shouldIgnoreNaNs) {
    if (typeof x === "number") {
      return x === 0 || x === 1;
    }
    if (typeof x === "bigint") {
      return x === 0n || x === 1n;
    }
    if (isDataFrame(x) || isSeries(x)) {
      return isBinary(x.values, shouldIgnoreNaNs);
    }
    if (isArray(x)) {
      if (shouldIgnoreNaNs) {
        x = dropNaN(x);
      }
      const counts = count(x);
      const values = counts.values.toSorted();
      return values.length === 2 && Number(values[0]) === 0 && Number(values[1]) === 1 || values.length === 1 && (Number(values[0]) === 0 || Number(values[0]) === 1);
    }
    return false;
  }

  // src/is-correlation-matrix.mjs
  function isCorrelationMatrix(x) {
    try {
      const prop = "@jrc03c/js-data-science-helpers/get-correlation-matrix";
      if (x[prop] === Symbol.for(prop)) {
        return true;
      }
      const s2 = stats(x, { shouldDropNaNs: true });
      return s2.min >= -1 && s2.max <= 1;
    } catch (e) {
      return false;
    }
  }

  // src/k-means/helpers.mjs
  function accuracy(yTrue, yPred) {
    if (isDataFrame(yTrue) || isSeries(yTrue)) {
      yTrue = yTrue.values;
    }
    if (isDataFrame(yPred) || isSeries(yPred)) {
      yPred = yPred.values;
    }
    assert(
      isEqual(shape(yTrue), shape(yPred)),
      "`yPred` and `yTrue` must have the same shape!"
    );
    const yTrueFlat = flatten(yTrue);
    const yPredFlat = flatten(yPred);
    let correct = 0;
    yTrueFlat.forEach((v, i) => {
      if (v === yPredFlat[i]) correct++;
    });
    return correct / yTrueFlat.length;
  }
  function isMatrix(x) {
    return isArray(x) && shape(x).length === 2;
  }
  function orderCentroids(ctrue, cpred) {
    return ctrue.map((c1) => {
      return cpred[argmin(cpred.map((c2) => sse(c1, c2)))];
    });
  }
  function silhouette(points, labels) {
    points = points.map((row) => row.map((v) => Number(v)));
    const clusters = {};
    const labelSet = /* @__PURE__ */ new Set();
    labels.forEach((label, i) => {
      if (!clusters[label]) {
        clusters[label] = [];
      }
      clusters[label].push(points[i]);
      labelSet.add(label);
    });
    return mean(
      points.map((p, i) => {
        const label = labels[i];
        let a = Infinity;
        let b = Infinity;
        labelSet.forEach((otherLabel) => {
          const cluster = clusters[otherLabel];
          const score = cluster.length < 2 ? 0 : sum(cluster.map((q) => sse(p, q)));
          if (otherLabel === label) {
            a = score;
          } else if (score < b) {
            b = score;
          }
        });
        return (b - a) / max([a, b]);
      })
    );
  }
  function sse(xtrue, xpred) {
    const shouldIgnoreNaNs = true;
    return sum(vpow(subtract(xtrue, xpred), 2), shouldIgnoreNaNs);
  }

  // src/k-means/k-means-naive.mjs
  var KMeansNaive = class {
    constructor(config) {
      assert(
        typeof config === "object",
        "`config` must be an object! See the documentation for more information about the properties that the `config` object can contain."
      );
      assert(isWholeNumber2(config.k), "`k` must be a whole number!");
      assert(
        isWholeNumber2(config.maxIterations) || isUndefined(config.maxIterations),
        "`maxIterations` must be a whole number or undefined!"
      );
      assert(
        isWholeNumber2(config.maxRestarts) || isUndefined(config.maxRestarts),
        "`maxRestarts` must be a whole number or undefined!"
      );
      assert(
        typeof config.tolerance === "number" || isUndefined(config.tolerance),
        "`tolerance` must be a number or undefined!"
      );
      this.k = config.k;
      this.maxRestarts = config.maxRestarts || 25;
      this.maxIterations = config.maxIterations || 100;
      this.tolerance = config.tolerance || 1e-4;
      this.centroids = null;
    }
    initializeCentroids(x) {
      return shuffle(x).slice(0, this.k);
    }
    getFitStepFunction(x, progress) {
      assert(isMatrix(x), "`x` must be a matrix!");
      if (isDataFrame(x)) {
        x = x.values;
      }
      if (!isUndefined(progress)) {
        assert(isFunction(progress), "If defined, `progress` must be a function!");
      }
      const centroids = this.initializeCentroids(x);
      const state = {
        currentRestart: 0,
        currentIteration: 0,
        currentCentroids: centroids,
        bestCentroids: centroids,
        bestScore: -Infinity,
        isFinished: false
      };
      return () => {
        const labels = this.predict(x, state.currentCentroids);
        const sums = [];
        const counts = zeros(this.k);
        x.forEach((p, i) => {
          const k = labels[i];
          if (!sums[k]) {
            sums[k] = zeros(p.length);
          }
          sums[k] = vadd(sums[k], p);
          counts[k]++;
        });
        const newCentroids = range(0, this.k).map((k) => {
          if (counts[k] === 0) {
            return vadd(
              state.currentCentroids[Math.floor(random() * state.currentCentroids.length)],
              scale(1e-3, normal(state.currentCentroids[0].length))
            );
          } else {
            return divide(sums[k], counts[k]);
          }
        });
        if (sse(state.currentCentroids, newCentroids) < this.tolerance) {
          state.currentIteration = this.maxIterations - 1;
        } else {
          state.currentCentroids = newCentroids;
        }
        if (progress) {
          progress(
            (state.currentRestart + state.currentIteration / this.maxIterations) / this.maxRestarts,
            this
          );
        }
        state.currentIteration++;
        if (state.currentIteration >= this.maxIterations) {
          const score = this.score(x, state.currentCentroids);
          if (score > state.bestScore) {
            state.bestScore = score;
            state.bestCentroids = copy(state.currentCentroids);
          }
          state.currentIteration = 0;
          state.currentRestart++;
          if (state.currentRestart >= this.maxRestarts) {
            state.isFinished = true;
            this.centroids = state.bestCentroids;
            if (progress) {
              progress(1, this);
            }
          } else {
            const newCentroids2 = this.initializeCentroids(x);
            state.currentCentroids = newCentroids2;
          }
        }
        return state;
      };
    }
    fit(x, progress) {
      const fitStep = this.getFitStepFunction(x, progress);
      let state;
      while (!state || !state.isFinished) {
        state = fitStep();
      }
      return this;
    }
    predict(x, centroids) {
      centroids = centroids || this.centroids;
      if (!centroids) {
        throw new Error(
          "No centroids were provided to the `predict` method, and the K-Means model hasn't been fitted yet. Please either pass centroids as a second parameter to the `predict` method or run the `fit` method first!"
        );
      }
      return x.map((p) => argmin(centroids.map((c) => sse(p, c))));
    }
    score(x, centroids) {
      centroids = centroids || this.centroids;
      if (!centroids) {
        throw new Error(
          "No centroids were provided to the `score` method, and the K-Means model hasn't been fitted yet. Please either pass centroids as a second parameter to the `score` method or run the `fit` method first!"
        );
      }
      const labels = this.predict(x, centroids);
      const assigments = labels.map((k) => centroids[k]);
      return -sse(x, assigments);
    }
  };

  // src/k-means/k-means-plus-plus.mjs
  var KMeansPlusPlus = class extends KMeansNaive {
    initializeCentroids(x) {
      const shouldIgnoreNaNs = true;
      const centroids = [x[Math.floor(random() * x.length)]];
      while (centroids.length < this.k) {
        const distances = x.map(
          (p) => sse(
            p,
            centroids[argmin(
              centroids.map((c) => sse(p, c)),
              shouldIgnoreNaNs
            )]
          )
        );
        const probabilities = divide(distances, max(distances, shouldIgnoreNaNs));
        centroids.push(x[probabilities.findIndex((v) => random() < v)]);
      }
      return centroids;
    }
  };

  // src/k-means/k-means-meta.mjs
  var KMeansMeta = class {
    constructor(config) {
      if (isUndefined(config)) {
        config = {};
      }
      assert(
        typeof config === "object",
        "`config` must be an object! See the documentation for more information about the properties that the `config` object can contain."
      );
      if (isUndefined(config.ks)) {
        config.ks = range(2, 16);
      }
      assert(isArray(config.ks), "`ks` must be an array of whole numbers!");
      config.ks.forEach((k) => {
        assert(isWholeNumber2(k), "`ks` must be an array of whole numbers!");
      });
      assert(
        isWholeNumber2(config.maxIterations) || isUndefined(config.maxIterations),
        "`maxIterations` must be a whole number or undefined!"
      );
      assert(
        isWholeNumber2(config.maxRestarts) || isUndefined(config.maxRestarts),
        "`maxRestarts` must be a whole number or undefined!"
      );
      this.finalMaxIterations = config.finalMaxIterations || 100;
      this.finalMaxRestarts = config.finalMaxRestarts || 25;
      this.fittedModel = null;
      this.ks = config.ks;
      this.maxIterations = config.maxIterations || 10;
      this.maxRestarts = config.maxRestarts || 5;
      this.modelClass = config.modelClass || KMeansPlusPlus;
      this.tolerance = config.tolerance || 1e-4;
    }
    getFitStepFunction(x, progress) {
      if (isDataFrame(x)) {
        x = x.values;
      }
      assert(isMatrix(x), "`x` must be a matrix!");
      if (!isUndefined(progress)) {
        assert(isFunction(progress), "If defined, `progress` must be a function!");
      }
      const state = {
        currentIndex: 0,
        isFinished: false,
        scores: []
      };
      return () => {
        const k = this.ks[state.currentIndex];
        const model = new this.modelClass({
          k,
          maxRestarts: 10,
          maxIterations: 20
        });
        model.fit(
          x,
          (p) => progress ? progress((state.currentIndex + p) / (this.ks.length + 1)) : null
        );
        const labels = model.predict(x);
        const score = silhouette(x, labels);
        if (state.scores.length >= this.ks.length || score > 1 - this.tolerance) {
          state.isFinished = true;
        } else {
          state.scores.push({ k, score });
          if (state.currentIndex + 1 >= this.ks.length) {
            state.isFinished = true;
          } else {
            state.currentIndex++;
          }
        }
        if (state.isFinished) {
          let bestK = 1;
          let bestScore = -1;
          state.scores.forEach((s2) => {
            if (!isNaN(s2.score) && s2.score > bestScore) {
              bestScore = s2.score;
              bestK = s2.k;
            }
          });
          this.fittedModel = new this.modelClass({
            k: bestK,
            maxRestarts: this.finalMaxRestarts,
            maxIterations: this.finalMaxIterations
          });
          this.fittedModel.fit(
            x,
            (p) => progress ? progress((this.ks.length + p) / (this.ks.length + 1)) : null
          );
          if (progress) {
            progress(1);
          }
        }
        return state;
      };
    }
    fit(x, progress) {
      const fitStep = this.getFitStepFunction(x, progress);
      let state;
      while (!state || !state.isFinished) {
        state = fitStep();
      }
      return this;
    }
    predict(x, centroids) {
      return this.fittedModel.predict(x, centroids);
    }
    score(x, centroids) {
      return this.fittedModel.score(x, centroids);
    }
    get k() {
      return this.fittedModel.k;
    }
    set k(value) {
      throw new Error(
        "You can't set the k-value manually! It has to be set automatically via the `fit` method."
      );
    }
    get centroids() {
      return this.fittedModel.centroids;
    }
    set centroids(centroids) {
      assert(
        isEqual(shape(centroids), shape(this.fittedModel.centroids)),
        "When assigning a new value to the `centroids` property, the new centroids must have the same shape as the old centroids!"
      );
      this.fittedModel.centroids = centroids;
    }
  };

  // src/k-means/index.mjs
  var helpers = { accuracy, isMatrix, orderCentroids, silhouette, sse };
  var KMeans = { helpers, KMeansMeta, KMeansNaive, KMeansPlusPlus };

  // src/normalize.mjs
  function normalize(x, shouldIgnoreNaNs) {
    if (isDataFrame(x) || isSeries(x)) {
      const out = x.copy();
      out.values = normalize(out.values);
      return out;
    }
    assert(
      isArray(x),
      "The `normalize` function only works on arrays, Series, and DataFrames!"
    );
    const results = stats(x, { shouldDropNaNs: shouldIgnoreNaNs, stdev: true });
    const m = results.mean;
    const s2 = results.stdev;
    return vapply(x, (v) => (Number(v) - m) / s2);
  }

  // src/project.mjs
  function project(v, u) {
    if (isSeries(v)) {
      if (isSeries(u)) {
        return new Series(project(v.values, u.values));
      } else {
        const out = v.copy();
        out.values = project(v.values, u);
        return out;
      }
    }
    if (isSeries(u)) {
      const out = u.copy();
      out.values = project(v, u.values);
      return out;
    }
    assert(isArray(v), "`project` only works on vectors!");
    assert(isArray(u), "`project` only works on vectors!");
    assert(shape(v).length === 1, "`project` only works on vectors!");
    assert(shape(u).length === 1, "`project` only works on vectors!");
    return scale(Number(dot(u, v)) / Number(dot(u, u)), u);
  }

  // src/orthonormalize.mjs
  function orthonormalize(x) {
    if (isDataFrame(x)) {
      const out2 = new DataFrame(orthonormalize(x.values));
      out2.index = x.index.slice();
      out2.columns = x.columns.slice();
      return out2;
    }
    assert(
      isArray(x) && !isJagged(x) && shape(x).length === 2,
      "`orthonormalize` only works on matrices!"
    );
    const temp = transpose(x);
    const bases = [];
    temp.forEach((v) => {
      let temp2 = v;
      bases.forEach((basis) => {
        temp2 = subtract(temp2, project(temp2, basis));
      });
      bases.push(temp2);
    });
    const shouldIgnoreNaNs = true;
    const out = bases.map(
      (basis) => divide(basis, getMagnitude(basis, shouldIgnoreNaNs))
    );
    return transpose(out);
  }

  // src/outlier-mitigator.mjs
  function isBinary2(stats2) {
    const xset = stats2.counts.values;
    return xset.length < 3 && (xset.length === 2 && isEqual(xset.toSorted(), [0, 1]) || xset.length === 1 && (xset[0] === 0 || xset[0] === 1));
  }
  function getNumericalValues(stats2) {
    const out = [];
    stats2.counts.values.forEach((value) => {
      if (isNumber(value)) {
        const count2 = stats2.counts.get(value);
        for (let i = 0; i < count2; i++) {
          out.push(value);
        }
      }
    });
    return out;
  }
  var OutlierMitigator = class {
    constructor(options) {
      options = options || {};
      this.isAllowedToClip = !isUndefined(options.isAllowedToClip) ? options.isAllowedToClip : true;
      this.isAllowedToTakeTheLog = !isUndefined(options.isAllowedToTakeTheLog) ? options.isAllowedToTakeTheLog : false;
      this.maxScore = options.maxScore || 5;
      assert(
        isBoolean(this.isAllowedToClip),
        "The `isAllowedToClip` property on the options object passed into the `OutlierMitigator` constructor must have a boolean value!"
      );
      assert(
        isBoolean(this.isAllowedToTakeTheLog),
        "The `isAllowedToTakeTheLog` property on the options object passed into the `OutlierMitigator` constructor must have a boolean value!"
      );
      assert(
        isNumber(this.maxScore) && this.maxScore >= 0,
        "The `maxScore` property on the options object passed into the `OutlierMitigator` constructor must have a non-negative number value!"
      );
      this.mad = 0;
      this.median = 0;
    }
    fit(x) {
      if (isDataFrame(x) || isSeries(x)) {
        return this.fit(x.values);
      }
      assert(
        isArray(x),
        "The `OutlierMitigator.fit` method only works on arrays, Series, and DataFrames!"
      );
      if (x.length === 0) {
        return;
      }
      const results = stats(x, {
        shouldDropNaNs: true,
        median: true
      });
      if (isBinary2(results)) {
        return this;
      }
      const xnums = getNumericalValues(results);
      this.median = Number(results.median);
      this.mad = Number(
        stats(vabs(subtract(xnums, this.median)), { median: true }).median
      );
      return this;
    }
    fitAndTransform() {
      return this.fit(arguments[0]).transform(...arguments);
    }
    transform() {
      if (arguments.length > 1) {
        return Array.from(arguments).map((a) => this.transform(a));
      }
      const x = arguments[0];
      if (isDataFrame(x) || isSeries(x)) {
        return this.transform(x.values);
      }
      assert(
        isArray(x),
        "The `OutlierMitigator.transform` method only works on arrays, Series, and DataFrames!"
      );
      const results = stats(x, { shouldDropNaNs: true });
      const xnums = getNumericalValues(results);
      let outlierIsImmediatelyAboveOrBelowMedian = false;
      if (this.mad === 0) {
        const low = [];
        const high = [];
        let highestLowValue = -Infinity;
        let lowestHighValue = Infinity;
        xnums.forEach((value) => {
          if (value < this.median) {
            low.push(value);
            if (value > highestLowValue) {
              highestLowValue = value;
            }
          } else if (value > this.median) {
            high.push(value);
            if (value < lowestHighValue) {
              lowestHighValue = value;
            }
          }
        });
        let before = this.median;
        let after = this.median;
        if (low.length > 0) before = highestLowValue;
        if (high.length > 0) after = lowestHighValue;
        this.mad = (after - before) / 2;
        if (this.mad === 0) {
          return x;
        }
        outlierIsImmediatelyAboveOrBelowMedian = (this.median - before) / this.mad > this.maxScore || (after - this.median) / this.mad > this.maxScore;
      }
      const score = stats(divide(vabs(subtract(xnums, this.median)), this.mad)).max;
      if (score > this.maxScore || outlierIsImmediatelyAboveOrBelowMedian) {
        let outMin = null;
        let out = copy(x);
        if (this.isAllowedToClip) {
          out = vapply(out, (v) => {
            v = isNumber(v) ? vclamp(
              v,
              this.median - this.maxScore * this.mad,
              this.median + this.maxScore * this.mad
            ) : v;
            if (this.isAllowedToTakeTheLog && isNumber(v) && (outMin === null || v < outMin)) {
              outMin = v;
            }
            return v;
          });
        }
        if (this.isAllowedToTakeTheLog) {
          if (outMin === null) {
            outMin = stats(out).min;
          }
          out = vapply(out, (v) => {
            if (isNumber(v)) {
              return vlog(v - outMin + 1);
            } else {
              return v;
            }
          });
        }
        return out;
      } else {
        return x;
      }
    }
  };

  // src/r-squared.mjs
  function rSquared(xTrue, xPred, shouldIgnoreNaNs) {
    if (isDataFrame(xTrue) || isSeries(xTrue)) {
      return rSquared(xTrue.values, xPred);
    }
    if (isDataFrame(xPred) || isSeries(xPred)) {
      return rSquared(xTrue, xPred.values);
    }
    assert(
      isArray(xTrue),
      "You must pass two same-shaped numerical arrays into the `rSquared` function!"
    );
    assert(
      isArray(xPred),
      "You must pass two same-shaped numerical arrays into the `rSquared` function!"
    );
    assert(
      isEqual(shape(xTrue), shape(xPred)),
      "You must pass two same-shaped numerical arrays into the `rSquared` function!"
    );
    if (shouldIgnoreNaNs) {
      const results = dropNaNPairwise(xTrue, xPred);
      xTrue = results[0];
      xPred = results[1];
    }
    const num = Number(sum(vpow(subtract(xTrue, xPred), 2)));
    const den = Number(sum(vpow(subtract(xTrue, mean(xTrue)), 2)));
    if (den === 0) return NaN;
    return 1 - num / den;
  }

  // src/r-score.mjs
  function rScore(yTrue, yPred, shouldIgnoreNaNs) {
    const r2 = rSquared(yTrue, yPred, shouldIgnoreNaNs);
    return vsign(r2) * vsqrt(vabs(r2));
  }

  // src/standardize.mjs
  function standardize() {
    return normalize(...arguments);
  }

  // src/standard-scaler.mjs
  var StandardScaler = class {
    constructor(options) {
      options = options || {};
      this.means = [];
      this.stdevs = [];
      this.wasFittedOnAVector = false;
      this.hasBeenFitted = false;
      this.shouldIgnoreNaNs = typeof options.shouldIgnoreNaNs === "undefined" ? false : options.shouldIgnoreNaNs;
    }
    _getDataArrayAndShape(x) {
      if (isDataFrame(x)) {
        return [x.values, x.shape];
      }
      if (isSeries(x)) {
        const out = transpose([x.values]);
        return [out, shape(out)];
      }
      assert(
        isArray(x),
        "`x` must be a 1- or 2-dimensional array, DataFrame, or Series!"
      );
      const xShape = shape(x);
      assert(
        xShape.length < 3,
        "`x` must be a 1- or 2-dimensional array, DataFrame, or Series!"
      );
      if (xShape.length === 1) {
        xShape.push(1);
        x = transpose([x]);
      }
      return [x, xShape];
    }
    fit(x) {
      const results = this._getDataArrayAndShape(x);
      x = results[0];
      const xShape = results[1];
      this.wasFittedOnAVector = xShape.indexOf(1) > -1;
      this.means = [];
      this.stdevs = [];
      range(0, xShape[1]).forEach((j) => {
        const values = x.map((row) => row[j]);
        const results2 = stats(values, {
          shouldDropNaNs: this.shouldIgnoreNaNs,
          stdev: true
        });
        this.means.push(results2.mean);
        this.stdevs.push(results2.stdev);
      });
      this.hasBeenFitted = true;
      return this;
    }
    fitAndTransform() {
      return this.fit(arguments[0]).transform(...arguments);
    }
    transform() {
      const datas = Array.from(arguments);
      if (datas.length > 1) {
        return datas.map((data) => this.transform(data));
      }
      let x = datas[0];
      if (!this.hasBeenFitted) {
        throw new Error(
          "This `StandardScaler` instance hasn't been trained on any data yet! Please use the `fit` method to train it before calling the `transform` method."
        );
      }
      if (isDataFrame(x)) {
        const out2 = new DataFrame(this.transform(x.values));
        out2.columns = x.columns;
        out2.index = x.index;
        return out2;
      }
      if (isSeries(x)) {
        const out2 = new Series(this.transform(x.values));
        out2.name = x.name;
        out2.index = x.index;
        return out2;
      }
      const results = this._getDataArrayAndShape(x);
      x = results[0];
      const xShape = results[1];
      assert(
        xShape[1] === this.means.length,
        "The data you passed into the `transform` function doesn't have the same number of columns as the data set on which this StandardScaler was fitted!"
      );
      const out = x.map((row) => {
        return row.map((v, j) => {
          return (Number(v) - Number(this.means[j])) / Number(this.stdevs[j]);
        });
      });
      if (this.wasFittedOnAVector) {
        return flatten(out);
      } else {
        return out;
      }
    }
    untransform(x) {
      if (!this.hasBeenFitted) {
        throw new Error(
          "This `StandardScaler` instance hasn't been trained on any data yet! Please use the `fit` method to train it before calling the `transform` method."
        );
      }
      if (isDataFrame(x)) {
        const out2 = new DataFrame(this.untransform(x.values));
        out2.columns = x.columns;
        out2.index = x.index;
        return out2;
      }
      if (isSeries(x)) {
        const out2 = new Series(this.untransform(x.values));
        out2.name = x.name;
        out2.index = x.index;
        return out2;
      }
      const results = this._getDataArrayAndShape(x);
      x = results[0];
      const xShape = results[1];
      assert(
        xShape[1] === this.means.length,
        "The data you passed into the `untransform` function doesn't have the same number of columns as the data set on which this StandardScaler was fitted!"
      );
      const out = x.map((row) => {
        return row.map((v, j) => {
          return v * this.stdevs[j] + this.means[j];
        });
      });
      if (this.wasFittedOnAVector) {
        return flatten(out);
      } else {
        return out;
      }
    }
  };

  // src/train-test-split.mjs
  function trainTestSplit() {
    const args = Array.from(arguments);
    const datasets = args.filter((a) => isArray(a) || isDataFrame(a) || isSeries(a));
    const options = args.find((a) => !datasets.includes(a) && typeof a === "object") || {};
    const shouldShuffle = isUndefined(options.shouldShuffle) ? true : options.shouldShuffle;
    const testSize = isUndefined(options.testSize) ? 0.1 : options.testSize;
    assert(
      isBoolean(shouldShuffle),
      "If passing an options object to the `trainTestSplit` function and including a `shouldShuffle` property on that object, then the value of that property must be a boolean!"
    );
    assert(
      isNumber(testSize) && testSize > 0 && testSize < 1,
      "If passing an options object to the `trainTestSplit` function and including a `testSize` property on that object, then the value of that property must be a number between 0 and 1 (exclusive on both ends)!"
    );
    assert(
      datasets.length > 0,
      "You must pass at least one dataset into the `trainTestSplit` function!"
    );
    const shapes = datasets.map((d) => shape(d)[0]);
    assert(
      set(shapes).length === 1,
      `All datasets passed into the \`trainTestSplit\` function must have the same length at their shallowest dimension! The lengths of the datasets you provided, though, are: ${shapes.join(
        ", "
      )}`
    );
    const out = [];
    const index = shouldShuffle ? shuffle(range(0, shapes[0])) : range(0, shapes[0]);
    const split = vint((1 - testSize) * index.length);
    const trainIndex = index.slice(0, split);
    const testIndex = index.slice(split);
    datasets.forEach((d) => {
      if (isDataFrame(d)) {
        out.push(d.get(trainIndex, null));
        out.push(d.get(testIndex, null));
      } else if (isSeries(d)) {
        out.push(d.get(trainIndex));
        out.push(d.get(testIndex));
      } else {
        const train = [];
        const test = [];
        d.forEach((v, i) => {
          if (trainIndex.includes(i)) {
            train.push(v);
          } else {
            test.push(v);
          }
        });
        out.push(train);
        out.push(test);
      }
    });
    return out;
  }

  // src/iife.mjs
  if (typeof globalThis !== "undefined") {
    globalThis.JSDataScienceHelpers = index_exports;
  }
})();
