// src/index.mjs
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
export {
  pauseAsync as pause,
  pauseAsync,
  pauseSync
};
