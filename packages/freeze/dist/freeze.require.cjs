var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.mjs
var src_exports = {};
__export(src_exports, {
  freeze: () => freeze
});
module.exports = __toCommonJS(src_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  freeze
});
