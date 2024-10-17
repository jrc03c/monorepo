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
  bg: () => bg,
  fg: () => fg,
  fx: () => fx
});
module.exports = __toCommonJS(src_exports);
var reset = "\x1B[0m";
var bg = {
  black: (x) => "\x1B[40m" + x + reset,
  red: (x) => "\x1B[41m" + x + reset,
  green: (x) => "\x1B[42m" + x + reset,
  yellow: (x) => "\x1B[43m" + x + reset,
  blue: (x) => "\x1B[44m" + x + reset,
  magenta: (x) => "\x1B[45m" + x + reset,
  cyan: (x) => "\x1B[46m" + x + reset,
  white: (x) => "\x1B[47m" + x + reset
};
var fg = {
  black: (x) => "\x1B[30m" + x + reset,
  red: (x) => "\x1B[31m" + x + reset,
  green: (x) => "\x1B[32m" + x + reset,
  yellow: (x) => "\x1B[33m" + x + reset,
  blue: (x) => "\x1B[34m" + x + reset,
  magenta: (x) => "\x1B[35m" + x + reset,
  cyan: (x) => "\x1B[36m" + x + reset,
  white: (x) => "\x1B[37m" + x + reset
};
var fx = {
  reset: (x) => reset + x + reset,
  bright: (x) => "\x1B[1m" + x + reset,
  dim: (x) => "\x1B[2m" + x + reset,
  underscore: (x) => "\x1B[4m" + x + reset,
  blink: (x) => "\x1B[5m" + x + reset,
  reverse: (x) => "\x1B[7m" + x + reset,
  hidden: (x) => "\x1B[8m" + x + reset
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bg,
  fg,
  fx
});
