import { camelify } from "./camelify.mjs"
import { indent } from "./indent.mjs"
import { kebabify } from "./kebabify.mjs"
import { parse } from "./parse.mjs"
import { pascalify } from "./pascalify.mjs"
import { snakeify } from "./snakeify.mjs"
import { stringify } from "./stringify.mjs"
import { unindent } from "./unindent.mjs"
import { wrap } from "./wrap.mjs"

const out = {
  camelify,
  indent,
  kebabify,
  parse,
  pascalify,
  snakeify,
  stringify,
  unindent,
  wrap,

  dump() {
    const context =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof global !== "undefined"
          ? global
          : typeof window !== "undefined"
            ? window
            : typeof self !== "undefined"
              ? self
              : undefined

    if (!context) {
      throw new out.MathError(
        "Cannot dump functions into global scope because none of `globalThis`, `global`, `window`, or `self` exist in the current context!",
      )
    }

    Object.keys(out).forEach(key => {
      try {
        Object.defineProperty(context, key, {
          configurable: false,
          enumerable: true,
          writable: false,
          value: out[key],
        })
      } catch (e) {
        context[key] = out[key]
      }
    })
  },
}

if (typeof window !== "undefined") {
  window.JSTextTools = out
}

export {
  camelify,
  indent,
  kebabify,
  parse,
  pascalify,
  snakeify,
  stringify,
  unindent,
  wrap,
}
