(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/@jrc03c/js-text-tools/src/camelify.js
  var require_camelify = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/camelify.js"(exports, module) {
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
      module.exports = camelify;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/indent.js
  var require_indent = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/indent.js"(exports, module) {
      function indent(text, chars) {
        chars = chars || "";
        return text.split("\n").map((line) => {
          if (line.trim().length > 0) {
            return chars + line;
          } else {
            return line;
          }
        }).join("\n");
      }
      module.exports = indent;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/punctuation.js
  var require_punctuation = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/punctuation.js"(exports, module) {
      module.exports = "!\"#%&'()*+,-./:;<=>?@[]^_`{|}~\xA0\xA1\xA4\xA7\xA9\xAA\xAB\xAE\xB0\xB1\xB6\xB7\xBA\xBB\xBF\xD7\xF7\u0254\u0300\u0301\u0302\u0303\u037E\u0387\u055A\u055B\u055C\u055D\u055E\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A\u066B\u066C\u066D\u06D4\u0700\u0701\u0702\u0703\u0704\u0705\u0706\u0707\u0708\u0709\u070A\u070B\u070C\u070D\u07F7\u07F8\u07F9\u0830\u0831\u0832\u0833\u0834\u0835\u0836\u0837\u0838\u0839\u083A\u083B\u083C\u083D\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04\u0F05\u0F06\u0F07\u0F08\u0F09\u0F0A\u0F0B\u0F0C\u0F0D\u0F0E\u0F0F\u0F10\u0F11\u0F12\u0F14\u0F3A\u0F3B\u0F3C\u0F3D\u0F85\u0FD0\u0FD1\u0FD2\u0FD3\u0FD4\u0FD9\u0FDA\u104A\u104B\u104C\u104D\u104E\u104F\u10FB\u1360\u1361\u1362\u1363\u1364\u1365\u1366\u1367\u1368\u1400\u166E\u169B\u169C\u16EB\u16EC\u16ED\u1735\u1736\u17D4\u17D5\u17D6\u17D8\u17D9\u17DA\u1800\u1801\u1802\u1803\u1804\u1805\u1806\u1807\u1808\u1809\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0\u1AA1\u1AA2\u1AA3\u1AA4\u1AA5\u1AA6\u1AA8\u1AA9\u1AAA\u1AAB\u1AAC\u1AAD\u1B5A\u1B5B\u1B5C\u1B5D\u1B5E\u1B5F\u1B60\u1BFC\u1BFD\u1BFE\u1BFF\u1C3B\u1C3C\u1C3D\u1C3E\u1C3F\u1C7E\u1C7F\u1CC0\u1CC1\u1CC2\u1CC3\u1CC4\u1CC5\u1CC6\u1CC7\u1CD3\u2010\u2011\u2012\u2013\u2014\u2015\u2016\u2017\u2018\u2019\u201A\u201B\u201C\u201D\u201E\u201F\u2020\u2021\u2022\u2023\u2024\u2025\u2026\u2027\u2030\u2031\u2032\u2033\u2034\u2035\u2036\u2037\u2038\u2039\u203A\u203B\u203C\u203D\u203E\u203F\u2040\u2041\u2042\u2043\u2045\u2046\u2047\u2048\u2049\u204A\u204B\u204C\u204D\u204E\u204F\u2050\u2051\u2052\u2053\u2054\u2055\u2056\u2057\u2058\u2059\u205A\u205B\u205C\u205D\u205E\u207D\u207E\u208D\u208E\u2116\u2117\u2120\u2122\u212E\u2212\u2234\u2235\u2248\u2300\u2308\u2309\u230A\u230B\u2311\u2329\u232A\u2380\u25CA\u25CC\u261E\u2640\u2642\u26A5\u2766\u2767\u2768\u2769\u276A\u276B\u276C\u276D\u276E\u276F\u2770\u2771\u2772\u2773\u2774\u2775\u27C5\u27C6\u27E6\u27E7\u27E8\u27E9\u27EA\u27EB\u27EC\u27ED\u27EE\u27EF\u2983\u2984\u2985\u2986\u2987\u2988\u2989\u298A\u298B\u298C\u298D\u298E\u298F\u2990\u2991\u2992\u2993\u2994\u2995\u2996\u2997\u2998\u29D8\u29D9\u29DA\u29DB\u29FC\u29FD\u2CF9\u2CFA\u2CFB\u2CFC\u2CFE\u2CFF\u2D70\u2E00\u2E01\u2E02\u2E03\u2E04\u2E05\u2E06\u2E07\u2E08\u2E09\u2E0A\u2E0B\u2E0C\u2E0D\u2E0E\u2E0F\u2E10\u2E11\u2E12\u2E13\u2E14\u2E15\u2E16\u2E17\u2E18\u2E19\u2E1A\u2E1B\u2E1C\u2E1D\u2E1E\u2E1F\u2E20\u2E21\u2E22\u2E23\u2E24\u2E25\u2E26\u2E27\u2E28\u2E29\u2E2A\u2E2B\u2E2C\u2E2D\u2E2E\u2E30\u2E31\u2E32\u2E33\u2E34\u2E35\u2E36\u2E37\u2E38\u2E39\u2E3A\u2E3B\u2E3C\u2E3D\u2E3E\u2E3F\u2E40\u2E41\u2E42\u2E43\u2E44\u2E45\u2E46\u2E47\u2E48\u2E49\u2E4A\u2E4B\u2E4C\u2E4D\u2E4E\u2E4F\u2E52\u3001\u3002\u3003\u3008\u3009\u300A\u300B\u300C\u300D\u300E\u300F\u3010\u3011\u3014\u3015\u3016\u3017\u3018\u3019\u301A\u301B\u301C\u301D\u301E\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D\uA60E\uA60F\uA673\uA67E\uA6F2\uA6F3\uA6F4\uA6F5\uA6F6\uA6F7\uA874\uA875\uA876\uA877\uA8CE\uA8CF\uA8F8\uA8F9\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1\uA9C2\uA9C3\uA9C4\uA9C5\uA9C6\uA9C7\uA9C8\uA9C9\uA9CA\uA9CB\uA9CC\uA9CD\uA9DE\uA9DF\uAA5C\uAA5D\uAA5E\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uD800\uD801\uD802\uD803\uD804\uD805\uD806\uD807\uD809\uD81A\uD81B\uD82F\uD836\uD83A\u{1F03B}\uDC41\uDC42\uDC43\uDC44\uDC45\uDC47\uDC48\uDC49\uDC4A\uDC4B\uDC4C\uDC4D\uDC4E\uDC4F\uDC57\uDC5A\uDC5B\uDC5D\uDC70\uDC71\uDC72\uDC73\uDC74\uDC9F\uDCBB\uDCBC\uDCBE\uDCBF\uDCC0\uDCC1\uDCC6\uDD00\uDD01\uDD02\uDD1F\uDD2F\uDD3F\uDD40\uDD41\uDD42\uDD43\uDD44\uDD45\uDD46\uDD5E\uDD5F\uDD6F\uDD74\uDD75\uDDC1\uDDC2\uDDC3\uDDC4\uDDC5\uDDC6\uDDC7\uDDC8\uDDC9\uDDCA\uDDCB\uDDCC\uDDCD\uDDCE\uDDCF\uDDD0\uDDD1\uDDD2\uDDD3\uDDD4\uDDD5\uDDD6\uDDD7\uDDDB\uDDDD\uDDDE\uDDDF\uDDE2\uDE38\uDE39\uDE3A\uDE3B\uDE3C\uDE3D\uDE3F\uDE40\uDE41\uDE42\uDE43\uDE44\uDE45\uDE46\uDE50\uDE51\uDE52\uDE53\uDE54\uDE55\uDE56\uDE57\uDE58\uDE60\uDE61\uDE62\uDE63\uDE64\uDE65\uDE66\uDE67\uDE68\uDE69\uDE6A\uDE6B\uDE6C\uDE6E\uDE6F\uDE7F\uDE87\uDE88\uDE89\uDE8A\uDE8B\uDE97\uDE98\uDE99\uDE9A\uDE9B\uDE9C\uDE9E\uDE9F\uDEA0\uDEA1\uDEA2\uDEA9\uDEAD\uDEF0\uDEF1\uDEF2\uDEF3\uDEF4\uDEF5\uDEF6\uDEF7\uDEF8\uDF37\uDF38\uDF39\uDF3A\uDF3B\uDF3C\uDF3D\uDF3E\uDF3F\uDF44\uDF55\uDF56\uDF57\uDF58\uDF59\uDF99\uDF9A\uDF9B\uDF9C\uDF9F\uDFD0\uDFE2\uDFFF\uFD3F\uFE10\uFE11\uFE12\uFE13\uFE14\uFE15\uFE16\uFE17\uFE18\uFE19\uFE30\uFE31\uFE32\uFE33\uFE34\uFE35\uFE36\uFE37\uFE38\uFE39\uFE3A\uFE3B\uFE3C\uFE3D\uFE3E\uFE3F\uFE40\uFE41\uFE42\uFE43\uFE44\uFE45\uFE46\uFE47\uFE48\uFE49\uFE4A\uFE4B\uFE4C\uFE4D\uFE4E\uFE4F\uFE50\uFE51\uFE52\uFE54\uFE55\uFE56\uFE57\uFE58\uFE59\uFE5A\uFE5B\uFE5C\uFE5D\uFE5E\uFE5F\uFE60\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01\uFF02\uFF03\uFF05\uFF06\uFF07\uFF08\uFF09\uFF0A\uFF0C\uFF0D\uFF0E\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B\uFF3C\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F\uFF60\uFF61\uFF62\uFF63\uFF64\uFF65";
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/replace-all.js
  var require_replace_all = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/replace-all.js"(exports, module) {
      function replaceAll(text, a, b) {
        if (typeof text !== "string") {
          throw new Error("`text` must be a string!");
        }
        if (typeof a !== "string") {
          throw new Error("`a` must be a string!");
        }
        if (typeof b !== "string") {
          throw new Error("`b` must be a string!");
        }
        return text.split(a).join(b);
      }
      module.exports = replaceAll;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/strip.js
  var require_strip = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/strip.js"(exports, module) {
      var punctuation = require_punctuation();
      var replaceAll = require_replace_all();
      var doubleSpace = "  ";
      var singleSpace = " ";
      function strip(text) {
        if (typeof text !== "string") {
          throw new Error("`text` must be a string!");
        }
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const char = text[i].toLowerCase();
          if (punctuation.includes(char)) {
            out += singleSpace;
          } else {
            out += char;
          }
        }
        while (out.includes(doubleSpace)) {
          out = replaceAll(out, doubleSpace, singleSpace);
        }
        return out.trim();
      }
      module.exports = strip;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/kebabify.js
  var require_kebabify = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/kebabify.js"(exports, module) {
      var strip = require_strip();
      function kebabify(text) {
        if (typeof text !== "string") {
          throw new Error("`text` must be a string!");
        }
        const words = strip(text).split(" ");
        if (words.length === 0)
          return "";
        if (words.length === 1)
          return words[0];
        return words.join("-");
      }
      module.exports = kebabify;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/math-error.js
  var require_math_error = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/math-error.js"(exports, module) {
      var isBrowser = new Function(`
  try {
    return this === window
  } catch(e) {}

  try {
    return typeof importScripts !== "undefined"
  } catch(e) {}

  return false
`);
      var MathError = class extends Error {
        constructor(message) {
          if (isBrowser()) {
            super(message);
          } else {
            super("\n\n\x1B[31m" + message + "\n\x1B[0m");
          }
        }
      };
      module.exports = MathError;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/assert.js
  var require_assert = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/assert.js"(exports, module) {
      var MathError = require_math_error();
      module.exports = function(isTrue, message) {
        if (!isTrue)
          throw new MathError(message);
      };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-undefined.js
  var require_is_undefined = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-undefined.js"(exports, module) {
      function isUndefined(x) {
        return x === null || typeof x === "undefined";
      }
      module.exports = isUndefined;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/array-types.js
  var require_array_types = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/array-types.js"(exports, module) {
      module.exports = [
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
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-array.js
  var require_is_array = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-array.js"(exports, module) {
      var isUndefined = require_is_undefined();
      var types = require_array_types();
      var typeStrings = types.map((s) => s.name);
      function isArray(obj) {
        try {
          if (obj instanceof Array) {
            return true;
          }
          if (!isUndefined(obj.constructor)) {
            return types.indexOf(obj.constructor) > -1 || typeStrings.indexOf(obj.constructor.name) > -1;
          }
          return false;
        } catch (e) {
          return false;
        }
      }
      module.exports = isArray;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-dataframe.js
  var require_is_dataframe = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-dataframe.js"(exports, module) {
      function isDataFrame(x) {
        try {
          return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/dataframe");
        } catch (e) {
          return false;
        }
      }
      module.exports = isDataFrame;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-function.js
  var require_is_function = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-function.js"(exports, module) {
      function isFunction(fn) {
        return typeof fn === "function";
      }
      module.exports = isFunction;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-number.js
  var require_is_number = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-number.js"(exports, module) {
      function isNumber(x) {
        return typeof x === "number" && !isNaN(x) || typeof x === "bigint";
      }
      module.exports = isNumber;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-object.js
  var require_is_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-object.js"(exports, module) {
      var isArray = require_is_array();
      var isUndefined = require_is_undefined();
      function isObject(x) {
        return typeof x === "object" && !isUndefined(x) && !isArray(x);
      }
      module.exports = isObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-series.js
  var require_is_series = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-series.js"(exports, module) {
      function isSeries(x) {
        try {
          return !!x._symbol && x._symbol === Symbol.for("@jrc03c/js-math-tools/series");
        } catch (e) {
          return false;
        }
      }
      module.exports = isSeries;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/index-of.js
  var require_index_of = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/index-of.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isNumber = require_is_number();
      var isObject = require_is_object();
      var isSeries = require_is_series();
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
        function helper(x2, fn2, checked) {
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
              const results = helper(value, fn2, checked);
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
              const results = helper(value, fn2, checked);
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
        const paths = helper(x, safeFn);
        if (paths && paths.length > 0) {
          return paths;
        } else {
          return null;
        }
      }
      module.exports = indexOf;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/copy.js
  var require_copy = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/copy.js"(exports, module) {
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function copy(x) {
        function helper(x2) {
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
        return helper(decycle(x));
      }
      function decycle(x) {
        function helper(x2, checked, currentPath) {
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
            if (x2 === null)
              return null;
            checked.push(x2);
            if (isArray(x2)) {
              if (typeof x2.constructor !== "undefined" && x2.constructor.name !== "Array") {
                return x2.slice();
              }
              return x2.map((v, i) => helper(v, checked, currentPath + "/" + i));
            } else {
              Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).forEach((key) => {
                x2[key] = helper(x2[key], checked, currentPath + "/" + key.toString());
              });
              return x2;
            }
          } else {
            return x2;
          }
        }
        const orig = x;
        let out = helper(orig);
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
      module.exports = { copy, decycle };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-nested.js
  var require_is_nested = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-nested.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
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
      module.exports = isNested;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ndarray.js
  var require_ndarray = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ndarray.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNested = require_is_nested();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var error = "You must pass a natural number or a one-dimensional array of natural numbers into the `ndarray` function!";
      function ndarray(shape) {
        assert(!isUndefined(shape), error);
        if (!isArray(shape))
          shape = [shape];
        assert(!isNested(shape), error);
        assert(shape.length > 0, error);
        let s = shape[0];
        if (typeof s === "bigint")
          s = Number(s);
        assert(isNumber(s), error);
        assert(s >= 0, error);
        assert(Math.floor(s) === s, error);
        assert(
          s !== Infinity,
          "We can't create an array containing an infinite number of values!"
        );
        if (shape.length === 1) {
          const out = [];
          for (let i = 0; i < s; i++)
            out.push(void 0);
          return out;
        } else {
          const out = [];
          for (let i = 0; i < s; i++) {
            out.push(ndarray(shape.slice(1)));
          }
          return out;
        }
      }
      module.exports = ndarray;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/flatten.js
  var require_flatten = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/flatten.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function flatten(arr) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return flatten(arr.values);
        }
        assert(
          isArray(arr),
          "The `flatten` function only works on arrays, Series, and DataFrames!"
        );
        function helper(arr2) {
          let out = [];
          arr2.forEach((child) => {
            if (isArray(child)) {
              out = out.concat(helper(child));
            } else {
              out.push(child);
            }
          });
          return out;
        }
        return helper(arr);
      }
      module.exports = flatten;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/product.js
  var require_product = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/product.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      function product(arr, shouldDropNaNs) {
        if (isDataFrame(arr) || isSeries(arr)) {
          return product(arr.values, shouldDropNaNs);
        }
        assert(
          isArray(arr),
          "The `product` function only works on arrays, Series, and DataFrames!"
        );
        try {
          if (arr.length === 0)
            return NaN;
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
      module.exports = product;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-integer.js
  var require_is_integer = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-integer.js"(exports, module) {
      var isNumber = require_is_number();
      function isInteger(x) {
        return isNumber(x) && (x >= 0 ? Math.floor(x) === x : Math.ceil(x) === x);
      }
      module.exports = isInteger;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-natural-number.js
  var require_is_natural_number = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-natural-number.js"(exports, module) {
      var isInteger = require_is_integer();
      function isNaturalNumber(x) {
        return isInteger(x) && x > 0;
      }
      module.exports = isNaturalNumber;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/shape.js
  var require_shape = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/shape.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      function helper(x) {
        if (isArray(x)) {
          const childShapes = helper(x[0]);
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
        return helper(x);
      }
      module.exports = shape;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/reshape.js
  var require_reshape = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/reshape.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNaturalNumber = require_is_natural_number();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var product = require_product();
      var shape = require_shape();
      function reshape(x, newShape) {
        if (isDataFrame(x) || isSeries(x)) {
          return reshape(x.values, newShape);
        }
        assert(
          isArray(x),
          "The first argument passed into the `reshape` function must be an array!"
        );
        if (isNumber(newShape))
          newShape = [newShape];
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
      module.exports = reshape;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/random.js
  var require_random = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/random.js"(exports, module) {
      var { copy } = require_copy();
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var ndarray = require_ndarray();
      var product = require_product();
      var reshape = require_reshape();
      var MAX = Math.pow(2, 64);
      var s = [];
      seed(Math.floor(Math.random() * MAX));
      function splitmix64(state, n) {
        state = uint(state);
        function helper() {
          state += uint("0x9e3779b97f4a7c15");
          let z = copy(state);
          z = (z ^ z >> BigInt(30)) * uint("0xbf58476d1ce4e5b9");
          z = (z ^ z >> BigInt(27)) * uint("0x94d049bb133111eb");
          return z ^ z >> BigInt(31);
        }
        const out = [];
        for (let i = 0; i < n; i++)
          out.push(helper());
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
      function random(shape) {
        if (isUndefined(shape))
          return next();
        if (!isArray(shape))
          shape = [shape];
        return reshape(ndarray(product(shape)).map(next), shape);
      }
      module.exports = { random, seed };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-date.js
  var require_is_date = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-date.js"(exports, module) {
      function isDate(x) {
        return x instanceof Date && x.toString() !== "Invalid Date";
      }
      module.exports = isDate;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-equal.js
  var require_is_equal = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-equal.js"(exports, module) {
      var { decycle } = require_copy();
      var isArray = require_is_array();
      var isDate = require_is_date();
      var numberTypes = ["number", "int", "float", "bigint"];
      function isEqual(a, b) {
        function helper(a2, b2) {
          const aType = typeof a2;
          const bType = typeof b2;
          if (aType !== bType && !numberTypes.includes(aType) && !numberTypes.includes(bType))
            return false;
          if (aType === "undefined" && bType === "undefined")
            return true;
          if (aType === "boolean")
            return a2 === b2;
          if (aType === "symbol")
            return a2 === b2;
          if (aType === "number" || aType === "bigint") {
            try {
              const aString = a2.toString();
              const bString = b2.toString();
              return aString === bString;
            } catch (e) {
              return false;
            }
          }
          if (aType === "string")
            return a2 === b2;
          if (aType === "function")
            return a2 === b2;
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
              if (aKeys.length !== bKeys.length)
                return false;
              for (let i = 0; i < aKeys.length; i++) {
                const key = aKeys[i];
                if (!helper(a2[key], b2[key]))
                  return false;
              }
              return true;
            }
          }
        }
        try {
          return helper(a, b);
        } catch (e) {
          return helper(decycle(a), decycle(b));
        }
      }
      module.exports = isEqual;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/counter.js
  var require_counter = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/counter.js"(exports, module) {
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function makeKey(n) {
        const alpha = "abcdefg1234567890";
        let out = "";
        while (out.length < n)
          out += alpha[Math.floor(Math.random() * alpha.length)];
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
        set(value, count) {
          const key = this.getStandardizedKey(value);
          this.countsDict[key] = count;
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
      module.exports = Counter;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/stats.js
  var require_stats = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/stats.js"(exports, module) {
      var Counter = require_counter();
      var flatten = require_flatten();
      var isNumber = require_is_number();
      function stats(x, options) {
        options = options || {};
        const counts = new Counter();
        const out = {};
        const xflat = flatten(x);
        const xnums = [];
        let max = -Infinity;
        let min = Infinity;
        let resultsShouldIncludeBigInts = false;
        let sum = 0;
        for (const v of xflat) {
          if (typeof v === "bigint") {
            resultsShouldIncludeBigInts = true;
          }
          if (!options.shouldDropNaNs || isNumber(v)) {
            try {
              if (v > max) {
                max = v;
              }
              if (v < min) {
                min = v;
              }
              sum += Number(v);
              xnums.push(v);
            } catch (e) {
              max = NaN;
              min = NaN;
              sum = NaN;
            }
          }
          counts.increment(v);
        }
        const mean = sum / xnums.length;
        out.counts = counts;
        out.max = max;
        out.mean = mean;
        out.min = min;
        out.n = xflat.length;
        out.sum = sum;
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
          const mode = [];
          for (const pair of sortedCountPairs) {
            if (pair[1] == highestCount) {
              mode.push(pair[0]);
            } else {
              break;
            }
          }
          out.mode = mode.toSorted();
        }
        if (options.median) {
          if (isNaN(mean)) {
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
          let variance = 0;
          for (const v of xnums) {
            variance += Math.pow(Number(v) - mean, 2);
          }
          variance /= xnums.length;
          const stdev = Math.sqrt(variance);
          out.stdev = stdev;
          out.variance = variance;
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
      module.exports = stats;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/count.js
  var require_count = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/count.js"(exports, module) {
      var isEqual = require_is_equal();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      var stats = require_stats();
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
      module.exports = count;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-jagged.js
  var require_is_jagged = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-jagged.js"(exports, module) {
      var { decycle } = require_copy();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
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
      module.exports = isJagged;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/reverse.js
  var require_reverse = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/reverse.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
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
        for (let i = arr.length - 1; i >= 0; i--)
          out.push(arr[i]);
        return out;
      }
      module.exports = reverse;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/range.js
  var require_range = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/range.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var reverse = require_reverse();
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
        if (shouldReverse)
          out = reverse(out);
        return out;
      }
      module.exports = range;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/set.js
  var require_set = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/set.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function makeKey(n) {
        const alpha = "abcdefg1234567890";
        let out = "";
        while (out.length < n)
          out += alpha[Math.floor(Math.random() * alpha.length)];
        return out;
      }
      var NULL_KEY = makeKey(256);
      var UNDEFINED_KEY = makeKey(256);
      var INFINITY_KEY = makeKey(256);
      var MINUS_INFINITY_KEY = makeKey(256);
      var SYMBOL_KEY = makeKey(256);
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
          const key = typeof item === "object" && item === null ? NULL_KEY : isUndefined(item) ? UNDEFINED_KEY : isFunction(item) ? item.toString() : typeof item === "symbol" ? item.toString() + " - " + SYMBOL_KEY : item === Infinity ? INFINITY_KEY : item === -Infinity ? MINUS_INFINITY_KEY : typeof item === "bigint" ? item.toString() : isDataFrame(item) ? item.toJSONString() : isSeries(item) ? JSON.stringify(item.toObject()) : JSON.stringify(item);
          if (!temp[key])
            out.push(item);
          temp[key] = true;
        });
        return out;
      }
      module.exports = set;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.js
  var require_df_append = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-append.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isJagged = require_is_jagged();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var MathError = require_math_error();
      var ndarray = require_ndarray();
      var range = require_range();
      var set = require_set();
      var shape = require_shape();
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
      module.exports = dfAppend;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.js
  var require_df_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-apply.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      function dfApply(DataFrame, Series, df, fn, axis) {
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
            const series = new Series(df.values.map((row) => row[i]));
            series.name = colName;
            series.index = df.index;
            const value = fn(series, i, df);
            if (value instanceof Series) {
              temp[colName] = value.values;
            } else {
              temp[colName] = value;
            }
            if (isUndefined(shouldReturnADataFrame)) {
              shouldReturnADataFrame = value instanceof Series || isArray(value);
            }
          });
          if (shouldReturnADataFrame) {
            const out = new DataFrame(temp);
            out.index = df.index;
            return out;
          } else {
            const out = new Series(df.columns.map((colName) => temp[colName]));
            out.index = df.columns;
            return out;
          }
        } else if (axis === 1) {
          let shouldReturnADataFrame;
          const temp = df.values.map((row, i) => {
            const series = new Series(row);
            series.name = df.index[i];
            series.index = df.columns;
            const value = fn(series, i, df);
            if (isUndefined(shouldReturnADataFrame)) {
              shouldReturnADataFrame = value instanceof Series || isArray(value);
            }
            if (value instanceof Series) {
              return value.values;
            } else {
              return value;
            }
          });
          if (shouldReturnADataFrame) {
            const out = new DataFrame(temp);
            out.index = df.index;
            out.columns = df.columns;
            return out;
          } else {
            const out = new Series(temp);
            out.index = df.index;
            return out;
          }
        }
      }
      module.exports = dfApply;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-string.js
  var require_is_string = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-string.js"(exports, module) {
      function isString(s) {
        return typeof s === "string";
      }
      module.exports = isString;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.js
  var require_df_assign = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-assign.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isJagged = require_is_jagged();
      var isObject = require_is_object();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var MathError = require_math_error();
      var shape = require_shape();
      function dfAssign(DataFrame, Series, df, p1, p2) {
        const isDataFrame = (x) => x instanceof DataFrame;
        const isSeries = (x) => x instanceof Series;
        if (!isUndefined(p2)) {
          assert(
            isString(p1),
            "If passing two arguments into the `assign` method, then the first argument must be a string name!"
          );
          assert(
            isArray(p2) && !isJagged(p2) && shape(p2).length === 1,
            "If passing two arguments into the `assign` method, then the second argument must be a 1-dimensional array!"
          );
          const out = df.append(p2, 1);
          out.columns[out.columns.length - 1] = p1;
          return out;
        } else {
          if (isDataFrame(p1)) {
            return df.append(p1, 1);
          } else if (isSeries(p1)) {
            return df.append(p1, 1);
          } else if (isObject(p1)) {
            const maxColumnLength = Math.max(
              ...Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).map((key) => p1[key].length)
            );
            Object.keys(p1).concat(Object.getOwnPropertySymbols(p1)).forEach((key) => {
              while (p1[key].length < maxColumnLength) {
                p1[key].push(void 0);
              }
            });
            return df.append(new DataFrame(p1), 1);
          } else {
            throw new MathError(
              "You must pass a DataFrame, Series, or object into the `assign` method!"
            );
          }
        }
      }
      module.exports = dfAssign;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.js
  var require_df_copy = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-copy.js"(exports, module) {
      var { copy } = require_copy();
      function dfCopy(DataFrame, df) {
        if (df.isEmpty)
          return new DataFrame();
        const out = new DataFrame(copy(df.values));
        out.columns = df.columns.slice();
        out.index = df.index.slice();
        return out;
      }
      module.exports = dfCopy;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.js
  var require_df_drop = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dfDrop(DataFrame, Series, df, rows, cols) {
        if (isUndefined(rows))
          rows = [];
        if (isUndefined(cols))
          cols = [];
        if (isString(rows) || isNumber(rows))
          rows = [rows];
        if (isString(cols) || isNumber(cols))
          cols = [cols];
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
            if (!outIndex)
              outIndex = [];
            outIndex.push(row);
          }
        });
        df.columns.forEach((col, i) => {
          if (cols.indexOf(col) < 0 && cols.indexOf(i) < 0) {
            if (!outColumns)
              outColumns = [];
            outColumns.push(col);
          }
        });
        let out = df.get(outIndex, outColumns);
        if (out instanceof Series) {
          let temp = new DataFrame();
          temp = temp.assign(out);
          if (df.index.indexOf(out.name) > -1)
            temp = temp.transpose();
          out = temp;
        }
        return out;
      }
      module.exports = dfDrop;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.js
  var require_is_whole_number = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-whole-number.js"(exports, module) {
      var isInteger = require_is_integer();
      function isWholeNumber(x) {
        return isInteger(x) && x >= 0;
      }
      module.exports = isWholeNumber;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.js
  var require_df_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-missing.js"(exports, module) {
      var assert = require_assert();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var shape = require_shape();
      function dfDropMissing(DataFrame, Series, df, axis, condition, threshold) {
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
        function helper(values) {
          if (threshold > 0) {
            let count = 0;
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (isUndefined(value))
                count++;
              if (count >= threshold)
                return [];
            }
          } else if (condition === "any") {
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (isUndefined(value))
                return [];
            }
          } else if (condition === "all") {
            for (let i = 0; i < values.length; i++) {
              const value = values[i];
              if (!isUndefined(value))
                return values;
            }
            return [];
          }
          return values;
        }
        let out = df.copy();
        const tempID = Math.random().toString();
        if (axis === 0) {
          out = out.assign(tempID, out.index);
          const newValues = out.values.map(helper).filter((row) => row.length > 0);
          if (shape(newValues).length < 2)
            return new DataFrame();
          out.values = newValues;
          let newIndex = out.get(null, tempID);
          if (isUndefined(newIndex))
            return new DataFrame();
          if (isString(newIndex))
            newIndex = [newIndex];
          if (newIndex instanceof Series)
            newIndex = newIndex.values;
          out.index = newIndex;
          out = out.drop(null, tempID);
        } else if (axis === 1) {
          const temp = {};
          out.columns.forEach((colName, i) => {
            const values = out.values.map((row) => row[i]);
            const newValues = helper(values);
            if (newValues.length > 0) {
              temp[colName] = newValues;
            }
          });
          if (Object.keys(temp).length + Object.getOwnPropertySymbols(temp).length === 0) {
            return new DataFrame();
          }
          const newOut = new DataFrame(temp);
          newOut.index = out.index;
          return newOut;
        }
        return out;
      }
      module.exports = dfDropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-nan.js
  var require_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-nan.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
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
      module.exports = dropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.js
  var require_df_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-drop-nan.js"(exports, module) {
      var assert = require_assert();
      var dropNaN = require_drop_nan();
      var isWholeNumber = require_is_whole_number();
      function dfDropNaN(DataFrame, df, axis, condition, threshold) {
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
        function helper(values) {
          const numericalValues = dropNaN(values);
          if (threshold > 0)
            return values.length - numericalValues.length < threshold;
          if (condition === "any")
            return numericalValues.length === values.length;
          if (condition === "all")
            return numericalValues.length > 0;
          return true;
        }
        const out = df.copy();
        if (axis === 0) {
          const rowsToKeep = out.index.filter((row) => {
            const values = out.get(row, null).values;
            return helper(values);
          });
          if (rowsToKeep.length > 0)
            return out.get(rowsToKeep, null);
          else
            return new DataFrame();
        } else if (axis === 1) {
          const colsToKeep = out.columns.filter((col) => {
            const values = out.get(null, col).values;
            return helper(values);
          });
          if (colsToKeep.length > 0)
            return out.get(null, colsToKeep);
          else
            return new DataFrame();
        }
        return out;
      }
      module.exports = dfDropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.js
  var require_df_filter = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-filter.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
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
      function dfFilter(DataFrame, Series, df, fn, axis) {
        assert(
          isFunction(fn),
          "The `filter` method takes a single parameter: a function that is used to filter the values."
        );
        if (isUndefined(axis))
          axis = 0;
        assert(
          axis === 0 || axis === 1,
          "The `axis` parameter to the `filter` method must be 0 or 1."
        );
        let out = df.copy();
        if (out.isEmpty)
          return out;
        const index = arrayToObject(out.index);
        const columns = arrayToObject(out.columns);
        if (axis === 0) {
          let count = 0;
          const newValues = out.values.filter((row, i) => {
            const series = new Series(row);
            series.name = df.index[i];
            series.index = df.columns;
            const shouldKeep = fn(series, i, df);
            if (shouldKeep) {
              count++;
            } else {
              delete index[out.index[i]];
            }
            return shouldKeep;
          });
          if (count === 0) {
            return new DataFrame();
          }
          if (count === 1) {
            const temp = new Series(newValues[0]);
            temp.name = undoArrayToObject(index)[0];
            temp.index = undoArrayToObject(columns);
            return temp;
          }
          out.values = newValues;
          out.index = undoArrayToObject(index);
        } else if (axis === 1) {
          out = out.transpose();
          let count = 0;
          const newValues = out.values.filter((row, i) => {
            const series = new Series(row);
            series.name = df.columns[i];
            series.index = df.index;
            const shouldKeep = fn(series, i, df);
            if (shouldKeep) {
              count++;
            } else {
              delete columns[out.index[i]];
            }
            return shouldKeep;
          });
          if (count === 0) {
            return new DataFrame();
          }
          if (count === 1) {
            const temp = new Series(newValues[0]);
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
      module.exports = dfFilter;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.js
  var require_df_get = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      function dfGet(df, rows, cols) {
        if (isString(rows) || isNumber(rows))
          rows = [rows];
        if (isString(cols) || isNumber(cols))
          cols = [cols];
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
      module.exports = dfGet;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sort.js
  var require_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sort.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function alphaSort(a, b) {
        try {
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        } catch (e) {
          a = typeof a === "object" && a !== null ? JSON.stringify(a) : a.toString();
          b = typeof b === "object" && b !== null ? JSON.stringify(b) : b.toString();
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        }
      }
      function sort(arr, fn) {
        if (isUndefined(fn))
          fn = alphaSort;
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
      module.exports = sort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.js
  var require_df_get_dummies = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-dummies.js"(exports, module) {
      var assert = require_assert();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      var sort = require_sort();
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
      function dfGetDummies(DataFrame, df, columns) {
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
        const out = new DataFrame(temp);
        out.index = df.index;
        return out;
      }
      module.exports = dfGetDummies;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.js
  var require_df_get_subset_by_indices = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-indices.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var range = require_range();
      var shape = require_shape();
      function dfGetSubsetByIndices(df, rowIndices, colIndices) {
        const dataShape = df.shape;
        if (isUndefined(rowIndices))
          rowIndices = range(0, dataShape[0]);
        if (isUndefined(colIndices))
          colIndices = range(0, dataShape[1]);
        if (isNumber(rowIndices))
          rowIndices = [rowIndices];
        if (isNumber(colIndices))
          colIndices = [colIndices];
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
      module.exports = dfGetSubsetByIndices;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.js
  var require_df_get_subset_by_names = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-get-subset-by-names.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dfGetSubsetByNames(DataFrame, Series, df, rows, cols) {
        if (isUndefined(rows))
          rows = df.index;
        if (isUndefined(cols))
          cols = df.columns;
        if (isString(rows))
          rows = [rows];
        if (isString(cols))
          cols = [cols];
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
          const out2 = new Series(values[0]);
          out2.name = rows[0];
          out2.index = cols;
          return out2;
        }
        if (cols.length === 1) {
          const out2 = new Series(values.map((v) => v[0]));
          out2.name = cols[0];
          out2.index = rows;
          return out2;
        }
        const out = new DataFrame(values);
        out.columns = cols;
        out.index = rows;
        return out;
      }
      module.exports = dfGetSubsetByNames;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.js
  var require_df_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-print.js"(exports, module) {
      var isString = require_is_string();
      var range = require_range();
      function dfPrint(DataFrame, Series, df) {
        function truncate(s, maxLength2) {
          if (isString(s)) {
            if (s.length > maxLength2) {
              return s.substring(0, maxLength2 - 3) + "...";
            } else {
              return s;
            }
          } else {
            return s;
          }
        }
        if (df.isEmpty) {
          console.table({});
          console.log("Shape:", [0, 0], "\n");
          return df;
        }
        const maxRows = typeof window === "undefined" ? 20 : 10;
        const halfMaxRows = Math.floor(maxRows / 2);
        const maxColumns = typeof process === "undefined" ? 10 : Math.floor(process.stdout.columns / 24) - 1;
        const halfMaxColumns = Math.floor(maxColumns / 2);
        const tempRows = maxRows > df.index.length ? null : range(0, halfMaxRows).concat(
          range(df.index.length - halfMaxRows, df.index.length)
        );
        const tempColumns = maxColumns > df.columns.length ? null : range(0, halfMaxColumns).concat(
          range(df.columns.length - halfMaxColumns, df.columns.length)
        );
        let temp = df.get(tempRows, tempColumns);
        if (temp instanceof Series) {
          if (df.shape[0] === 1) {
            temp = new DataFrame([temp.values]);
            temp.index = df.index;
            temp.columns = new Series(df.columns).get(tempColumns).values;
          } else if (df.shape[1] === 1) {
            temp = new DataFrame([temp.values]).transpose();
            temp.index = new Series(df.index).get(tempRows).values;
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
        if (temp instanceof Series) {
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
      module.exports = dfPrint;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.js
  var require_left_pad = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/left-pad.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      function leftPad(x, maxLength) {
        assert(isNumber(x), "The `leftPad` function only works on numbers!");
        let out = x.toString();
        while (out.length < maxLength)
          out = "0" + out;
        return out;
      }
      module.exports = leftPad;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.js
  var require_df_reset_index = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-reset-index.js"(exports, module) {
      var leftPad = require_left_pad();
      var range = require_range();
      function dfResetIndex(df, shouldSkipCopying) {
        const out = shouldSkipCopying ? df : df.copy();
        out.index = range(0, df.shape[0]).map((i) => {
          return "row" + leftPad(i, (out.index.length - 1).toString().length);
        });
        return out;
      }
      module.exports = dfResetIndex;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/shuffle.js
  var require_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/shuffle.js"(exports, module) {
      var { random } = require_random();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
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
      module.exports = shuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.js
  var require_df_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-shuffle.js"(exports, module) {
      var assert = require_assert();
      var isUndefined = require_is_undefined();
      var shuffle = require_shuffle();
      function dfShuffle(df, axis) {
        if (isUndefined(axis))
          axis = 0;
        assert(
          axis === 0 || axis === 1,
          "The `axis` parameter to the `shuffle` must be 0, 1, or undefined."
        );
        return df.get(
          axis === 0 ? shuffle(df.index) : null,
          axis === 1 ? shuffle(df.columns) : null
        );
      }
      module.exports = dfShuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/is-boolean.js
  var require_is_boolean = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/is-boolean.js"(exports, module) {
      function isBoolean(x) {
        return typeof x === "boolean";
      }
      module.exports = isBoolean;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.js
  var require_df_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-sort.js"(exports, module) {
      var { random } = require_random();
      var assert = require_assert();
      var isArray = require_is_array();
      var isBoolean = require_is_boolean();
      var isFunction = require_is_function();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var range = require_range();
      var shape = require_shape();
      var sort = require_sort();
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
          if (isBoolean(directions) || isString(directions))
            directions = [directions];
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
          if (a[cols[counter]] === b[cols[counter]])
            return 0;
          if (a[cols[counter]] < b[cols[counter]])
            return isAscending ? -1 : 1;
          if (a[cols[counter]] > b[cols[counter]])
            return isAscending ? 1 : -1;
        });
        const indexNumber = out.columns.indexOf(indexID);
        out.index = out.values.map((row) => row[indexNumber]);
        out = out.dropColumns(indexID);
        return out;
      }
      module.exports = dfSort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-detailed-object.js
  var require_df_to_detailed_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-detailed-object.js"(exports, module) {
      var assert = require_assert();
      var isUndefined = require_is_undefined();
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
      module.exports = dfToDetailedObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.js
  var require_df_to_json_string = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json-string.js"(exports, module) {
      function dfToJSONString(df, axis) {
        return JSON.stringify(df.toObject(axis));
      }
      module.exports = dfToJSONString;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.js
  var require_df_to_json = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-json.js"(exports, module) {
      var MathError = require_math_error();
      var dfToJSONString = require_df_to_json_string();
      function toJSON(df, filename, axis) {
        const out = dfToJSONString(df, axis);
        let downloadedInBrowser = false;
        let wroteToDiskInNode = false;
        let browserError, nodeError;
        try {
          let newFilename = filename;
          if (filename.includes("/")) {
            const parts = filename.split("/");
            newFilename = parts[parts.length - 1];
          }
          const a = document.createElement("a");
          a.href = `data:application/json;charset=utf-8,${encodeURIComponent(out)}`;
          a.download = newFilename;
          a.dispatchEvent(new MouseEvent("click"));
          downloadedInBrowser = true;
        } catch (e) {
          browserError = e;
        }
        try {
          const fs = __require("fs");
          const path = __require("path");
          fs.writeFileSync(path.resolve(filename), out, "utf8");
          wroteToDiskInNode = true;
        } catch (e) {
          nodeError = e;
        }
        if (!downloadedInBrowser && !wroteToDiskInNode) {
          if (typeof window !== "undefined") {
            throw new MathError(browserError);
          } else if (typeof module !== "undefined") {
            throw new MathError(nodeError);
          } else {
            throw new MathError(
              "I don't know what's going wrong, but it doesn't seem like you're in Node or the browser, and we couldn't download and/or write the file to disk!"
            );
          }
        }
        return df;
      }
      module.exports = toJSON;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.js
  var require_df_to_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/df-to-object.js"(exports, module) {
      function dfToObject(df) {
        const out = {};
        df.columns.forEach((col) => {
          out[col] = df.get(col).values;
        });
        return out;
      }
      module.exports = dfToObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/transpose.js
  var require_transpose = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/transpose.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var ndarray = require_ndarray();
      var reverse = require_reverse();
      var shape = require_shape();
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
      module.exports = transpose;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-append.js
  var require_series_append = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-append.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isNested = require_is_nested();
      var isSeries = require_is_series();
      var shape = require_shape();
      function seriesAppend(Series, series, x) {
        if (isSeries(x)) {
          return new Series(series.values.concat(x.values));
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
      module.exports = seriesAppend;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-apply.js
  var require_series_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-apply.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      function seriesApply(series, fn) {
        assert(
          isFunction(fn),
          "The parameter to the `apply` method must be a function."
        );
        const out = series.copy();
        out._values = out._values.map((v, i) => fn(v, i));
        return out;
      }
      module.exports = seriesApply;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.js
  var require_series_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-drop-missing.js"(exports, module) {
      var isUndefined = require_is_undefined();
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
      module.exports = seriesDropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.js
  var require_series_drop_nan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-drop-nan.js"(exports, module) {
      var isNumber = require_is_number();
      function seriesDropNaN(Series, series) {
        const index = [];
        const values = [];
        series.values.forEach((value, i) => {
          if (isNumber(value)) {
            values.push(value);
            index.push(series.index[i]);
          }
        });
        const out = new Series(values);
        out.name = series.name;
        out.index = index;
        return out;
      }
      module.exports = seriesDropNaN;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-filter.js
  var require_series_filter = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-filter.js"(exports, module) {
      var { copy } = require_copy();
      function seriesFilter(Series, series, fn) {
        let out = series.copy();
        const index = copy(out.index);
        const indicesToRemove = [];
        const newValues = out.values.filter((value, i) => {
          const shouldKeep = fn(value, i, out.values);
          if (!shouldKeep)
            indicesToRemove.push(out.index[i]);
          return shouldKeep;
        });
        indicesToRemove.forEach((i) => {
          index.splice(index.indexOf(i), 1);
        });
        if (newValues.length === 0) {
          out = new Series();
          out.name = series.name;
          return out;
        }
        out.values = newValues;
        out.index = index;
        return out;
      }
      module.exports = seriesFilter;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get.js
  var require_series_get = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get.js"(exports, module) {
      var assert = require_assert();
      var isNumber = require_is_number();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var set = require_set();
      function seriesGet(series, indices) {
        if (isString(indices) || isNumber(indices))
          indices = [indices];
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
      module.exports = seriesGet;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.js
  var require_series_get_subset_by_indices = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-indices.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isUndefined = require_is_undefined();
      var isWholeNumber = require_is_whole_number();
      var range = require_range();
      var shape = require_shape();
      function seriesGetSubsetByIndices(series, indices) {
        const dataShape = series.shape;
        if (isUndefined(indices))
          indices = range(0, dataShape[0]);
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
      module.exports = seriesGetSubsetByIndices;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.js
  var require_series_get_subset_by_names = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-get-subset-by-names.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function seriesGetSubsetByNames(Series, series, indices) {
        if (isUndefined(indices))
          indices = series.index;
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
        if (values.length === 1)
          return values[0];
        const out = new Series(values);
        out.index = indices;
        out.name = series.name;
        return out;
      }
      module.exports = seriesGetSubsetByNames;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-print.js
  var require_series_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-print.js"(exports, module) {
      var { copy } = require_copy();
      var range = require_range();
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
      module.exports = seriesPrint;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.js
  var require_series_shuffle = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-shuffle.js"(exports, module) {
      var shuffle = require_shuffle();
      function seriesShuffle(series) {
        const out = series.copy();
        return out.get(shuffle(out.index));
      }
      module.exports = seriesShuffle;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort.js
  var require_series_sort = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-sort.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      var isUndefined = require_is_undefined();
      var sort = require_sort();
      var transpose = require_transpose();
      function seriesSort(Series, series, fn) {
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
        const out = new Series();
        out._values = newValues;
        out._index = newIndex;
        out.name = series.name;
        return out;
      }
      module.exports = seriesSort;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.js
  var require_series_sort_by_index = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-sort-by-index.js"(exports, module) {
      var sort = require_sort();
      var transpose = require_transpose();
      function seriesSortByIndex(Series, series) {
        let temp = transpose([series.values, series.index]);
        temp = transpose(
          sort(temp, (a, b) => {
            if (a[1] === b[1])
              return 0;
            if (a[1] < b[1])
              return -1;
            if (a[1] > b[1])
              return 1;
          })
        );
        const out = new Series(temp[0]);
        out.index = temp[1];
        out.name = series.name;
        return out;
      }
      module.exports = seriesSortByIndex;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/series-to-object.js
  var require_series_to_object = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/series-to-object.js"(exports, module) {
      function seriesToObject(series) {
        const out = {};
        out[series.name] = {};
        series.index.forEach((index, i) => {
          out[series.name][index] = series.values[i];
        });
        return out;
      }
      module.exports = seriesToObject;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/series/index.js
  var require_series = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/series/index.js"(exports, module) {
      var { copy } = require_copy();
      var assert = require_assert();
      var isArray = require_is_array();
      var isString = require_is_string();
      var isUndefined = require_is_undefined();
      var leftPad = require_left_pad();
      var range = require_range();
      var reverse = require_reverse();
      var seriesAppend = require_series_append();
      var seriesApply = require_series_apply();
      var seriesDropMissing = require_series_drop_missing();
      var seriesDropNaN = require_series_drop_nan();
      var seriesFilter = require_series_filter();
      var seriesGet = require_series_get();
      var seriesGetSubsetByIndices = require_series_get_subset_by_indices();
      var seriesGetSubsetByNames = require_series_get_subset_by_names();
      var seriesPrint = require_series_print();
      var seriesShuffle = require_series_shuffle();
      var seriesSort = require_series_sort();
      var seriesSortByIndex = require_series_sort_by_index();
      var seriesToObject = require_series_to_object();
      var shape = require_shape();
      var transpose = require_transpose();
      var SERIES_SYMBOL = Symbol.for("@jrc03c/js-math-tools/series");
      module.exports = function(DataFrame) {
        class Series {
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
              if (data instanceof Series) {
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
            return seriesGetSubsetByNames(Series, this, indices);
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
            const out = new Series(reverse(this.values));
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
            const out = new Series();
            out._values = copy(this.values);
            out._index = copy(this.index);
            out.name = this.name;
            return out;
          }
          append(x) {
            return seriesAppend(Series, this, x);
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
            return seriesDropNaN(Series, this);
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
            return seriesSort(Series, this, direction);
          }
          sortByIndex() {
            return seriesSortByIndex(Series, this);
          }
          filter(fn) {
            return seriesFilter(Series, this, fn);
          }
          toDataFrame() {
            const out = new DataFrame(transpose([this.values]));
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
        return Series;
      };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dataframe/index.js
  var require_dataframe = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dataframe/index.js"(exports, module) {
      var { copy } = require_copy();
      var { random } = require_random();
      var assert = require_assert();
      var count = require_count();
      var dfAppend = require_df_append();
      var dfApply = require_df_apply();
      var dfAssign = require_df_assign();
      var dfCopy = require_df_copy();
      var dfDrop = require_df_drop();
      var dfDropMissing = require_df_drop_missing();
      var dfDropNaN = require_df_drop_nan();
      var dfFilter = require_df_filter();
      var dfGet = require_df_get();
      var dfGetDummies = require_df_get_dummies();
      var dfGetSubsetByIndices = require_df_get_subset_by_indices();
      var dfGetSubsetByNames = require_df_get_subset_by_names();
      var dfPrint = require_df_print();
      var dfResetIndex = require_df_reset_index();
      var dfShuffle = require_df_shuffle();
      var dfSort = require_df_sort();
      var dfToDetailedObject = require_df_to_detailed_object();
      var dfToJSON = require_df_to_json();
      var dfToJSONString = require_df_to_json_string();
      var dfToObject = require_df_to_object();
      var isArray = require_is_array();
      var isJagged = require_is_jagged();
      var isObject = require_is_object();
      var isUndefined = require_is_undefined();
      var leftPad = require_left_pad();
      var ndarray = require_ndarray();
      var range = require_range();
      var shape = require_shape();
      var transpose = require_transpose();
      var DATAFRAME_SYMBOL = Symbol.for("@jrc03c/js-math-tools/dataframe");
      function makeKey(n) {
        const alpha = "abcdefghijklmnopqrstuvwxyz1234567890";
        let out = "";
        for (let i = 0; i < n; i++)
          out += alpha[Math.floor(random() * alpha.length)];
        return out;
      }
      var DataFrame = class {
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
                  return "untitled_" + makeKey(8);
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
                  return v + "_" + makeKey(8);
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
                  return "untitled_" + makeKey(8);
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
                  return v + "_" + makeKey(8);
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
            if (data instanceof DataFrame) {
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
          const out = new DataFrame(ndarray(this.shape));
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
          return dfGetSubsetByNames(DataFrame, Series, this, rows, cols);
        }
        getSubsetByIndices(rowIndices, colIndices) {
          return dfGetSubsetByIndices(this, rowIndices, colIndices);
        }
        getDummies(columns) {
          return dfGetDummies(DataFrame, this, columns);
        }
        oneHotEncode(columns) {
          return dfGetDummies(DataFrame, this, columns);
        }
        transpose() {
          const out = new DataFrame(transpose(this.values));
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
          return dfCopy(DataFrame, this);
        }
        assign(p1, p2) {
          return dfAssign(DataFrame, Series, this, p1, p2);
        }
        apply(fn, axis) {
          return dfApply(DataFrame, Series, this, fn, axis);
        }
        dropMissing(axis, condition, threshold) {
          return dfDropMissing(DataFrame, Series, this, axis, condition, threshold);
        }
        dropNaN(axis, condition, threshold) {
          return dfDropNaN(DataFrame, this, axis, condition, threshold);
        }
        drop(rows, cols) {
          return dfDrop(DataFrame, Series, this, rows, cols);
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
          return dfPrint(DataFrame, Series, this);
        }
        sort(cols, directions) {
          return dfSort(this, cols, directions);
        }
        sortByIndex() {
          return this.sort();
        }
        filter(fn, axis) {
          return dfFilter(DataFrame, Series, this, fn, axis);
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
      var Series = require_series()(DataFrame);
      module.exports = { DataFrame, Series };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/max.js
  var require_max = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/max.js"(exports, module) {
      var stats = require_stats();
      function max(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs }).max;
      }
      module.exports = max;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/vectorize.js
  var require_vectorize = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/vectorize.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      var max = require_max();
      var range = require_range();
      var shape = require_shape();
      function vectorize(fn) {
        assert(
          isFunction(fn),
          "You must pass a function into the `vectorize` function!"
        );
        return function helper() {
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
          childArrays.slice(0, -1).forEach((s, i) => {
            assert(
              isEqual(
                isArray(s) ? shape(s) : s.shape,
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
              return helper(...args);
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
      module.exports = vectorize;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/abs.js
  var require_abs = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/abs.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function abs(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            return x < 0 ? -x : x;
          } else {
            return Math.abs(x);
          }
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(abs);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/add.js
  var require_add = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/add.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function add() {
        try {
          let out = 0;
          let resultShouldBeABigInt = false;
          const x = Object.values(arguments);
          for (let v of x) {
            if (!isNumber(v))
              return NaN;
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
      module.exports = vectorize(add);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/apply.js
  var require_apply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/apply.js"(exports, module) {
      var vectorize = require_vectorize();
      function apply(x, fn) {
        try {
          return fn(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(apply);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arccos.js
  var require_arccos = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arccos.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arccos(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.acos(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arccos);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arcsin.js
  var require_arcsin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arcsin.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arcsin(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.asin(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arcsin);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/arctan.js
  var require_arctan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/arctan.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function arctan(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.atan(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(arctan);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/argmax.js
  var require_argmax = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/argmax.js"(exports, module) {
      var assert = require_assert();
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var max = require_max();
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
          console.log(e);
          return void 0;
        }
      }
      module.exports = argmax;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/min.js
  var require_min = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/min.js"(exports, module) {
      var stats = require_stats();
      function min(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs }).min;
      }
      module.exports = min;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/argmin.js
  var require_argmin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/argmin.js"(exports, module) {
      var assert = require_assert();
      var indexOf = require_index_of();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var min = require_min();
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
      module.exports = argmin;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/cast.js
  var require_cast = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/cast.js"(exports, module) {
      var isArray = require_is_array();
      var isBoolean = require_is_boolean();
      var isDataFrame = require_is_dataframe();
      var isDate = require_is_date();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
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
          if (isNaN(out))
            return NaN;
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
            if (!isDate(out))
              return null;
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
      module.exports = cast;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ceil.js
  var require_ceil = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ceil.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function ceil(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint")
            return x;
          return Math.ceil(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(ceil);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/chop.js
  var require_chop = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/chop.js"(exports, module) {
      var abs = require_abs();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var vectorize = require_vectorize();
      function chop(x, threshold) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint")
            return x;
          if (isUndefined(threshold)) {
            threshold = 1e-10;
          } else if (!isNumber(threshold)) {
            return NaN;
          }
          return abs(x) < threshold ? 0 : x;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(chop);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/int.js
  var require_int = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/int.js"(exports, module) {
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var vectorize = require_vectorize();
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
      module.exports = vectorize(int);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/clamp.js
  var require_clamp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/clamp.js"(exports, module) {
      var int = require_int();
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function clamp(x, a, b) {
        try {
          if (!isNumber(x))
            return NaN;
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
          if (typeof x === "bigint") {
            return BigInt(clamp(int(x), a, b));
          }
          if (x < a)
            return a;
          if (x > b)
            return b;
          return x;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(clamp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/combinations.js
  var require_combinations = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/combinations.js"(exports, module) {
      var assert = require_assert();
      var flatten = require_flatten();
      var int = require_int();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      function combinationsIterator(x, r) {
        function* helper(x2, r2) {
          if (r2 > x2.length) {
            yield x2;
          } else if (r2 <= 0) {
            yield [];
          } else if (x2.length < 2) {
            yield x2;
          } else {
            for (let i = 0; i < x2.length; i++) {
              const item = x2[i];
              const after = x2.slice(i + 1);
              if (after.length < r2 - 1) {
                continue;
              }
              if (r2 - 1 >= 0) {
                for (const child of combinationsIterator(after, r2 - 1)) {
                  yield [item].concat(child);
                }
              }
            }
          }
        }
        if (isDataFrame(x) || isSeries(x)) {
          return combinationsIterator(x.values, r);
        }
        assert(
          isArray(x),
          "The `combinations` function only works on arrays, Series, and DataFrames!"
        );
        assert(
          isNumber(r) && int(r) === r && r >= 0,
          "`r` must be a non-negative integer!"
        );
        return helper(flatten(x), r);
      }
      function combinations(x, r) {
        const out = [];
        for (const combo of combinationsIterator(x, r)) {
          out.push(combo.slice());
        }
        return out;
      }
      module.exports = { combinations, combinationsIterator };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/intersect.js
  var require_intersect = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/intersect.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var set = require_set();
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
      module.exports = intersect;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/index-matcher.js
  var require_index_matcher = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/index-matcher.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var assert = require_assert();
      var intersect = require_intersect();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      var _IndexMatcher = class {
        constructor(mode) {
          assert(
            isUndefined(mode) || mode === _IndexMatcher.DROP_NAN_MODE || mode === _IndexMatcher.DROP_MISSING_MODE,
            "The `mode` value passed into the `IndexMatcher` constructor must be undefined or one of [IndexMatcher.DROP_NAN_MODE, IndexMatcher.DROP_MISSING_MODE]! (By default, the mode is `Indexer.DROP_MISSING_MODE`.)"
          );
          this.mode = !isUndefined(mode) ? mode : _IndexMatcher.DROP_NAN_MODE;
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
      var IndexMatcher = _IndexMatcher;
      __publicField(IndexMatcher, "DROP_NAN_MODE", "DROP_NAN_MODE");
      __publicField(IndexMatcher, "DROP_MISSING_MODE", "DROP_MISSING_MODE");
      module.exports = IndexMatcher;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/covariance.js
  var require_covariance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/covariance.js"(exports, module) {
      var assert = require_assert();
      var IndexMatcher = require_index_matcher();
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var shape = require_shape();
      var stats = require_stats();
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
            if (!isNumber(vx))
              return NaN;
            if (!isNumber(vy))
              return NaN;
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
      module.exports = covariance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/correl.js
  var require_correl = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/correl.js"(exports, module) {
      var assert = require_assert();
      var covariance = require_covariance();
      var isArray = require_is_array();
      var isSeries = require_is_series();
      var shape = require_shape();
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
      module.exports = correl;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/cos.js
  var require_cos = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/cos.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function cos(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.cos(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(cos);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/data-types.js
  var require_data_types = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/data-types.js"(exports, module) {
      module.exports = Object.freeze({
        boolean: "boolean",
        date: "date",
        null: "null",
        number: "number",
        object: "object",
        string: "string"
      });
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/diff.js
  var require_diff = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/diff.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var set = require_set();
      function diff(a, b) {
        if (isDataFrame(a) || isSeries(a)) {
          return diff(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return diff(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `diff` function only works on arrays, Series, and DataFrames!"
        );
        const aTemp = set(a);
        const bTemp = set(b);
        const out = [];
        aTemp.forEach((item) => {
          if (bTemp.findIndex((other) => isEqual(other, item)) < 0) {
            out.push(item);
          }
        });
        return out;
      }
      module.exports = diff;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/pow.js
  var require_pow = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/pow.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function pow(x, p) {
        try {
          if (!isNumber(x))
            return NaN;
          if (!isNumber(p))
            return NaN;
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
      module.exports = vectorize(pow);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sqrt.js
  var require_sqrt = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sqrt.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sqrt(x) {
        try {
          if (!isNumber(x))
            return NaN;
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
      module.exports = vectorize(sqrt);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/multiply.js
  var require_multiply = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/multiply.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function multiply() {
        try {
          const x = Object.values(arguments);
          if (x.length === 0)
            return NaN;
          let resultShouldBeABigInt = false;
          let out = 1;
          for (let v of x) {
            if (!isNumber(v))
              return NaN;
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
      module.exports = vectorize(multiply);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/scale.js
  var require_scale = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/scale.js"(exports, module) {
      var multiply = require_multiply();
      function scale() {
        return multiply(...arguments);
      }
      module.exports = scale;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/subtract.js
  var require_subtract = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/subtract.js"(exports, module) {
      var add = require_add();
      var scale = require_scale();
      function subtract(a, b) {
        return add(a, scale(b, -1));
      }
      module.exports = subtract;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sum.js
  var require_sum = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sum.js"(exports, module) {
      var stats = require_stats();
      function sum(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs }).sum;
      }
      module.exports = sum;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/distance.js
  var require_distance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/distance.js"(exports, module) {
      var abs = require_abs();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var pow = require_pow();
      var shape = require_shape();
      var sqrt = require_sqrt();
      var subtract = require_subtract();
      var sum = require_sum();
      function distance(a, b) {
        if (isNumber(a) && isNumber(b)) {
          return abs(a - b);
        }
        if (isDataFrame(a) || isSeries(a)) {
          return distance(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return distance(a, b.values);
        }
        if (isArray(a) && isArray(b)) {
          assert(
            isEqual(shape(a), shape(b)),
            "If passing two arrays, Series, or DataFrames into the `distance` function, then those objects must have the same shape!"
          );
        }
        try {
          return sqrt(sum(pow(subtract(a, b), 2)));
        } catch (e) {
          return NaN;
        }
      }
      module.exports = distance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/divide.js
  var require_divide = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/divide.js"(exports, module) {
      var pow = require_pow();
      var scale = require_scale();
      function divide(a, b) {
        return scale(a, pow(b, -1));
      }
      module.exports = divide;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/dot.js
  var require_dot = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/dot.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var scale = require_scale();
      var shape = require_shape();
      var sum = require_sum();
      var transpose = require_transpose();
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
      module.exports = dot;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-missing.js
  var require_drop_missing = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-missing.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      function dropMissing(x) {
        if (isDataFrame(x) || isSeries(x)) {
          return x.dropMissing(...Object.values(arguments).slice(1));
        }
        assert(
          isArray(x),
          "The `dropMissing` function only works on arrays, Series, and DataFrames!"
        );
        const out = [];
        x.forEach((v) => {
          try {
            return out.push(dropMissing(v));
          } catch (e) {
            if (!isUndefined(v)) {
              out.push(v);
            }
          }
        });
        return out;
      }
      module.exports = dropMissing;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-missing-pairwise.js
  var require_drop_missing_pairwise = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-missing-pairwise.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var shape = require_shape();
      function dropMissingPairwise(a, b) {
        if (isDataFrame(a) || isSeries(a)) {
          return dropMissingPairwise(a.values, b);
        }
        if (isDataFrame(b) || isSeries(b)) {
          return dropMissingPairwise(a, b.values);
        }
        assert(
          isArray(a) && isArray(b),
          "The `dropMissingPairwise` function only works on arrays, Series, and DataFrames!"
        );
        assert(
          isEqual(shape(a), shape(b)),
          "The two arrays, Series, and/or DataFrames passed into the `dropMissingPairwise` function must have the same shape!"
        );
        const aOut = [];
        const bOut = [];
        for (let i = 0; i < a.length; i++) {
          try {
            const [aChildren, bChildren] = dropMissingPairwise(a[i], b[i]);
            aOut.push(aChildren);
            bOut.push(bChildren);
          } catch (e) {
            if (!isUndefined(a[i]) && !isUndefined(b[i])) {
              aOut.push(a[i]);
              bOut.push(b[i]);
            }
          }
        }
        return [aOut, bOut];
      }
      module.exports = dropMissingPairwise;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-nan-pairwise.js
  var require_drop_nan_pairwise = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-nan-pairwise.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isEqual = require_is_equal();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var shape = require_shape();
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
      module.exports = dropNaNPairwise;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/drop-undefined.js
  var require_drop_undefined = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/drop-undefined.js"(exports, module) {
      var dropMissing = require_drop_missing();
      function dropUndefined(x) {
        return dropMissing(x);
      }
      module.exports = dropUndefined;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/every.js
  var require_every = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/every.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
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
      module.exports = every;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/exp.js
  var require_exp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/exp.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function exp(x) {
        try {
          if (!isNumber(x))
            return NaN;
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
      module.exports = vectorize(exp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/factorial.js
  var require_factorial = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/factorial.js"(exports, module) {
      var int = require_int();
      var vectorize = require_vectorize();
      function factorial(n) {
        try {
          if (typeof n === "bigint") {
            return BigInt(factorial(int(n)));
          }
          if (n !== int(n))
            return NaN;
          if (n <= 1)
            return 1;
          return n * factorial(n - 1);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(factorial);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/find.js
  var require_find = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/find.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      function find(x, fn) {
        if (isDataFrame(x)) {
          return find(x.values, fn);
        }
        if (isSeries(x)) {
          return find(x.values, fn);
        }
        assert(
          isObject(x) || isArray(x),
          "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `find` function!"
        );
        if (!isFunction(fn)) {
          const value = fn;
          fn = (v) => v === value;
        }
        function helper(x2, fn2, checked) {
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
                return value;
              }
              const result = helper(value, fn2, checked);
              if (result) {
                return result;
              }
            }
          } else if (isArray(x2)) {
            checked.push(x2);
            for (let i = 0; i < x2.length; i++) {
              const value = x2[i];
              if (fn2(value)) {
                return value;
              }
              const result = helper(value, fn2, checked);
              if (result) {
                return result;
              }
            }
          } else {
            if (fn2(x2)) {
              return x2;
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
        return helper(x, safeFn);
      }
      module.exports = find;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/find-all.js
  var require_find_all = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/find-all.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isObject = require_is_object();
      var isSeries = require_is_series();
      function findAll(x, fn) {
        if (isDataFrame(x)) {
          return findAll(x.values, fn);
        }
        if (isSeries(x)) {
          return findAll(x.values, fn);
        }
        assert(
          isObject(x) || isArray(x),
          "You must pass (1) an object, array, Series, or DataFrame and (2) a function or value into the `findAll` function!"
        );
        if (!isFunction(fn)) {
          const value = fn;
          fn = (v) => v === value;
        }
        function helper(x2, fn2, checked) {
          checked = checked || [];
          if (checked.indexOf(x2) > -1) {
            return null;
          }
          if (isObject(x2)) {
            checked.push(x2);
            const keys = Object.keys(x2).concat(Object.getOwnPropertySymbols(x2));
            const out = [];
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              const value = x2[key];
              let alreadyStoredThisValue = false;
              if (fn2(value)) {
                out.push(value);
                alreadyStoredThisValue = true;
              }
              const results2 = helper(value, fn2, checked);
              if (results2 && results2.length > 0) {
                results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
              }
            }
            return out;
          } else if (isArray(x2)) {
            checked.push(x2);
            const out = [];
            for (let i = 0; i < x2.length; i++) {
              const value = x2[i];
              let alreadyStoredThisValue = false;
              if (fn2(value)) {
                out.push(value);
                alreadyStoredThisValue = true;
              }
              const results2 = helper(value, fn2, checked);
              if (results2 && results2.length > 0) {
                results2.slice(alreadyStoredThisValue ? 1 : 0).forEach((r) => out.push(r));
              }
            }
            return out;
          } else {
            if (fn2(x2)) {
              return [x2];
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
        const results = helper(x, safeFn);
        if (results && results.length > 0) {
          return results;
        } else {
          return null;
        }
      }
      module.exports = findAll;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/float.js
  var require_float = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/float.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function float(x) {
        try {
          if (x === "Infinity") {
            return Infinity;
          }
          if (x === "-Infinity") {
            return -Infinity;
          }
          const out = JSON.parse(x);
          if (isNumber(out))
            return out;
          return NaN;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(float);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/floor.js
  var require_floor = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/floor.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function floor(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            return x;
          }
          return Math.floor(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(floor);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/zeros.js
  var require_zeros = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/zeros.js"(exports, module) {
      var isNumber = require_is_number();
      var product = require_product();
      var reshape = require_reshape();
      function zeros(shape) {
        if (isNumber(shape))
          shape = [shape];
        const out = [];
        const n = product(shape);
        for (let i = 0; i < n; i++)
          out.push(0);
        return reshape(out, shape);
      }
      module.exports = zeros;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/identity.js
  var require_identity = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/identity.js"(exports, module) {
      var assert = require_assert();
      var int = require_int();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var zeros = require_zeros();
      function identity(size) {
        if (typeof size === "bigint") {
          size = int(size);
        }
        assert(
          !isUndefined(size),
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          isNumber(size),
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          int(size) === size,
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        assert(
          size > 0,
          "You must pass an integer greater than 0 (representing the size) into the `identity` function!"
        );
        const out = zeros([size, size]);
        for (let i = 0; i < size; i++)
          out[i][i] = 1;
        return out;
      }
      module.exports = identity;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.js
  var require_boolean_values = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/boolean-values.js"(exports, module) {
      module.exports = ["true", "false", "yes", "no"];
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/null-values.js
  var require_null_values = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/null-values.js"(exports, module) {
      module.exports = ["null", "none", "nan", "na", "n/a", "", "undefined"];
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/infer-type.js
  var require_infer_type = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/infer-type.js"(exports, module) {
      var apply = require_apply();
      var assert = require_assert();
      var booleanValues = require_boolean_values();
      var cast = require_cast();
      var count = require_count();
      var every = require_every();
      var flatten = require_flatten();
      var int = require_int();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isDate = require_is_date();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var isString = require_is_string();
      var nullValues = require_null_values();
      function checkIfInteger(results) {
        if (results.type === "number") {
          if (typeof results.value !== "undefined") {
            results.isInteger = int(results.value) === results.value;
          } else {
            results.isInteger = every(
              results.values,
              (v) => isNumber(v) ? int(v) === v : true
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
          if (v === void 0)
            return "null";
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
              if (isArray(vParsed))
                return "string";
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
          values: apply(arr, (v) => cast(v, primaryType))
        });
      }
      module.exports = inferType;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/inverse.js
  var require_inverse = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/inverse.js"(exports, module) {
      var add = require_add();
      var assert = require_assert();
      var dot = require_dot();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var scale = require_scale();
      var shape = require_shape();
      function inverse(x) {
        if (isDataFrame(x)) {
          const out = x.copy();
          out.values = inverse(out.values);
          return out;
        }
        assert(
          isArray(x),
          "The `inverse` function only works on square 2-dimensional arrays or DataFrames!"
        );
        const xShape = shape(x);
        assert(
          xShape.length === 2,
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        assert(
          xShape[0] === xShape[1],
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        assert(
          xShape[0] >= 0,
          "The array passed into the `inverse` function must be exactly two-dimensional and square!"
        );
        if (xShape[0] === 0) {
          return x;
        } else if (xShape[0] === 1) {
          assert(x[0][0] !== 0, "This matrix cannot be inverted!");
          let v = x[0][0];
          if (typeof v === "bigint")
            v = Number(v);
          return 1 / v;
        } else if (xShape[0] === 2) {
          let a = x[0][0];
          let b = x[0][1];
          let c = x[1][0];
          let d = x[1][1];
          if (typeof a === "bigint")
            a = Number(a);
          if (typeof b === "bigint")
            b = Number(b);
          if (typeof c === "bigint")
            c = Number(c);
          if (typeof d === "bigint")
            d = Number(d);
          const det = a * d - b * c;
          assert(det !== 0, "This matrix cannot be inverted!");
          const out = [
            [d, -b],
            [-c, a]
          ];
          return scale(out, 1 / det);
        } else if (xShape[0] > 1) {
          const times = (a, b) => isNumber(a) || isNumber(b) ? scale(a, b) : dot(a, b);
          for (let divider = 1; divider < xShape[0] - 1; divider++) {
            try {
              const A = x.slice(0, divider).map((row) => row.slice(0, divider));
              const B = x.slice(0, divider).map((row) => row.slice(divider, xShape[0]));
              const C = x.slice(divider, xShape[0]).map((row) => row.slice(0, divider));
              const D = x.slice(divider, xShape[0]).map((row) => row.slice(divider, xShape[0]));
              const AInv = inverse(A);
              const CompInv = inverse(add(D, times(-1, times(times(C, AInv), B))));
              const topLeft = add(
                AInv,
                times(times(times(times(AInv, B), CompInv), C), AInv)
              );
              const topRight = times(-1, times(times(AInv, B), CompInv));
              const bottomLeft = times(-1, times(times(CompInv, C), AInv));
              const bottomRight = CompInv;
              const out = topLeft.map((row, i) => row.concat(topRight[i])).concat(bottomLeft.map((row, i) => row.concat(bottomRight[i])));
              return out;
            } catch (e) {
            }
          }
          assert(false, "This matrix cannot be inverted!");
        }
      }
      module.exports = inverse;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/helpers/is-browser.js
  var require_is_browser = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/helpers/is-browser.js"(exports, module) {
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
      module.exports = isBrowser;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/lerp.js
  var require_lerp = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/lerp.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function lerp(a, b, f) {
        try {
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
          if (!isNumber(f))
            return NaN;
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
      module.exports = vectorize(lerp);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/log.js
  var require_log = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/log.js"(exports, module) {
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var vectorize = require_vectorize();
      function log(x, base) {
        try {
          base = isUndefined(base) ? Math.E : base;
          if (!isNumber(x))
            return NaN;
          if (!isNumber(base))
            return NaN;
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
      module.exports = vectorize(log);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mean.js
  var require_mean = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mean.js"(exports, module) {
      var stats = require_stats();
      function mean(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs }).mean;
      }
      module.exports = mean;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/median.js
  var require_median = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/median.js"(exports, module) {
      var stats = require_stats();
      function median(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs, median: true }).median;
      }
      module.exports = median;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mod.js
  var require_mod = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mod.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function mod(a, b) {
        try {
          if (!isNumber(a))
            return NaN;
          if (!isNumber(b))
            return NaN;
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
      module.exports = vectorize(mod);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/mode.js
  var require_mode = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/mode.js"(exports, module) {
      var stats = require_stats();
      function mode(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs, mode: true }).mode;
      }
      module.exports = mode;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/normal.js
  var require_normal = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/normal.js"(exports, module) {
      var { random } = require_random();
      var apply = require_apply();
      var isUndefined = require_is_undefined();
      var ndarray = require_ndarray();
      function helper() {
        const u1 = random();
        const u2 = random();
        return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      }
      function normal(shape) {
        if (isUndefined(shape))
          return helper();
        return apply(ndarray(shape), helper);
      }
      module.exports = normal;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/ones.js
  var require_ones = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/ones.js"(exports, module) {
      var apply = require_apply();
      var ndarray = require_ndarray();
      function ones(shape) {
        return apply(ndarray(shape), () => 1);
      }
      module.exports = ones;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/permutations.js
  var require_permutations = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/permutations.js"(exports, module) {
      var { combinations } = require_combinations();
      var assert = require_assert();
      var flatten = require_flatten();
      var int = require_int();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isNumber = require_is_number();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var zeros = require_zeros();
      function permutationsIterator(x, r) {
        function* helper(x2, r2) {
          r2 = r2 || x2.length;
          if (x2.length === 1) {
            yield [x2];
            return;
          }
          for (const c of combinations(x2, r2)) {
            if (!c.slice)
              continue;
            const state = zeros(c.length);
            yield c;
            let i = 1;
            while (i < c.length) {
              if (state[i] < i) {
                if (i % 2 === 0) {
                  const buf = c[0];
                  c[0] = c[i];
                  c[i] = buf;
                } else {
                  const buf = c[state[i]];
                  c[state[i]] = c[i];
                  c[i] = buf;
                }
                yield c;
                state[i] += 1;
                i = 1;
              } else {
                state[i] = 0;
                i += 1;
              }
            }
          }
        }
        if (isDataFrame(x) || isSeries(x)) {
          return permutationsIterator(x.values, r);
        }
        assert(
          isArray(x),
          "The `permutations` function only works on arrays, Series, and DataFrames!"
        );
        if (isUndefined(r)) {
          r = x.length;
        }
        assert(
          isNumber(r) && int(r) === r && r >= 0,
          "`r` must be a non-negative integer!"
        );
        return helper(flatten(x), r);
      }
      function permutations(x, r) {
        const out = [];
        for (const perm of permutationsIterator(x, r)) {
          out.push(perm.slice());
        }
        return out;
      }
      module.exports = { permutations, permutationsIterator };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/print.js
  var require_print = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/print.js"(exports, module) {
      var { DataFrame, Series } = require_dataframe();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isJagged = require_is_jagged();
      var isSeries = require_is_series();
      var shape = require_shape();
      function print() {
        Object.keys(arguments).forEach((key) => {
          const x = arguments[key];
          if (isArray(x)) {
            if (!isJagged(x)) {
              const xShape = shape(x);
              if (xShape.length === 1) {
                new Series(x).print();
              } else if (xShape.length == 2) {
                new DataFrame(x).print();
              } else {
                console.log(x);
              }
            } else {
              console.log(x);
            }
          } else if (isDataFrame(x) || isSeries(x)) {
            x.print();
          } else {
            console.log(x);
          }
        });
      }
      module.exports = print;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/remap.js
  var require_remap = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/remap.js"(exports, module) {
      var isArray = require_is_array();
      var isNumber = require_is_number();
      var isUndefined = require_is_undefined();
      var stats = require_stats();
      var vectorize = require_vectorize();
      var helper = vectorize((x, a, b, c, d) => {
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
          if (den === 0)
            return NaN;
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
        return helper(x, a, b, c, d);
      }
      module.exports = remap;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/round.js
  var require_round = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/round.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function round(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint")
            return x;
          return Math.round(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(round);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sign.js
  var require_sign = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sign.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sign(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint")
            return BigInt(sign(Number(x)));
          if (x < 0)
            return -1;
          if (x > 0)
            return 1;
          return 0;
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(sign);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/sin.js
  var require_sin = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/sin.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function sin(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.sin(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(sin);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/some.js
  var require_some = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/some.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isFunction = require_is_function();
      var isSeries = require_is_series();
      function some(x, fn) {
        if (isDataFrame(x) || isSeries(x)) {
          return some(x.values, fn);
        }
        assert(
          isArray(x),
          "The first argument passed into the `some` function must be an array, Series, or DataFrame!"
        );
        assert(
          isFunction(fn),
          "The second argument passed into the `some` function must be a function!"
        );
        for (const v of x) {
          if (isArray(v)) {
            if (some(v, fn)) {
              return true;
            }
          } else {
            if (fn(v)) {
              return true;
            }
          }
        }
        return false;
      }
      module.exports = some;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/std.js
  var require_std = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/std.js"(exports, module) {
      var stats = require_stats();
      function std(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs, stdev: true }).stdev;
      }
      module.exports = std;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/stdev.js
  var require_stdev = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/stdev.js"(exports, module) {
      var std = require_std();
      function stdev(x) {
        return std(x);
      }
      module.exports = stdev;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/tan.js
  var require_tan = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/tan.js"(exports, module) {
      var isNumber = require_is_number();
      var vectorize = require_vectorize();
      function tan(x) {
        try {
          if (!isNumber(x))
            return NaN;
          if (typeof x === "bigint") {
            x = Number(x);
          }
          return Math.tan(x);
        } catch (e) {
          return NaN;
        }
      }
      module.exports = vectorize(tan);
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/time.js
  var require_time = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/time.js"(exports, module) {
      var assert = require_assert();
      var isFunction = require_is_function();
      function timeSync(fn, args) {
        assert(isFunction(fn), "`fn` must be a function!");
        const start = new Date();
        if (args) {
          fn(...args);
        } else {
          fn();
        }
        return new Date() - start;
      }
      async function timeAsync(fn, args) {
        assert(isFunction(fn), "`fn` must be a function!");
        const start = new Date();
        if (args) {
          await fn(...args);
        } else {
          await fn();
        }
        return new Date() - start;
      }
      module.exports = { timeSync, timeAsync };
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/union.js
  var require_union = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/union.js"(exports, module) {
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var set = require_set();
      function union() {
        return set(
          [...arguments].map((v) => {
            if (isArray(v))
              return v;
            if (isDataFrame(v))
              return v.values;
            if (isSeries(v))
              return v.values;
            return [v];
          })
        );
      }
      module.exports = union;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/variance.js
  var require_variance = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/variance.js"(exports, module) {
      var stats = require_stats();
      function variance(arr, shouldDropNaNs) {
        return stats(arr, { shouldDropNaNs, variance: true }).variance;
      }
      module.exports = variance;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/zip.js
  var require_zip = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/zip.js"(exports, module) {
      var assert = require_assert();
      var isArray = require_is_array();
      var isDataFrame = require_is_dataframe();
      var isSeries = require_is_series();
      var isUndefined = require_is_undefined();
      var max = require_max();
      var range = require_range();
      function zip() {
        const out = [];
        const arrays = Object.values(arguments).map((arr) => {
          if (isDataFrame(arr) || isSeries(arr)) {
            arr = arr.values;
          }
          assert(
            isArray(arr),
            "The `zip` function only works on arrays, Series, and DataFrames!"
          );
          return arr;
        });
        range(0, max(arrays.map((arr) => arr.length))).forEach((i) => {
          const row = [];
          arrays.forEach((arr) => {
            const value = arr[i];
            row.push(isUndefined(value) ? void 0 : value);
          });
          out.push(row);
        });
        return out;
      }
      module.exports = zip;
    }
  });

  // node_modules/@jrc03c/js-math-tools/src/index.js
  var require_src = __commonJS({
    "node_modules/@jrc03c/js-math-tools/src/index.js"(exports, module) {
      var { copy, decycle } = require_copy();
      var { DataFrame, Series } = require_dataframe();
      var out = {
        abs: require_abs(),
        add: require_add(),
        apply: require_apply(),
        arccos: require_arccos(),
        arcsin: require_arcsin(),
        arctan: require_arctan(),
        argmax: require_argmax(),
        argmin: require_argmin(),
        assert: require_assert(),
        cast: require_cast(),
        ceil: require_ceil(),
        chop: require_chop(),
        clamp: require_clamp(),
        combinations: require_combinations().combinations,
        combinationsIterator: require_combinations().combinationsIterator,
        copy,
        correl: require_correl(),
        cos: require_cos(),
        count: require_count(),
        covariance: require_covariance(),
        DataFrame,
        dataTypes: require_data_types(),
        decycle,
        diff: require_diff(),
        distance: require_distance(),
        divide: require_divide(),
        dot: require_dot(),
        dropMissing: require_drop_missing(),
        dropMissingPairwise: require_drop_missing_pairwise(),
        dropNaN: require_drop_nan(),
        dropNaNPairwise: require_drop_nan_pairwise(),
        dropUndefined: require_drop_undefined(),
        every: require_every(),
        exp: require_exp(),
        factorial: require_factorial(),
        find: require_find(),
        findAll: require_find_all(),
        flatten: require_flatten(),
        float: require_float(),
        floor: require_floor(),
        identity: require_identity(),
        IndexMatcher: require_index_matcher(),
        indexOf: require_index_of(),
        inferType: require_infer_type(),
        int: require_int(),
        intersect: require_intersect(),
        inverse: require_inverse(),
        isArray: require_is_array(),
        isBoolean: require_is_boolean(),
        isBrowser: require_is_browser(),
        isDataFrame: require_is_dataframe(),
        isDate: require_is_date(),
        isEqual: require_is_equal(),
        isFunction: require_is_function(),
        isJagged: require_is_jagged(),
        isNested: require_is_nested(),
        isNumber: require_is_number(),
        isObject: require_is_object(),
        isSeries: require_is_series(),
        isString: require_is_string(),
        isUndefined: require_is_undefined(),
        lerp: require_lerp(),
        log: require_log(),
        MathError: require_math_error(),
        max: require_max(),
        mean: require_mean(),
        median: require_median(),
        min: require_min(),
        mod: require_mod(),
        mode: require_mode(),
        multiply: require_multiply(),
        ndarray: require_ndarray(),
        normal: require_normal(),
        ones: require_ones(),
        permutations: require_permutations().permutations,
        permutationsIterator: require_permutations().permutationsIterator,
        pow: require_pow(),
        print: require_print(),
        product: require_product(),
        random: require_random().random,
        range: require_range(),
        remap: require_remap(),
        reshape: require_reshape(),
        reverse: require_reverse(),
        round: require_round(),
        scale: require_scale(),
        seed: require_random().seed,
        Series,
        set: require_set(),
        shape: require_shape(),
        shuffle: require_shuffle(),
        sign: require_sign(),
        sin: require_sin(),
        some: require_some(),
        sort: require_sort(),
        sqrt: require_sqrt(),
        stats: require_stats(),
        std: require_std(),
        stdev: require_stdev(),
        subtract: require_subtract(),
        sum: require_sum(),
        tan: require_tan(),
        time: require_time().timeSync,
        timeSync: require_time().timeSync,
        timeAsync: require_time().timeAsync,
        transpose: require_transpose(),
        union: require_union(),
        variance: require_variance(),
        vectorize: require_vectorize(),
        zeros: require_zeros(),
        zip: require_zip(),
        dump: function() {
          const context = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : void 0;
          if (!context) {
            throw new out.MathError(
              "Cannot dump functions into global scope because none of `globalThis`, `global`, `window`, or `self` exist in the current context!"
            );
          }
          Object.keys(out).forEach((key) => {
            try {
              Object.defineProperty(context, key, {
                configurable: false,
                enumerable: true,
                writable: false,
                value: out[key]
              });
            } catch (e) {
              context[key] = out[key];
            }
          });
        }
      };
      if (typeof module !== "undefined") {
        module.exports = out;
      }
      if (typeof window !== "undefined") {
        window.JSMathTools = out;
      }
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/convert-object-to-typed-array.js
  var require_convert_object_to_typed_array = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/convert-object-to-typed-array.js"(exports, module) {
      var { isArray } = require_src();
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
      module.exports = convertObjectToTypedArray;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/convert-typed-array-to-object.js
  var require_convert_typed_array_to_object = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/convert-typed-array-to-object.js"(exports, module) {
      var { isArray, isDate } = require_src();
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
      module.exports = convertTypedArrayToObject;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/is-a-number-string.js
  var require_is_a_number_string = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/is-a-number-string.js"(exports, module) {
      function isANumberString(x) {
        x = x.trim();
        return !!(x.match(/^-?\d+(\.\d+)?$/g) || x.match(/^-?\d+(\.\d+)?e-?\d+(\.\d+)?$/g) || x.match(/^-?\.\d+$/g) || x === "NaN");
      }
      module.exports = isANumberString;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/helpers/index.js
  var require_helpers = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/helpers/index.js"(exports, module) {
      module.exports = {
        convertObjectToTypedArray: require_convert_object_to_typed_array(),
        convertTypedArrayToObject: require_convert_typed_array_to_object(),
        isANumberString: require_is_a_number_string(),
        punctuation: require_punctuation(),
        replaceAll: require_replace_all(),
        strip: require_strip()
      };
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/parse.js
  var require_parse = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/parse.js"(exports, module) {
      var { isArray } = require_src();
      var { convertObjectToTypedArray, isANumberString } = require_helpers();
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
        function helper(x2) {
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
              if (isArray(out))
                return out;
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
        return helper(x);
      }
      module.exports = parse;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/pascalify.js
  var require_pascalify = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/pascalify.js"(exports, module) {
      var camelify = require_camelify();
      function pascalify(text) {
        const out = camelify(text);
        return out[0].toUpperCase() + out.slice(1);
      }
      module.exports = pascalify;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/snakeify.js
  var require_snakeify = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/snakeify.js"(exports, module) {
      var strip = require_strip();
      function snakeify(text) {
        if (typeof text !== "string") {
          throw new Error("`text` must be a string!");
        }
        const words = strip(text).split(" ");
        if (words.length === 0)
          return "";
        if (words.length === 1)
          return words[0];
        return words.join("_");
      }
      module.exports = snakeify;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/stringify.js
  var require_stringify = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/stringify.js"(exports, module) {
      var {
        assert,
        decycle,
        isArray,
        isDate,
        isString,
        isUndefined,
        range
      } = require_src();
      var convertTypedArrayToObject = require_convert_typed_array_to_object();
      function prefix(s, n) {
        if (!s || n <= 0)
          return "";
        return range(0, n).map(() => s).join("");
      }
      function stringify(x, indent) {
        assert(
          isString(indent) || isUndefined(indent),
          "The second parameter to the `stringify` function must be undefined or a string!"
        );
        const newline = indent ? "\n" : "";
        function helper(x2, indent2, depth) {
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
                return prefix(indent2, depth - 1) + "[]";
              }
              if (!(x2 instanceof Array)) {
                return helper(convertTypedArrayToObject(x2), null, indent2);
              }
              return prefix(indent2, depth - 1) + "[" + newline + x2.map((v) => {
                let child = (() => {
                  try {
                    return helper(convertTypedArrayToObject(v), indent2, depth + 1);
                  } catch (e) {
                    return helper(v, indent2, depth + 1);
                  }
                })();
                if (isString(child))
                  child = child.trim();
                return prefix(indent2, depth + 1) + child;
              }).join("," + newline) + newline + prefix(indent2, depth) + "]";
            }
            if (Object.keys(x2).length + Object.getOwnPropertySymbols(x2).length === 0) {
              return prefix(indent2, depth - 1) + "{}";
            }
            return prefix(indent2, depth - 1) + "{" + newline + Object.keys(x2).concat(Object.getOwnPropertySymbols(x2)).map((key) => {
              let child = (() => {
                try {
                  return helper(
                    convertTypedArrayToObject(x2[key]),
                    indent2,
                    depth + 1
                  );
                } catch (e) {
                  return helper(x2[key], indent2, depth + 1);
                }
              })();
              if (isString(child))
                child = child.trim();
              const stringifiedKey = typeof key === "symbol" ? helper(key) : JSON.stringify(key);
              return prefix(indent2, depth + 1) + stringifiedKey + ":" + (indent2 ? " " : "") + child;
            }).join("," + newline) + newline + prefix(indent2, depth) + "}";
          }
          return "undefined";
        }
        return helper(decycle(x), indent);
      }
      module.exports = stringify;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/unindent.js
  var require_unindent = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/unindent.js"(exports, module) {
      function unindent(text) {
        const lines = text.split("\n");
        const indentations = lines.filter((line) => line.trim().length > 0).map((line) => line.split("").findIndex((char) => !char.match(/\s/g)));
        const minIndentation = Math.min(...indentations);
        return lines.map((line) => line.substring(minIndentation)).join("\n");
      }
      module.exports = unindent;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/wrap.js
  var require_wrap = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/wrap.js"(exports, module) {
      function wrap(raw, maxLineLength) {
        if (typeof raw !== "string") {
          throw new Error(
            "The first argument to the `wrap` function must be a string!"
          );
        }
        if (typeof maxLineLength === "undefined" || maxLineLength === null) {
          if (typeof process !== "undefined" && typeof process.stdout !== "undefined" && typeof process.stdout.columns === "number") {
            maxLineLength = process.stdout.columns > 80 ? 80 : process.stdout.columns;
          } else {
            maxLineLength = 80;
          }
        }
        if (isNaN(maxLineLength) || typeof maxLineLength !== "number") {
          throw new Error(
            "The second argument to the `wrap` function must be undefined, null, or an integer!"
          );
        }
        const out = [];
        raw.split("\n").forEach((line) => {
          if (line.trim().length === 0) {
            return out.push("");
          }
          const indentation = line.split(/[^\s]/g)[0];
          const words = line.replace(indentation, "").split(" ");
          let temp = indentation;
          words.forEach((word) => {
            const newLine = temp + (temp.trim().length > 0 ? " " : "") + word;
            if (newLine.length > maxLineLength) {
              out.push(temp);
              temp = indentation + word;
            } else {
              temp = newLine;
            }
          });
          if (temp.length > 0) {
            out.push(temp);
          }
        });
        return out.join("\n");
      }
      module.exports = wrap;
    }
  });

  // node_modules/@jrc03c/js-text-tools/src/index.js
  var require_src2 = __commonJS({
    "node_modules/@jrc03c/js-text-tools/src/index.js"(exports, module) {
      var out = {
        camelify: require_camelify(),
        indent: require_indent(),
        kebabify: require_kebabify(),
        parse: require_parse(),
        pascalify: require_pascalify(),
        snakeify: require_snakeify(),
        stringify: require_stringify(),
        unindent: require_unindent(),
        wrap: require_wrap(),
        dump() {
          Object.keys(out).forEach((key) => {
            if (typeof global !== "undefined") {
              global[key] = out[key];
            }
            if (typeof window !== "undefined") {
              window[key] = out[key];
            }
          });
        }
      };
      if (typeof module !== "undefined") {
        module.exports = out;
      }
      if (typeof window !== "undefined") {
        window.JSTextTools = out;
      }
    }
  });

  // node_modules/@jrc03c/make-key/src/index.js
  var require_src3 = __commonJS({
    "node_modules/@jrc03c/make-key/src/index.js"(exports, module) {
      var {
        assert,
        int,
        isNumber,
        isString,
        random,
        seed
      } = require_src();
      function makeKey(keyLength, keySeed, charset) {
        if (arguments.length === 2) {
          if (isNumber(arguments[1])) {
            charset = null;
          } else {
            charset = keySeed;
            keySeed = null;
          }
        }
        assert(
          isNumber(keyLength) && int(keyLength) === keyLength,
          "`keyLength` must be an integer!"
        );
        if (keySeed) {
          assert(
            isNumber(keySeed) && int(keySeed) === keySeed,
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
          out += charset[int(random() * charset.length)];
        }
        return out;
      }
      if (typeof module !== "undefined") {
        module.exports = makeKey;
      }
      if (typeof window !== "undefined") {
        window.makeKey = makeKey;
      }
    }
  });

  // src/array-prototype-remove.js
  var require_array_prototype_remove = __commonJS({
    "src/array-prototype-remove.js"() {
      Array.prototype.remove = function(x) {
        let index = this.indexOf(x);
        while (index > -1) {
          this.splice(index, 1);
          index = this.indexOf(x);
        }
        return this;
      };
    }
  });

  // src/subscription-service.js
  var require_subscription_service = __commonJS({
    "src/subscription-service.js"(exports, module) {
      var { parse, stringify } = require_src2();
      var makeKey = require_src3();
      require_array_prototype_remove();
      var alive = {};
      var SubscriptionService = class {
        context = void 0;
        rejects = [];
        resolves = [];
        unsubs = [];
        constructor() {
          this.context = globalThis;
          const id = makeKey(8);
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
        destroy(error) {
          if (this.hasBeenDestroyed) {
            throw new Error(
              `This SubscriptionService instance has already been destroyed!`
            );
          }
          delete alive[this.id];
          this.unsubs.forEach((unsub) => unsub());
          if (error) {
            this.rejects.forEach((reject) => reject(error));
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
              const cbid = makeKey(8);
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
            this.context.removeEventListener("message", inner);
            this.unsubs.remove(unsub);
          };
          this.unsubs.push(unsub);
          this.context.addEventListener("message", inner);
          return unsub;
        }
      };
      module.exports = SubscriptionService;
    }
  });

  // src/drone.js
  var require_drone = __commonJS({
    "src/drone.js"(exports, module) {
      var SubscriptionService = require_subscription_service();
      var Drone = class extends SubscriptionService {
        constructor(path) {
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
            this.context = new Worker(path);
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
      module.exports = Drone;
    }
  });

  // src/queen.js
  var require_queen = __commonJS({
    "src/queen.js"(exports, module) {
      var Drone = require_drone();
      var SubscriptionService = require_subscription_service();
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
        addDrone(path) {
          if (this.isDead) {
            throw new Error("The queen is dead!");
          }
          const drone = new Drone(path);
          this.hive.push(drone);
          return drone;
        }
        addDrones(path, n) {
          const out = [];
          for (let i = 0; i < n; i++) {
            out.push(this.addDrone(path));
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
        destroy(error) {
          if (this.isDead) {
            throw new Error("The queen is dead!");
          }
          const out = super.destroy(error);
          this.hive.forEach((drone) => {
            drone.destroy(error);
          });
          delete this.hive;
          return out;
        }
      };
      module.exports = Queen;
    }
  });

  // src/index.js
  var require_src4 = __commonJS({
    "src/index.js"(exports, module) {
      var Bee = {
        Drone: require_drone(),
        Queen: require_queen()
      };
      if (typeof module !== "undefined") {
        module.exports = Bee;
      }
      if (typeof globalThis !== "undefined") {
        globalThis.Bee = Bee;
      }
    }
  });
  require_src4();
})();
