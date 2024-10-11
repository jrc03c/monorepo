// src/index.mjs
function proxify(x, shouldThrowErrors) {
  return new Proxy(x, {
    defineProperty() {
      if (shouldThrowErrors) {
        throw new Error(
          `The target object is read-only, so no new properties can be defined on it!`
        );
      }
      return true;
    },
    deleteProperty(prop) {
      if (shouldThrowErrors) {
        throw new Error(
          `The target object is read-only, so its "${prop}" property cannot be deleted!`
        );
      }
      return true;
    },
    set(target, prop) {
      if (shouldThrowErrors) {
        throw new Error(
          `The target object is read-only, so its "${prop}" property cannot be set!`
        );
      }
      return true;
    },
    setPrototypeOf() {
      if (shouldThrowErrors) {
        throw new Error(
          `The target object is read-only, so its prototype cannot be set!`
        );
      }
      return true;
    }
  });
}
function freeze(x, shouldThrowErrors) {
  if (typeof x === "object") {
    if (x === null) {
      return x;
    }
    Object.keys(x).forEach((key) => {
      x[key] = freeze(x[key]);
    });
    return proxify(x, shouldThrowErrors);
  } else {
    return x;
  }
}
if (typeof window !== "undefined") {
  window.freeze = freeze;
}
export {
  freeze
};
