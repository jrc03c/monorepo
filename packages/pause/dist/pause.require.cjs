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
  pause: () => pauseAsync,
  pauseAsync: () => pauseAsync,
  pauseSync: () => pauseSync
});
module.exports = __toCommonJS(src_exports);
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
function pauseSync(ms) {
  const start = /* @__PURE__ */ new Date();
  let now = /* @__PURE__ */ new Date();
  while (now - start < ms) {
    now = /* @__PURE__ */ new Date();
  }
  return /* @__PURE__ */ new Date() - start;
}
if (typeof window !== "undefined") {
  window.pause = pauseAsync;
  window.pauseAsync = pauseAsync;
  window.pauseSync = pauseSync;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pause,
  pauseAsync,
  pauseSync
});
