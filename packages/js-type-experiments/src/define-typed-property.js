const isOfType = require("./is-of-type")

// options must include:
// - type
// options can optionally include:
// - allowsSubclassInstances
function defineTypedProperty(obj, prop, type, options) {
  options = options || {
    configurable: true,
    enumerable: true,
  }

  let _value

  const allowsSubclassInstances =
    typeof options.allowsSubclassInstances === "undefined"
      ? true
      : !!options.allowsSubclassInstances

  if (typeof type !== "function" && typeof type !== "string") {
    throw new Error(
      `A 'type' value (i.e., a class name or a string like "number" representing a primitive type) must be passed as the third argument to the \`defineTypedProperty\` function!`,
    )
  }

  if (type === null || typeof type === "undefined") {
    throw new Error(
      `A 'type' value (i.e., a class name or a string like "number" representing a primitive type) must be passed as the third argument to the \`defineTypedProperty\` function!`,
    )
  }

  if (type === Array) {
    throw new Error(
      "It's not possible to create a property of type Array (though you *can* create a TypedArray property)!",
    )
  }

  function getTypeString() {
    if (typeof type === "function") {
      return type.name
    } else {
      return type
    }
  }

  function canAccept(value) {
    return isOfType(value, type, allowsSubclassInstances)
  }

  function challenge(value) {
    if (canAccept(value)) {
      return true
    } else {
      throw new Error(
        `The '${prop}' property can only have ${getTypeString()} values assigned to it!`,
      )
    }
  }

  Object.defineProperty(obj, prop, {
    ...options,

    get() {
      return _value
    },

    set(value) {
      challenge(value)
      _value = value
    },
  })
}

module.exports = defineTypedProperty
