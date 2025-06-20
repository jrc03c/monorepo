(() => {
  // node_modules/@jrc03c/js-text-tools/src/camelify.mjs
  function camelify(text) {
    if (typeof text !== "string") {
      throw new Error("`text` must be a string!");
    }
    text = text.trim();
    let out = "";
    let shouldCapitalizeNextCharacter = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[A-Za-z0-9]/g)) {
        if (out.length === 0) {
          out += char.toLowerCase();
        } else if (shouldCapitalizeNextCharacter) {
          out += char.toUpperCase();
        } else {
          out += char;
        }
        shouldCapitalizeNextCharacter = false;
      } else if (!char.includes("'") && !char.includes("\u2019") && !char.includes("\u275C")) {
        shouldCapitalizeNextCharacter = true;
      }
    }
    return out;
  }

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

  // node_modules/@jrc03c/js-math-tools/src/for-each.mjs
  function forEach(x, fn) {
    for (let i = 0; i < x.length; i++) {
      fn(x[i], i, x);
    }
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

  // node_modules/@jrc03c/js-math-tools/src/map.mjs
  function map(x, fn) {
    const out = new Array(x.length);
    for (let i = 0; i < x.length; i++) {
      out[i] = fn(x[i], i, x);
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/is-array.mjs
  var typeStrings = map(arrayTypes, (s2) => s2.name);
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
    function helper4(x2, fn2, checked) {
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
          const results = helper4(value, fn2, checked);
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
          const results = helper4(value, fn2, checked);
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
    const paths = helper4(x, safeFn);
    if (paths && paths.length > 0) {
      return paths;
    } else {
      return null;
    }
  }

  // node_modules/@jrc03c/js-math-tools/src/copy.mjs
  function copy(x) {
    function helper4(x2) {
      if (typeof x2 === "object") {
        if (x2 === null) {
          return null;
        }
        if (isArray(x2)) {
          if (!(x2 instanceof Array)) {
            return x2.slice();
          }
          return map(x2, (v) => copy(v));
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
        forEach(
          Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)),
          (key) => {
            out[key] = copy(x2[key]);
          }
        );
        return out;
      } else {
        return x2;
      }
    }
    return helper4(decycle(x));
  }
  function decycle(x) {
    function helper4(x2, checked, currentPath) {
      checked = checked || [];
      currentPath = currentPath || "";
      if (checked.indexOf(x2) > -1) {
        const parts = currentPath.split("/").slice(currentPath.startsWith("/") ? 1 : 0);
        const isANestedCopy = parts.some((v, i) => {
          const subParts = parts.slice(0, parts.length - i - 1);
          let temp = orig;
          forEach(subParts, (part) => {
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
          return map(x2, (v, i) => helper4(v, checked, currentPath + "/" + i));
        } else {
          forEach(
            Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)),
            (key) => {
              x2[key] = helper4(x2[key], checked, currentPath + "/" + key.toString());
            }
          );
          return x2;
        }
      } else {
        return x2;
      }
    }
    const orig = x;
    let out = helper4(orig);
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
    function helper4(a2, b2) {
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
            if (!helper4(a2[key], b2[key])) return false;
          }
          return true;
        }
      }
    }
    try {
      return helper4(a, b);
    } catch (e) {
      return helper4(decycle(a), decycle(b));
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
      return map(this.values, (v) => this.get(v));
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
      return map(this.values, (v) => ({ value: v, count: this.get(v) }));
    }
    toObject() {
      const out = {};
      forEach(this.values, (value) => {
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
    function helper4(arr2) {
      let out = [];
      forEach(arr2, (child) => {
        if (isArray(child)) {
          out = out.concat(helper4(child));
        } else {
          out.push(child);
        }
      });
      return out;
    }
    return helper4(arr);
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
        map(counts.values, (v) => [v, counts.get(v)])
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
        out.mode = map(out.mode, (v) => {
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
        forEach(counts.values, (v) => {
          if (!matcher(v)) {
            counts.delete(v);
          }
        });
      } else {
        forEach(counts.values, (v) => {
          if (!isEqual(v, matcher)) {
            counts.delete(v);
          }
        });
      }
    }
    return counts;
  }

  // node_modules/@jrc03c/js-math-tools/src/filter.mjs
  function filter(x, fn) {
    const out = [];
    for (let i = 0; i < x.length; i++) {
      if (fn(x[i], i, x)) {
        out.push(x[i]);
      }
    }
    return out;
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
    forEach(flatten(arr), (item) => {
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
          forEach(out._values, (row) => {
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
          forEach(range(0, maxColLength), (i) => {
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
            ...map(x, (row) => row.length).concat([df.shape[1]])
          );
          const out = df.copy();
          out._values = map(out._values.concat(x), (row) => {
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
          const maxRowLength = Math.max(...map(x, (row) => row.length)) + df.shape[1];
          const maxColLength = Math.max(df.shape[0], xShape[0]);
          const out = df.copy();
          forEach(range(0, maxColLength), (i) => {
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
        forEach(out._values, (row) => {
          while (row.length < maxRowLength) {
            row.push(void 0);
          }
        });
        x.apply((row) => {
          const rowCopy = row.copy();
          const temp = [];
          forEach(out._columns, (col) => {
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
          filter(x._columns, (c) => out._columns.indexOf(c) < 0)
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
        forEach(out._index, (rowName, i) => {
          const xIndex = x._index.indexOf(rowName);
          if (xIndex > -1) {
            out._values[i] = out._values[i].concat(x._values[xIndex]);
          } else {
            out._values[i] = out._values[i].concat(ndarray(x.shape[1]));
          }
        });
        forEach(x._index, (rowName, i) => {
          const outIndex = out._index.indexOf(rowName);
          if (outIndex < 0) {
            out._index.push(rowName);
            out._values.push(ndarray(out._columns.length).concat(x._values[i]));
          }
        });
        out._columns = out._columns.concat(
          map(x._columns, (c) => c + (out._columns.indexOf(c) > -1 ? " (2)" : ""))
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
      forEach(df.columns, (colName, i) => {
        const series = new Series2(map(df.values, (row) => row[i]));
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
        const out = new Series2(map(df.columns, (colName) => temp[colName]));
        out.index = df.columns;
        return out;
      }
    } else if (axis === 1) {
      let shouldReturnADataFrame;
      const temp = map(df.values, (row, i) => {
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
        forEach(out.values, (v, i) => v[index] = p2[i]);
        return out;
      } else {
        out._columns.push(p1);
        forEach(out._values, (v, i) => v.push(p2[i]));
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
    forEach(df.index, (row, i) => {
      if (rows.indexOf(row) < 0 && rows.indexOf(i) < 0) {
        if (!outIndex) outIndex = [];
        outIndex.push(row);
      }
    });
    forEach(df.columns, (col, i) => {
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
    function helper4(values) {
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
      const newValues = filter(map(out.values, helper4), (row) => row.length > 0);
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
      forEach(out.columns, (colName, i) => {
        const values = map(out.values, (row) => row[i]);
        const newValues = helper4(values);
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
    forEach(x, (v) => {
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
    function helper4(values) {
      const numericalValues = dropNaN(values);
      if (threshold > 0) return values.length - numericalValues.length < threshold;
      if (condition === "any") return numericalValues.length === values.length;
      if (condition === "all") return numericalValues.length > 0;
      return true;
    }
    const out = df.copy();
    if (axis === 0) {
      const rowsToKeep = filter(out.index, (row) => {
        const values = out.get(row, null).values;
        return helper4(values);
      });
      if (rowsToKeep.length > 0) return out.get(rowsToKeep, null);
      else return new DataFrame2();
    } else if (axis === 1) {
      const colsToKeep = filter(out.columns, (col) => {
        const values = out.get(null, col).values;
        return helper4(values);
      });
      if (colsToKeep.length > 0) return out.get(null, colsToKeep);
      else return new DataFrame2();
    }
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.mjs
  function arrayToObject(x) {
    const out = {};
    forEach(flatten(x), (value, i) => {
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
      const newValues = filter(out.values, (row, i) => {
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
      const newValues = filter(out.values, (row, i) => {
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
    const types = set(map((rows || []).concat(cols || []), (v) => typeof v));
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
      rows = map(rows, (r) => {
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
      cols = map(cols, (c) => {
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
  function camelify2(text) {
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
    const words = filter(out.split(" "), (word) => word.length > 0);
    return words[0] + map(
      words.slice(1),
      (word) => word[0].toUpperCase() + word.substring(1)
    ).join("");
  }
  function dfGetDummies(DataFrame2, df, columns) {
    if (isUndefined(columns)) {
      columns = df.columns;
    } else if (isString(columns)) {
      columns = [columns];
    }
    const temp = {};
    forEach(columns, (col) => {
      assert(
        isString(col),
        "You must pass either a string or a one-dimensional array of strings into the `getDummies` (AKA `oneHotEncode`) method!"
      );
      const colIndex = df.columns.indexOf(col);
      assert(
        colIndex > -1,
        `The given DataFrame does not have a column called "${col}"!`
      );
      const values = map(df.values, (row) => row[colIndex]);
      const valuesSet = sort(set(values));
      forEach(values, (value) => {
        forEach(valuesSet, (orig) => {
          const colName = col + "_" + camelify2(orig.toString());
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
    forEach(rowIndices, (rowIndex) => {
      assert(
        isWholeNumber(rowIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        rowIndex < df.index.length,
        `The row index ${rowIndex} is out of bounds.`
      );
    });
    forEach(colIndices, (colIndex) => {
      assert(
        isWholeNumber(colIndex),
        "The `rowIndices` and `colIndices` parameters must be 1-dimensional arrays of whole numbers."
      );
      assert(
        colIndex < df.columns.length,
        `The column index ${colIndex} is out of bounds.`
      );
    });
    const rows = map(rowIndices, (i) => df.index[i]);
    const cols = map(colIndices, (i) => df.columns[i]);
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
    forEach(rows, (row) => {
      assert(
        isString(row),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.index.indexOf(row) > -1,
        `The row name "${row}" does not exist in the list of rows.`
      );
    });
    forEach(cols, (col) => {
      assert(
        isString(col),
        "The `rows` and `cols` parameters must be 1-dimensional arrays of strings."
      );
      assert(
        df.columns.indexOf(col) > -1,
        `The column name "${col}" does not exist in the list of columns.`
      );
    });
    const values = map(rows, (row) => {
      return map(cols, (col) => {
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
      const out2 = new Series2(map(values, (v) => v[0]));
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
        map(range(0, temp.columns.length), () => "...")
      );
    }
    if (maxColumns <= df.columns.length) {
      temp._columns.splice(halfMaxColumns, 0, "...");
      temp._values = map(temp._values, (row) => {
        row.splice(halfMaxColumns, 0, "...");
        return row;
      });
    }
    const maxLength = 28;
    if (temp instanceof Series2) {
      temp.values = map(temp.values, (value) => truncate(value, maxLength));
      temp.name = truncate(temp.name, maxLength);
      temp.index = map(temp.index, (row) => truncate(row, maxLength));
    } else {
      temp.values = map(temp.values, (row) => {
        return map(row, (value) => truncate(value, maxLength));
      });
      temp.columns = map(temp.columns, (col) => truncate(col, maxLength));
      temp.index = map(temp.index, (row) => truncate(row, maxLength));
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
    out.index = map(range(0, df.shape[0]), (i) => {
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
    newShape = map(newShape, (v) => {
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
    function helper4() {
      state += uint("0x9e3779b97f4a7c15");
      let z = copy(state);
      z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
      z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
      return z ^ z >> BigInt(31);
    }
    const out = [];
    for (let i = 0; i < n; i++) out.push(helper4());
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
    return reshape(map(ndarray(product(shape2)), next), shape2);
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
    if (isUndefined(directions)) {
      directions = map(range(0, cols.length), () => true);
    }
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
    cols = map(cols, (col) => {
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
    directions = map(directions, (dir) => {
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
    out.index = map(out.values, (row) => row[indexNumber]);
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
      forEach(df.index, (rowName, i) => {
        const temp = {};
        forEach(df.columns, (colName, j) => {
          temp[colName] = df.values[i][j];
        });
        out[rowName] = temp;
      });
    } else {
      forEach(df.columns, (colName, j) => {
        const temp = {};
        forEach(df.index, (rowName, i) => {
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
    forEach(df.columns, (col) => {
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
      forEach(x, (v, i) => {
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
    out._values = map(out._values, (v, i) => fn(v, i));
    return out;
  }

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.mjs
  function seriesDropMissing(series) {
    const out = series.copy();
    const outIndex = [];
    out._values = filter(out.values, (v, i) => {
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
    forEach(series.values, (value, i) => {
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
    const newValues = filter(out.values, (value, i) => {
      const shouldKeep = fn(value, i, out.values);
      if (!shouldKeep) indicesToRemove.push(out.index[i]);
      return shouldKeep;
    });
    forEach(indicesToRemove, (i) => {
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
    const types = set(map(indices || [], (v) => typeof v));
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
      indices = map(indices, (i) => {
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
    forEach(indices, (index) => {
      assert(
        isWholeNumber(index),
        "The `indices` array must be a 1-dimensional array of whole numbers."
      );
      assert(
        index < series.index.length,
        `The row index ${index} is out of bounds.`
      );
    });
    const rows = map(indices, (i) => series.index[i]);
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
    forEach(indices, (name) => {
      assert(isString(name), "The `indices` array must contain only strings.");
      assert(
        series.index.indexOf(name) > -1,
        `The name "${name}" does not exist in the index.`
      );
    });
    const values = map(indices, (name) => {
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
    forEach(temp.values, (value, i) => {
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
    forEach(temp, (pair) => {
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
    forEach(series.index, (index, i) => {
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
                map(range(this._index.length, dataShape[0]), (i) => {
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
            forEach(x, (value) => {
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
            const keys = map(
              Object.keys(data).concat(Object.getOwnPropertySymbols(data)),
              (v) => v.toString()
            );
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
        return filter(this.values, (v) => !isUndefined(v)).length === 0;
      }
      clear() {
        const out = this.copy();
        forEach(out.values, (v, i) => {
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
        out.index = map(range(0, this.shape[0]), (i) => {
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
              map(range(this._index.length, dataShape[0]), (i) => {
                return "row" + leftPad(i, (dataShape[0] - 1).toString().length);
              })
            );
          }
          if (dataShape[1] < this._columns.length) {
            this._columns = this._columns.slice(0, dataShape[1]);
          } else if (dataShape[1] > this._columns.length) {
            this._columns = this._columns.concat(
              map(range(this._columns.length, dataShape[1]), (i) => {
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
          x = map(x, (v) => {
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
            forEach(temp.values, (v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = map(x, (v) => {
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
          x = map(x, (v) => {
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
            forEach(temp.values, (v) => {
              out[v] = temp.get(v);
            });
            return out;
          })();
          x = map(x, (v) => {
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
          this._columns = map(
            Object.keys(data).concat(Object.getOwnPropertySymbols(data)),
            (v) => v.toString()
          );
          const temp = [];
          let lastColName = null;
          let lastColLength = null;
          forEach(this._columns, (col) => {
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
          this._index = map(range(0, dataShape[0]), (i) => {
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
    return function helper4() {
      let hasSeries, hasDataFrames;
      const series = [];
      const dataframes = [];
      const childArrays = map(
        filter(
          Object.keys(arguments),
          (key) => {
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
          }
        ),
        (key) => arguments[key]
      );
      forEach(childArrays.slice(0, -1), (s2, i) => {
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
          map(childArrays, (a) => a.length ? a.length : a.values.length)
        );
        const out = map(range(0, maxLength), (i) => {
          const args = map(Object.keys(arguments), (key) => {
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
          return helper4(...args);
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
      return map(x, (v) => int(v));
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

  // node_modules/@jrc03c/js-math-tools/src/remap.mjs
  var helper3 = vectorize((x, a, b, c, d) => {
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

  // node_modules/@jrc03c/js-text-tools/src/pascalify.mjs
  function pascalify(text) {
    const out = camelify(text);
    return out[0].toUpperCase() + out.slice(1);
  }

  // node_modules/@jrc03c/js-type-experiments/src/is-of-type.mjs
  function isOfType(value, type, allowsSubclassInstances) {
    if (typeof allowsSubclassInstances === "undefined") {
      allowsSubclassInstances = true;
    }
    if (value === null || typeof value === "undefined") {
      return true;
    }
    if (type === "number" && typeof value === "number" && isNaN(value)) {
      return true;
    }
    if (type === Date && isDate(value)) {
      return true;
    }
    try {
      return value instanceof type && (allowsSubclassInstances || value.constructor.name === type.name);
    } catch (e) {
      return typeof value === type;
    }
  }

  // node_modules/@jrc03c/js-type-experiments/src/create-typed-array.mjs
  var canUseNewKeyword = {
    allowsSubclassInstances: {},
    doesNotAllowSubclassInstances: {}
  };
  var TypedArray = class _TypedArray extends Array {
    static allowsSubclassInstances = true;
    static registry = {
      allowsSubclassInstances: {},
      doesNotAllowSubclassInstances: {}
    };
    static type = null;
    static from(arr) {
      if (arguments.length > 1) {
        console.warn(
          "WARNING: The `TypedArray.from` static method's implementation differs from the standard `Array.from` static method's implementation. The `TypedArray.from` method only accepts one argument: an array of values. That array can be nested arbitrarily deeply."
        );
      }
      const key = this.allowsSubclassInstances ? "allowsSubclassInstances" : "doesNotAllowSubclassInstances";
      const out = createTypedArray(_TypedArray.registry[key][this.name]);
      if (arguments.length === 0) {
        return out;
      }
      arr.forEach((value) => {
        if (this.isArray(value)) {
          const key2 = this.allowsSubclassInstances ? "allowsSubclassInstances" : "doesNotAllowSubclassInstances";
          canUseNewKeyword[key2][this.type] = true;
          const temp = new this();
          canUseNewKeyword[key2][this.type] = false;
          value.forEach((v) => temp.push(v));
          out.push(this.proxify(temp));
        } else {
          out.push(value);
        }
      });
      return out;
    }
    static proxify(x) {
      return new Proxy(x, {
        get() {
          return Reflect.get(...arguments);
        },
        set(target, prop, value, receiver) {
          const intProp = parseInt(prop);
          if (!isNaN(intProp) && parseFloat(prop) === intProp && intProp >= 0) {
            receiver.challenge(value);
          }
          return Reflect.set(...arguments);
        }
      });
    }
    constructor(type, allowsSubclassInstances) {
      super();
      if (type === null || typeof type === "undefined") {
        throw new Error(
          `A type must be passed as the first argument to the \`TypedArray\` constructor!`
        );
      }
      if (type === Array) {
        throw new Error("It's not possible to create a TypedArray<Array>!");
      }
      Object.defineProperty(this, "type", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: type
      });
      if (typeof allowsSubclassInstances === "undefined" || allowsSubclassInstances === null) {
        allowsSubclassInstances = true;
      }
      Object.defineProperty(this, "allowsSubclassInstances", {
        configurable: false,
        enumerable: false,
        writable: false,
        value: allowsSubclassInstances
      });
    }
    static get typeString() {
      if (typeof this.constructor.type === "function") {
        return this.constructor.type.name;
      } else {
        return this.constructor.type;
      }
    }
    get allowsSubclassInstances() {
      return this.constructor.allowsSubclassInstances;
    }
    get type() {
      return this.constructor.type;
    }
    canAccept(value) {
      return isOfType(
        value,
        this.constructor.type,
        this.constructor.allowsSubclassInstances
      ) || isArray(value) && (value instanceof this.constructor || flatten(value).every((v) => this.canAccept(v)));
    }
    challenge(value) {
      if (this.canAccept(value)) {
        return true;
      } else {
        throw new Error(
          `A ${this.constructor.name} cannot contain the value: ${typeof value === "string" || typeof value === "object" ? JSON.stringify(value) : value}`
        );
      }
    }
    concat() {
      const out = this.constructor.from(this);
      Array.from(arguments).forEach((arr) => {
        arr.forEach((value) => {
          this.challenge(value);
          out.push(value);
        });
      });
      return out;
    }
    fill(value, start, end) {
      this.challenge(value);
      return super.fill(value, start, end);
    }
    filter(fn, thisArg) {
      if (typeof thisArg !== "undefined") {
        fn = fn.bind(thisArg);
      } else {
        fn = fn.bind(this);
      }
      const out = Array.from(this).filter(fn);
      try {
        return this.constructor.from(out);
      } catch (e) {
        return Array.from(out);
      }
    }
    from() {
      return this.constructor.from(...arguments);
    }
    map(fn, thisArg) {
      if (typeof thisArg !== "undefined") {
        fn = fn.bind(thisArg);
      } else {
        fn = fn.bind(this);
      }
      const out = Array.from(this).map(fn);
      try {
        return this.constructor.from(out);
      } catch (e) {
        return Array.from(out);
      }
    }
    push() {
      Array.from(arguments).forEach((value) => {
        this.challenge(value);
      });
      return super.push(...arguments);
    }
    slice(start, end) {
      if (!start) {
        start = 0;
      }
      if (!end) {
        end = this.length;
      }
      const out = this.constructor.from([]);
      for (let i = start; i < end; i++) {
        out.push(this[i]);
      }
      return out;
    }
    splice(index, count2, newValues) {
      newValues = newValues || [];
      if (index < 0) {
        const k = Math.floor(index / this.length);
        index -= k * this.length;
      }
      if (index + count2 >= this.length) {
        count2 = this.length - index;
      }
      const lengthDelta = newValues.length - count2;
      const removedValues = this.slice(index, index + count2);
      if (lengthDelta > 0) {
        for (let i = this.length - 1; i >= index + count2; i--) {
          this[i + lengthDelta] = this[i];
        }
      }
      if (lengthDelta < 0) {
        for (let i = index + count2; i < this.length; i++) {
          this[i + lengthDelta] = this[i];
        }
        this.length += lengthDelta;
      }
      for (let i = index; i < index + newValues.length; i++) {
        this[i] = newValues[i - index];
      }
      return removedValues;
    }
    toReversed() {
      const out = this.constructor.from([]);
      for (let i = this.length - 1; i >= 0; i--) {
        out.push(this[i]);
      }
      return out;
    }
    toSorted() {
      const temp = Array.from(this);
      temp.sort(...arguments);
      return this.constructor.from(temp);
    }
    toSpliced() {
      const temp = this.slice();
      temp.splice(...arguments);
      return temp;
    }
    unshift() {
      Array.from(arguments).forEach((value) => {
        this.challenge(value);
      });
      return super.unshift(...arguments);
    }
    with(index, value) {
      const out = this.slice();
      out[index] = value;
      return out;
    }
  };
  function createTypedArray(type, allowsSubclassInstances) {
    const key = allowsSubclassInstances ? "allowsSubclassInstances" : "doesNotAllowSubclassInstances";
    const typeString = typeof type === "function" ? type.name : type;
    const TempClass = (() => {
      if (TypedArray.registry[key][type]) {
        return TypedArray.registry[key][type];
      } else {
        class Temp extends TypedArray {
          constructor() {
            super(type, allowsSubclassInstances);
            if (!canUseNewKeyword[key][type]) {
              throw new Error(
                `New \`${this.constructor.name}\` instances cannot be created using the \`new\` keyword! They must be created using \`${this.constructor.name}.from([...])\`.`
              );
            }
          }
        }
        TypedArray.registry[key][type] = Temp;
        return Temp;
      }
    })();
    canUseNewKeyword[key][type] = true;
    const out = new TempClass(true);
    canUseNewKeyword[key][type] = false;
    Object.defineProperty(out.constructor, "name", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: `${pascalify(typeString)}Array`
    });
    Object.defineProperty(TempClass, "allowsSubclassInstances", {
      configurable: true,
      enumerable: true,
      writable: false,
      value: allowsSubclassInstances
    });
    Object.defineProperty(TempClass, "type", {
      configurable: true,
      enumerable: true,
      writable: false,
      value: type
    });
    TypedArray.registry[key][out.constructor.name] = type;
    return TypedArray.proxify(out);
  }

  // node_modules/@jrc03c/js-type-experiments/src/define-typed-property.mjs
  function defineTypedProperty(obj, prop, type, options) {
    options = options || {
      configurable: true,
      enumerable: true
    };
    let _value;
    const allowsSubclassInstances = typeof options.allowsSubclassInstances === "undefined" ? true : !!options.allowsSubclassInstances;
    if (typeof type !== "function" && typeof type !== "string") {
      throw new Error(
        `A 'type' value (i.e., a class name or a string like "number" representing a primitive type) must be passed as the third argument to the \`defineTypedProperty\` function!`
      );
    }
    if (type === null || typeof type === "undefined") {
      throw new Error(
        `A 'type' value (i.e., a class name or a string like "number" representing a primitive type) must be passed as the third argument to the \`defineTypedProperty\` function!`
      );
    }
    if (type === Array) {
      throw new Error(
        "It's not possible to create a property of type Array (though you *can* create a TypedArray property)!"
      );
    }
    function getTypeString() {
      if (typeof type === "function") {
        return type.name;
      } else {
        return type;
      }
    }
    function canAccept(value) {
      return isOfType(value, type, allowsSubclassInstances);
    }
    function challenge(value) {
      if (canAccept(value)) {
        return true;
      } else {
        throw new Error(
          `The '${prop}' property can only have ${getTypeString()} values assigned to it!`
        );
      }
    }
    Object.defineProperty(obj, prop, {
      ...options,
      get() {
        return _value;
      },
      set(value) {
        challenge(value);
        _value = value;
      }
    });
  }

  // node_modules/@jrc03c/make-key/src/index.mjs
  function makeKey4(keyLength, charset, randomFn) {
    if (typeof keyLength !== "number" || isNaN(keyLength)) {
      throw new Error(
        "The first value passed into the `makeKey` function must be a number!"
      );
    }
    if (charset) {
      if (charset instanceof Array) {
        charset = charset.join("");
      }
      if (typeof charset !== "string") {
        throw new Error(
          "The second argument passed into the `makeKey` function must be a string or array of strings!"
        );
      }
    }
    randomFn = randomFn || Math.random;
    if (typeof randomFn !== "function") {
      throw new Error(
        "The third argument passed into the `makeKey` function must be a function!"
      );
    }
    let out = "";
    charset = charset || "abcdef1234567890";
    for (let i = 0; i < keyLength; i++) {
      out += charset[Math.floor(randomFn() * charset.length)];
    }
    return out;
  }

  // src/classes/thing/index.mjs
  var Thing = class _Thing {
    static classRegistry = {};
    static objectRegistry = {};
    _children = [];
    _components = [];
    id = "";
    parent = null;
    constructor(data) {
      if (!this.constructor.classRegistry[this.constructor.name]) {
        this.constructor.classRegistry[this.constructor.name] = this.constructor;
      }
      data = data || {};
      const children = createTypedArray(_Thing);
      defineTypedProperty(this, "_children", children.constructor);
      this._children = children;
      if (data.children) {
        data.children.forEach((child) => {
          if (child instanceof _Thing) {
            this.addChild(child);
          } else {
            if (!this.constructor.classRegistry[child.className]) {
              throw new Error(
                `An object with a class name of "${child.className}" wants to instantiate itself, but there's no corresponding class in the class registry!`
              );
            }
            this.addChild(
              new this.constructor.classRegistry[child.className](child)
            );
          }
        });
      }
      const components = createTypedArray(Component);
      defineTypedProperty(this, "_components", components.constructor);
      this._components = components;
      if (data.components) {
        data.components.forEach((component) => {
          if (component instanceof Component) {
            this.addComponent(component);
          } else if (component.className) {
            if (!this.constructor.classRegistry[component.className]) {
              throw new Error(
                `A component with a class name of "${component.className}" wants to instantiate itself, but there's no corresponding class in the class registry!`
              );
            }
            this.addComponent(
              new this.constructor.classRegistry[component.className](component)
            );
          }
        });
      }
      defineTypedProperty(this, "id", "string");
      this.id = data.id || makeKey4(8);
      while (this.constructor.objectRegistry[this.id]) {
        this.id += "_copy";
      }
      this.constructor.objectRegistry[this.id] = this;
      defineTypedProperty(this, "parent", _Thing);
      if (data.parent) {
        if (data.parent instanceof _Thing) {
          this.parent = data.parent;
        }
        if (typeof data.parent === "string") {
          this.parent = this.constructor.objectRegistry[data.parent];
        }
      }
    }
    get children() {
      return Array.from(this._children);
    }
    set children(value) {
      throw new Error(
        "The `Thing.children` property is read-only! To add or remove children, use the `Thing.addChild` and `Thing.removeChild` methods."
      );
    }
    get components() {
      return Array.from(this._components);
    }
    set components(value) {
      throw new Error(
        "The `Thing.components` property is read-only! To add or remove components, use the `Thing.addComponent` and `Thing.removeComponent` methods."
      );
    }
    addChild(child) {
      if (!this._children.includes(child)) {
        this._children.push(child);
        child.parent = this;
      }
      return this;
    }
    addComponent(component) {
      if (!this._components.includes(component)) {
        this._components.push(component);
        component.owner = this;
      }
      return this;
    }
    copy() {
      return new this.constructor(this.toObject());
    }
    destroy() {
      this._children.forEach((c) => c.destroy());
      this._children = null;
      this._components.forEach((c) => c.destroy());
      this._components = null;
      this.parent = null;
      delete this.constructor.objectRegistry[this.id];
      return this;
    }
    removeChild(child) {
      if (this._children.includes(child)) {
        while (this._children.includes(child)) {
          this._children.splice(this._children.indexOf(child), 1);
        }
        child.parent = null;
      }
      return this;
    }
    removeComponent(component) {
      if (this._components.includes(component)) {
        while (this._components.includes(component)) {
          this._components.splice(this._components.indexOf(component), 1);
        }
        component.owner = null;
      }
      return this;
    }
    toObject() {
      return {
        className: this.constructor.name,
        children: Array.from(this._children.map((c) => c.toObject())),
        components: Array.from(this._components.map((c) => c.toObject())),
        id: this.id,
        parent: this.parent ? this.parent.id : void 0
      };
    }
    update() {
      this._children.forEach((c) => c.update(...arguments));
      this._components.forEach((c) => c.update(...arguments));
      return this;
    }
  };
  var Component = class extends Thing {
    _owner = null;
    constructor(data) {
      super(...arguments);
      data = data || {};
      defineTypedProperty(this, "_owner", Thing);
      if (data.owner) {
        if (data.owner instanceof Thing) {
          this._owner = data.owner;
        }
        if (typeof data.owner === "string") {
          this._owner = this.constructor.objectRegistry[data.owner];
        }
      }
    }
    // i've added these getters and setters so that subclasses can override them
    // to add functionality to and remove functionality from owners
    get owner() {
      return this._owner;
    }
    set owner(v) {
      this._owner = v;
    }
    destroy() {
      const out = super.destroy();
      this._owner = null;
      return out;
    }
    toObject() {
      return {
        ...super.toObject(),
        owner: this._owner ? this._owner.id : void 0
      };
    }
  };
  Thing.classRegistry["Component"] = Component;
  Thing.classRegistry["Thing"] = Thing;

  // node_modules/@jrc03c/vector2/src/index.mjs
  var Vector2 = class _Vector2 {
    static fromAngle(a) {
      const v = new _Vector2(1, 0);
      v.angle = a;
      return v;
    }
    static random(randomFn) {
      randomFn = randomFn || Math.random;
      return this.fromAngle(randomFn() * 2 * Math.PI);
    }
    x = 0;
    y = 0;
    // valid forms:
    // - new Vector2(options)
    // - new Vector2([x, y])
    // - new Vector2(x, y)
    constructor() {
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          const v = arguments[0];
          if (v instanceof Array) {
            this.x = v[0] || 0;
            this.y = v[1] || 0;
          } else {
            this.x = v.x || 0;
            this.y = v.y || 0;
          }
        } else {
          this.x = arguments[0] || 0;
          this.y = arguments[1] || 0;
        }
      }
    }
    get angle() {
      const angle = Math.atan(this.y / this.x) + (this.x < 0 ? Math.PI : 0);
      const k = Math.floor(angle / (Math.PI * 2));
      return angle - k * Math.PI * 2;
    }
    set angle(v) {
      const { length } = this;
      this.x = length * Math.cos(v);
      this.y = length * Math.sin(v);
    }
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set length(v) {
      this.norm().mul(v);
    }
    get magnitude() {
      return this.length;
    }
    set magnitude(v) {
      this.length = v;
    }
    // valid forms:
    // - add(Vector2)
    // - add(number)
    // - add(number, number)
    add() {
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          const v = arguments[0];
          if (v instanceof _Vector2) {
            this.x += v.x;
            this.y += v.y;
          } else {
            this.x += v;
            this.y += v;
          }
        } else {
          this.x += arguments[0];
          this.y += arguments[1];
        }
      }
      return this;
    }
    copy() {
      return new _Vector2(this);
    }
    // valid forms:
    // - div(Vector2)
    // - div(number)
    // - div(number, number)
    div() {
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          const v = arguments[0];
          if (arguments[0] instanceof _Vector2) {
            this.x /= v.x;
            this.y /= v.y;
          } else {
            this.x /= v;
            this.y /= v;
          }
        } else {
          this.x /= arguments[0];
          this.y /= arguments[1];
        }
      }
      return this;
    }
    divide() {
      return this.div(...arguments);
    }
    dot(v) {
      return this.x * v.x + this.y * v.y;
    }
    // valid forms:
    // - mul(Vector2)
    // - mul(number)
    // - mul(number, number)
    mul() {
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          const v = arguments[0];
          if (arguments[0] instanceof _Vector2) {
            this.x *= v.x;
            this.y *= v.y;
          } else {
            this.x *= v;
            this.y *= v;
          }
        } else {
          this.x *= arguments[0];
          this.y *= arguments[1];
        }
      }
      return this;
    }
    multiply() {
      return this.mul(...arguments);
    }
    norm() {
      return this.div(this.length);
    }
    normalize() {
      return this.norm(...arguments);
    }
    rotate(a) {
      this.angle += a;
    }
    scale() {
      return this.mul(...arguments);
    }
    // valid forms:
    // - sub(Vector2)
    // - sub(number)
    // - sub(number, number)
    sub() {
      if (arguments.length > 0) {
        if (arguments.length === 1) {
          const v = arguments[0];
          if (v instanceof _Vector2) {
            this.x -= v.x;
            this.y -= v.y;
          } else {
            this.x -= v;
            this.y -= v;
          }
        } else {
          this.x -= arguments[0];
          this.y -= arguments[1];
        }
      }
      return this;
    }
    subtract() {
      return this.sub(...arguments);
    }
  };

  // src/classes/data/mouse.mjs
  var Mouse = class extends Vector2 {
    hasLeftButtonDown = false;
    hasRightButtonDown = false;
  };
  Thing.classRegistry["Mouse"] = Mouse;

  // src/classes/data/point.mjs
  var Point = class extends Vector2 {
  };
  Thing.classRegistry["Point"] = Point;

  // src/classes/data/rect.mjs
  var Rect = class _Rect {
    position = new Vector2();
    dimensions = new Vector2();
    constructor(data) {
      data = data || {};
      defineTypedProperty(this, "position", Vector2);
      this.position = new Vector2();
      defineTypedProperty(this, "dimensions", Vector2);
      this.dimensions = new Vector2();
      if (data.position) {
        this.position.x = data.position.x || 0;
        this.position.y = data.position.y || 0;
      } else if (data.x && data.y) {
        this.position.x = data.x || 0;
        this.position.y = data.y || 0;
      }
      if (data.dimensions) {
        this.dimensions.x = data.dimensions.x || 0;
        this.dimensions.y = data.dimensions.y || 0;
      } else if (data.width && data.height) {
        this.dimensions.x = data.width || 0;
        this.dimensions.y = data.height || 0;
      }
    }
    get area() {
      return this.dimensions.x * this.dimensions.y;
    }
    get height() {
      return this.dimensions.y;
    }
    set height(value) {
      this.dimensions.y = value;
    }
    get width() {
      return this.dimensions.x;
    }
    set width(value) {
      this.dimensions.x = value;
    }
    get x() {
      return this.position.x;
    }
    set x(value) {
      this.position.x = value;
    }
    get y() {
      return this.position.y;
    }
    set y(value) {
      this.position.y = value;
    }
    copy() {
      return new _Rect(this);
    }
    containsPoint(p) {
      return p.x >= this.position.x && p.x <= this.position.x + this.dimensions.x && p.y >= this.position.y && p.y <= this.position.y + this.dimensions.y;
    }
    toObject() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }
  };
  Thing.classRegistry["Rect"] = Rect;

  // src/classes/scene/index.mjs
  var Scene = class extends Thing {
    isPaused = false;
    isRunning = false;
    constructor() {
      super(...arguments);
      defineTypedProperty(this, "isPaused", "boolean");
      this.isPaused = false;
      defineTypedProperty(this, "isRunning", "boolean");
      this.isRunning = false;
    }
    destroy() {
      this.stop();
      this.isPaused = null;
      this.isRunning = null;
      return super.destroy();
    }
    pause() {
      if (this.isPaused) {
        return this;
      }
      this.isPaused = true;
      return this;
    }
    start() {
      if (this.isRunning) {
        return this;
      }
      this.isRunning = true;
      return this;
    }
    stop() {
      if (!this.isRunning) {
        return this;
      }
      this.isRunning = false;
      return this;
    }
    unpause() {
      if (!this.isPaused) {
        return this;
      }
      this.isPaused = false;
      return this;
    }
  };
  Thing.classRegistry["Scene"] = Scene;

  // src/classes/scene/scene-with-update-loop.mjs
  var SceneWithUpdateLoop = class extends Scene {
    lastUpdateTime = null;
    constructor() {
      super(...arguments);
      defineTypedProperty(this, "lastUpdateTime", "number");
    }
    destroy() {
      this.lastUpdateTime = null;
      return super.destroy();
    }
    start() {
      const out = super.start(...arguments);
      this.lastUpdateTime = performance.now();
      if (typeof requestAnimationFrame === "undefined") {
        const interval = setInterval(() => {
          if (!this.isRunning) {
            return clearInterval(interval);
          }
          if (!this.isPaused) {
            const now = performance.now();
            const deltaTime = (now - this.lastUpdateTime) / 1e3;
            this.update(deltaTime);
            this.lastUpdateTime = now;
          }
        }, 1e3 / 60);
      } else {
        const loop = () => {
          if (!this.isRunning) {
            return;
          }
          if (!this.isPaused) {
            const now = performance.now();
            const deltaTime = (now - this.lastUpdateTime) / 1e3;
            this.update(deltaTime);
            this.lastUpdateTime = now;
          }
          requestAnimationFrame(loop);
        };
        loop();
      }
      return out;
    }
  };
  Thing.classRegistry["SceneWithUpdateLoop"] = SceneWithUpdateLoop;

  // src/index.mjs
  Thing.classRegistry["Vector2"] = Vector2;

  // node_modules/@jrc03c/base-web-component/src/index.mjs
  var BaseComponent = class extends HTMLElement {
    static css = ``;
    static observedAttributes = [];
    static template = (
      /* html */
      `
    <div class="x-base">
      <slot></slot>
    </div>
  `
    );
    eventListeners = [];
    constructor(options) {
      super();
      options = options || {};
      sort(set(this.constructor.observedAttributes)).forEach((attr) => {
        Object.defineProperty(this, camelify(attr), {
          configurable: true,
          enumerable: true,
          get() {
            return this.getAttribute(attr);
          },
          set(value) {
            this.setAttribute(attr, value);
          }
        });
      });
      const temp = document.createElement("template");
      temp.innerHTML = `
      <style>${this.constructor.css + (options.css || "")}</style>
      ${this.constructor.template}
    `;
      const deep = true;
      const clone = document.importNode(temp.content, deep);
      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(clone);
      if (options.el) {
        const el = typeof options.el === "string" ? document.querySelector(options.el) : options.el;
        el.appendChild(this);
      }
    }
    attributeChangedCallback() {
    }
    connectedCallback() {
      if (!this.isMounted) {
        this.mount(this.parentElement);
      }
    }
    destroy() {
      if (this.isMounted) {
        this.unmount();
      }
      this.removeAllEventListeners();
    }
    disconnectedCallback() {
      if (this.isMounted) {
        this.unmount();
      }
    }
    getAttribute(attr) {
      const out = super.getAttribute(attr);
      try {
        return JSON.parse(out);
      } catch (e) {
        return out;
      }
    }
    mount(el) {
      if (this.isMounted) return;
      if (!el) {
        throw new Error(
          "You must pass an element or a selector into the `BaseComponent.mount` method!"
        );
      }
      el = typeof el === "string" ? document.querySelector(el) : el;
      if (!Array.from(el.children).includes(this)) {
        el.appendChild(this);
      }
      window.requestAnimationFrame(() => this.dispatchEvent(new Event("mount")));
      window.requestAnimationFrame(() => this.onMounted());
      this.isMounted = true;
    }
    off(target, event, callback) {
      const listener = this.eventListeners.find(
        (listener2) => listener2.target === target && listener2.event === event && listener2.callback === callback
      );
      if (listener) {
        listener.remove();
      } else {
        target.removeEventListener(event, callback);
      }
    }
    on(target, event, callback) {
      const remove = () => target.removeEventListener(event, callback);
      const listener = {
        callback,
        event,
        remove,
        target
      };
      target.addEventListener(event, callback);
      this.eventListeners.push(listener);
      return remove;
    }
    onMounted() {
    }
    onUnmounted() {
    }
    removeAllEventListeners() {
      this.eventListeners.forEach((listener) => {
        try {
          listener.remove();
        } catch (e) {
        }
      });
      this.eventListeners = [];
    }
    setAttribute(attr, value) {
      if (typeof value !== "string") {
        value = JSON.stringify(value);
      }
      super.setAttribute(attr, value);
    }
    unmount() {
      if (!this.isMounted) return;
      if (this.parentElement) {
        try {
          this.parentElement.removeChild(this);
        } catch (e) {
        }
      }
      window.requestAnimationFrame(() => this.dispatchEvent(new Event("unmount")));
      window.requestAnimationFrame(() => this.onUnmounted());
      this.isMounted = false;
    }
  };

  // node_modules/@jrc03c/create-high-dpi-canvas/src/index.mjs
  var HighDPICanvasElementResizeEvent = class extends Event {
    constructor(width, height, options) {
      super("resize", options);
      this.width = width;
      this.height = height;
    }
  };
  var HighDPICanvasElement = class extends BaseComponent {
    static css = BaseComponent.css + `
      canvas {
        margin: 0;
        padding: 0;
        border: 0;
      }
    `;
    static forwardedEvents = [
      "contextlost",
      "contextrestored",
      "webglcontextcreationerror",
      "webglcontextlost",
      "webglcontextrestored"
    ];
    static observedAttributes = BaseComponent.observedAttributes.concat([
      "height",
      "width"
    ]);
    static tagName = "high-dpi-canvas";
    static template = "<canvas></canvas>";
    // NOTE: CONSTRUCTORS CAN'T BE USED WITH WEB COMPONENTS! Or, at the very
    // least, they're stupid and complicated, and I can't figure out when and why
    // they work or don't work. So, for now, they SHOULD NOT BE USED! Instead,
    // create new high-DPI canvases using `document.createElement` (*after* this
    // component has been registered as a custom element, of course). Finally,
    // anything you'd normally do in the constructor should be done in the
    // `connectedCallback` method instead.
    //
    // constructor(width, height) {
    //   super()
    //   this.dimensions = [width, height]
    //   this.onOuterResize(false)
    // }
    isMounted = false;
    get dimensions() {
      return [this.width, this.height];
    }
    set dimensions(value) {
      this.width = value[0];
      this.height = value[1];
    }
    get element() {
      return this.shadowRoot.querySelector("canvas");
    }
    attributeChangedCallback(name, oldValue, newValue) {
      const out = super.attributeChangedCallback(...arguments);
      if (name === "height") {
        try {
          newValue = JSON.parse(newValue);
        } catch (e) {
        }
        this.style.height = `${newValue}px`;
      }
      if (name === "width") {
        try {
          newValue = JSON.parse(newValue);
        } catch (e) {
        }
        this.style.width = `${newValue}px`;
      }
      if (!this.isMounted) {
        this.onOuterResize(true);
      }
      return out;
    }
    captureStream() {
      return this.element.captureStream(...arguments);
    }
    connectedCallback() {
      const out = super.connectedCallback(...arguments);
      this.style.overflow = "hidden";
      this.style.display = "flex";
      this.style.flexDirection = "row";
      this.style.flexWrap = "nowrap";
      this.style.justifyContent = "center";
      this.style.alignContent = "center";
      this.style.alignItems = "center";
      const { element } = this;
      this.eventListeners = [];
      this.constructor.forwardedEvents.forEach((eventName) => {
        this.on(element, eventName, (event) => {
          this.dispatchEvent(
            new Event(eventName, {
              bubbles: true,
              composed: true,
              detail: { ...event.detail }
            })
          );
        });
      });
      let first = true;
      this.resizeObserver = new ResizeObserver(() => {
        if (first) {
          first = false;
          return;
        }
        const { width, height } = this.getBoundingClientRect();
        this.width = width;
        this.height = height;
        this.onOuterResize(true);
      });
      this.onOuterResize(false);
      this.resizeObserver.observe(this);
      this.isMounted = true;
      return out;
    }
    disconnectedCallback() {
      const out = super.disconnectedCallback(...arguments);
      this.eventListeners.forEach((listener) => {
        try {
          listener.remove();
        } catch (e) {
        }
      });
      this.isMounted = false;
      return out;
    }
    getContext() {
      return this.element.getContext(...arguments);
    }
    onOuterResize(shouldEmitEvent) {
      const { element } = this;
      const dpi = window.devicePixelRatio || 1;
      element.width = Math.floor(this.width * dpi);
      element.height = Math.floor(this.height * dpi);
      element.style.width = `${this.width}px`;
      element.style.height = `${this.height}px`;
      const context = element.getContext("2d");
      context.resetTransform();
      context.scale(dpi, dpi);
      if (shouldEmitEvent || typeof shouldEmitEvent === "undefined") {
        this.dispatchEvent(
          new HighDPICanvasElementResizeEvent(this.width, this.height)
        );
      }
    }
    toBlob() {
      return this.element.toBlob(...arguments);
    }
    toDataURL() {
      return this.element.toDataURL(...arguments);
    }
    transferControlToOffscreen() {
      return this.element.transferControlToOffscreen(...arguments);
    }
  };
  function createHighDPICanvas(width, height) {
    const canvas = document.createElement(HighDPICanvasElement.tagName);
    canvas.dimensions = [width, height];
    return canvas;
  }
  try {
    if (globalThis.customElements && !globalThis.customElements.get(HighDPICanvasElement.tagName)) {
      globalThis.customElements.define(
        HighDPICanvasElement.tagName,
        HighDPICanvasElement
      );
    }
  } catch (e) {
  }

  // demo/src/main.mjs
  var CanvasComponent = class extends Component {
    canvas = null;
    constructor(data) {
      super(...arguments);
      data = data || {};
      this.canvas = createHighDPICanvas(data.width, data.height);
    }
  };
  var DimensionsComponent = class extends Component {
    dimensions = null;
    constructor(data) {
      super(...arguments);
      data = data || {};
      this.dimensions = new Vector2(
        data.dimensions ? data.dimensions.x : data.x,
        data.dimensions ? data.dimensions.y : data.y
      );
    }
    get height() {
      return this.dimensions.y;
    }
    set height(v) {
      this.dimensions.y = v;
    }
    get width() {
      return this.dimensions.x;
    }
    set width(v) {
      this.dimensions.x = v;
    }
  };
  var PositionComponent = class extends Component {
    position = null;
    constructor(data) {
      super(...arguments);
      data = data || {};
      this.position = new Vector2(
        data.position ? data.position.x : data.x,
        data.position ? data.position.y : data.y
      );
    }
  };
  var Card = class _Card extends Thing {
    static FontSize = 24;
    static Symbol = {
      Clubs: "\u2663",
      Diamonds: "\u2666",
      Hearts: "\u2665",
      Spades: "\u2660"
    };
    static createDeck() {
      const out = [];
      const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
      const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
      for (const value of values) {
        for (const suit of suits) {
          out.push(new _Card({ suit, value }));
        }
      }
      out.push(new _Card({ value: "Joker" }));
      out.push(new _Card({ value: "Joker" }));
      return out;
    }
    dimensionsComponent = null;
    isActive = false;
    isHovered = false;
    positionComponent = null;
    suit = null;
    value = null;
    constructor(data) {
      super(...arguments);
      data = data || {};
      this.dimensionsComponent = new DimensionsComponent({
        dimensions: data.dimensions || new Vector2({ x: 128, y: 192 })
      });
      this.positionComponent = new PositionComponent({ position: data.position });
      this.suit = data.suit || this.suit;
      this.value = data.value || this.value;
    }
    get dimensions() {
      return this.dimensionsComponent.dimensions;
    }
    set dimensions(v) {
      this.dimensionsComponent.dimensions = v;
    }
    get height() {
      return this.dimensionsComponent.dimensions.y;
    }
    set height(v) {
      this.dimensionsComponent.dimensions.y = v;
    }
    get position() {
      return this.positionComponent.position;
    }
    set position(v) {
      this.positionComponent.position = v;
    }
    get symbol() {
      return _Card.Symbol[this.suit];
    }
    set symbol(v) {
      this.suit = Object.keys(_Card.Symbol).find((key) => _Card.Symbol[key] === v);
    }
    get width() {
      return this.dimensionsComponent.dimensions.x;
    }
    set width(v) {
      this.dimensionsComponent.dimensions.x = v;
    }
    draw(context) {
      const { dimensions, position } = this;
      context.save();
      context.translate(position.x, position.y);
      context.fillStyle = this.isActive ? "rgb(240, 240, 240)" : this.isHovered ? "rgb(250, 250, 250)" : "white";
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.fillRect(0, 0, dimensions.x, dimensions.y);
      context.strokeRect(0, 0, dimensions.x, dimensions.y);
      context.font = `${_Card.FontSize}px monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      if (this.suit === "Diamonds" || this.suit === "Hearts") {
        context.fillStyle = "red";
      } else {
        context.fillStyle = "black";
      }
      context.fillText(
        this.symbol,
        dimensions.x / 2,
        dimensions.y / 2 - _Card.FontSize / 2
      );
      context.fillText(
        this.value,
        dimensions.x / 2,
        dimensions.y / 2 + _Card.FontSize / 2
      );
      context.restore();
      return this;
    }
    containsPoint(p) {
      const { dimensions, position } = this;
      return p.x >= position.x && p.x <= position.x + dimensions.x && p.y >= position.y && p.y <= position.y + dimensions.y;
    }
  };
  var SolitaireEndScene = class extends SceneWithUpdateLoop {
    canvasComponent = null;
    cards = [];
    deltaTimes = [];
    gravity = null;
    velocities = [];
    constructor() {
      super(...arguments);
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.canvasComponent = new CanvasComponent({ width, height });
      const context = this.canvasComponent.canvas.getContext("2d");
      this.addComponent(this.canvasComponent);
      document.body.append(this.canvasComponent.canvas);
      const deck = Card.createDeck();
      this.cards = deck.filter((c) => c.value === "A");
      const xstep = width / (this.cards.length + 1);
      this.cards.forEach((c, i) => {
        c.position.x = (i + 1) * xstep - c.dimensions.x / 2;
        c.position.y = c.dimensions.y / 2;
      });
      const scalar = 500;
      this.deltaTimes = [];
      this.gravity = new Vector2({ x: 0, y: 10 * scalar });
      this.velocities = this.cards.map(() => new Vector2());
      const reset = () => {
        this.cards.forEach((c, i) => {
          c.position.x = (i + 1) * xstep - c.dimensions.x / 2;
          c.position.y = c.dimensions.y / 2;
        });
        this.velocities.forEach((v) => {
          v.x = (Math.random() * 2 - 1) * 1 * scalar;
          v.y = (Math.random() * 2 - 1) * 2 * scalar;
        });
        context.fillStyle = "green";
        context.fillRect(0, 0, width, height);
      };
      window.addEventListener("click", reset);
      reset();
    }
    update(deltaTime) {
      const { width, height } = this.canvasComponent.canvas;
      const context = this.canvasComponent.canvas.getContext("2d");
      this.cards.forEach((card, i) => {
        const velocity = this.velocities[i];
        velocity.add(this.gravity.copy().scale(deltaTime));
        card.position.add(velocity.copy().scale(deltaTime));
        if (card.position.x < 0 || card.position.x + card.dimensions.x > width) {
          velocity.x *= -1;
          if (card.position.x < 0) {
            card.position.x = 0;
          }
          if (card.position.x + card.dimensions.x > width) {
            card.position.x = width - card.dimensions.x;
          }
        }
        if (card.position.y + card.dimensions.y > height) {
          velocity.x *= 0.95;
          velocity.y *= -0.67;
          card.position.y = height - card.dimensions.y;
        }
        card.draw(context);
      });
      this.deltaTimes.push(deltaTime);
      if (this.deltaTimes.length > 360) {
        this.deltaTimes.shift();
      }
      const deltaTimeMean = this.deltaTimes.reduce((sum2, dt) => sum2 + dt, 0) / this.deltaTimes.length;
      const fps = 1 / deltaTimeMean;
      const text = `FPS: ${fps.toFixed(2)}`;
      context.font = `12px monospace`;
      context.fillStyle = "black";
      context.fillRect(0, 0, 256, 44);
      context.fillStyle = "white";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.fillText(text, 16, 16);
      return super.update(...arguments);
    }
  };
  var scene = new SolitaireEndScene();
  scene.start();
})();
