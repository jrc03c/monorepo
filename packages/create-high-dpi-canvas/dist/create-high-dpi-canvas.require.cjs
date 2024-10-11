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
  createHighDPICanvas: () => createHighDPICanvas
});
module.exports = __toCommonJS(src_exports);
function createHighDPICanvas(width, height) {
  width = Math.floor(width);
  height = Math.floor(height);
  let dpi = window.devicePixelRatio || 1;
  let canvas = document.createElement("canvas");
  canvas.width = Math.floor(width * dpi);
  canvas.height = Math.floor(height * dpi);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  let context = canvas.getContext("2d");
  context.scale(dpi, dpi);
  return canvas;
}
if (typeof window !== "undefined") {
  window.createHighDPICanvas = createHighDPICanvas;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createHighDPICanvas
});
