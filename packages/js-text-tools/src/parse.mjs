// NOTE: The `parse` function intentionally avoids parsing functions. Functions
// can be stringified relatively easily, but parsing their string forms back
// into functions is a huge security risk. According to MDN, using `new
// Function("...")` is basically just as insecure as using `eval`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function

import { forEach, isArray } from "@jrc03c/js-math-tools"
import { convertObjectToTypedArray, isANumberString } from "./helpers/index.mjs"

const specials = {
  "@Infinity": Infinity,
  "@NegativeInfinity": -Infinity,
  "@NaN": NaN,
  "@undefined": undefined,
}

function fixUndefineds(x) {
  if (typeof x === "object") {
    if (x === null) {
      return x
    }

    if (isArray(x)) {
      for (let i = 0; i < x.length; i++) {
        x[i] = fixUndefineds(x[i])
      }
    } else {
      forEach(
        Object.keys(x).concat(Object.getOwnPropertySymbols(x)),
        key => {
          x[key] = fixUndefineds(x[key])
        },
      )
    }

    return x
  } else {
    if (typeof x === "undefined") {
      return undefined
    }

    if (x === "Symbol(@undefined)") {
      return undefined
    }

    return x
  }
}

function parseAsBigInt(x) {
  if (typeof x === "bigint") {
    return x
  } else if (typeof x === "string") {
    if (x.match(/^\s*?-?\d+n\s*?$/g)) {
      try {
        return BigInt(x.split("n")[0])
      } catch (e) {
        return NaN
      }
    } else {
      return NaN
    }
  } else {
    return NaN
  }
}

function parseAsNumber(x) {
  if (typeof x !== "string") {
    if (typeof x === "number") {
      return x
    } else {
      return
    }
  }

  if (isANumberString(x)) {
    return parseFloat(x)
  }
}

function parseAsString(x) {
  if (typeof x !== "string") {
    return
  }

  const replacement = "@jrc03c/js-text-tools/newline-replacer"
  x = x.replaceAll("\n", replacement)

  if (x.trim().match(/^("|')?Symbol\(@String\):.*?("|')?$/g)) {
    let out = x.replace("Symbol(@String):", "")

    if (out.match(/^".*?"$/g)) {
      try {
        return JSON.parse(out)
      } catch (e) {
        out = out.substring(1, out.length - 1)
      }
    }

    out = out.replaceAll(replacement, "\n")
    return out
  }
}

function parseAsSymbol(x) {
  if (typeof x !== "string") {
    if (typeof x === "symbol") {
      return { out: x, isASymbol: true }
    } else {
      return
    }
  }

  if (x.trim().match(/^'?"?Symbol\(.*?\)"?'?$/g)) {
    const xTemp = x.replace(/^.*?Symbol\(/g, "").replace(/\).*?$/g, "")

    if (xTemp in specials) {
      return { out: specials[xTemp], isASymbol: true }
    }

    return { out: Symbol.for(xTemp), isASymbol: true }
  }
}

function parseAsRegex(x) {
  if (typeof x !== "string") {
    if (x instanceof RegExp) {
      return x
    } else {
      return
    }
  }

  const xTrimmed = x.trim()

  if (xTrimmed.match(/^\/.*?\/(d|g|i|m|s|u|v|y)*?$/g)) {
    try {
      const pattern = xTrimmed
        .replace(/^\//g, "")
        .replace(/\/(d|g|i|m|s|u|v|y)*?$/g, "")

      const flags = xTrimmed
        .match(/\/(d|g|i|m|s|u|v|y)*?$/g)
        .at(-1)
        .split("/")
        .at(-1)

      return new RegExp(pattern, flags)
    } catch (e) {
      // ...
    }
  }
}

function parseWithJSONParse(x) {
  if (typeof x !== "string") {
    if (typeof x === "object") {
      return x
    } else {
      return "Symbol(@undefined)"
    }
  }

  try {
    let out = JSON.parse(x, (key, value) => {
      try {
        const out = parse(value)
        return typeof out === "undefined" ? "Symbol(@undefined)" : out
      } catch (e) {
        return typeof value === "undefined" ? "Symbol(@undefined)" : value
      }
    })

    if (isArray(out)) {
      out = fixUndefineds(out)
    }

    return out
  } catch (e) {
    return x
  }
}

function parseAsDate(x) {
  if (typeof x !== "string") {
    if (x instanceof Date && x.toString() !== "Invalid Date") {
      return x
    } else {
      return
    }
  }

  try {
    const d = new Date(Date.parse(x))

    if (d.toString() !== "Invalid Date") {
      return d
    }
  } catch (e) {
    // ...
  }
}

function parseObjectKeysAndValues(x) {
  if (typeof x === "object") {
    if (x !== null) {
      return fixUndefineds(x)
    }

    return
  }

  forEach(
    Object.keys(x).concat(Object.getOwnPropertySymbols(x)),
    key => {
      try {
        let origKey = key

        try {
          key = parse(key)
        } catch (e) {
          // ...
        }

        x[key] = parse(x[origKey])

        if (key !== origKey) {
          delete x[origKey]
        }
      } catch (e) {
        // ...
      }
    },
  )

  return fixUndefineds(x)
}

function parse(x) {
  function helper(x) {
    if (typeof x === "string") {
      let out = parseAsString(x)

      if (typeof out === "string") {
        return out
      }

      const results = parseAsSymbol(x)
      out = results ? results.out : undefined

      if (results && results.isASymbol) {
        return out
      }

      out = parseAsRegex(x)

      if (out instanceof RegExp) {
        return out
      }

      out = parseAsBigInt(x)

      if (typeof out === "bigint") {
        return out
      }

      out = parseAsNumber(x)

      if (typeof out === "number") {
        return out
      }

      out = parseAsDate(x)

      if (out instanceof Date) {
        return out
      }

      out = parseWithJSONParse(x)

      if (typeof out !== "undefined") {
        if (out === "Symbol(@undefined)") {
          return undefined
        } else {
          return out
        }
      }

      return x
    }

    if (typeof x === "object") {
      if (x === null) {
        return null
      }

      let out

      try {
        out = convertObjectToTypedArray(x)
        if (isArray(out)) return out
      } catch (e) {
        // ...
      }

      out = parseObjectKeysAndValues(x)

      if (out) {
        try {
          return convertObjectToTypedArray(out)
        } catch (e) {
          return out
        }
      }

      return x
    }

    return x
  }

  return helper(x)
}

export { parse }
