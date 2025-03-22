import { freeze } from "@jrc03c/freeze"

function defineReadOnlyProperty(obj, name, value) {
  value = freeze(value)

  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: true,

    get() {
      return value
    },

    set(newValue) {
      // ...
    },
  })

  return obj
}

export { defineReadOnlyProperty }
