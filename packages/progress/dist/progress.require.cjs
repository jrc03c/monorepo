var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.mjs
var src_exports = {};
__export(src_exports, {
  progress: () => progress
});
module.exports = __toCommonJS(src_exports);
var import_readline = __toESM(require("readline"), 1);
function repeat(text, n) {
  let out = "";
  for (let i = 0; i < n; i++) {
    out += text;
  }
  return out;
}
var Progress = class _Progress extends Array {
  static drawBar(i, n) {
    const isAPercent = typeof n === "undefined";
    i = isAPercent ? Math.round(100 * i) : i;
    n = isAPercent ? 100 : n;
    if (i < 0) {
      throw new Error("The progress bar value can't be less than 0%!");
    }
    if (i > n) {
      throw new Error("The progress bar value can't be greater than 100%!");
    }
    const right = isAPercent ? ` (${i}%)` : ` (${i} / ${n})`;
    const percent = i / n;
    const remainingColumns = process.stdout.columns - right.length;
    const done = parseInt(percent * remainingColumns);
    const notDone = remainingColumns - done;
    if (percent === 1) {
      import_readline.default.clearLine(process.stdout, 0);
    }
    import_readline.default.cursorTo(process.stdout, 0, null);
    process.stdout.write(repeat("\u2588", done) + repeat("\u2591", notDone) + right);
  }
  forEach(fn, otherThis) {
    for (let i = 0; i < this.length; i++) {
      const boundFn = fn.bind(otherThis || this);
      boundFn(this[i], i, this);
      _Progress.drawBar(i, this.length);
    }
    _Progress.drawBar(this.length, this.length);
    process.stdout.write("\n");
    return void 0;
  }
  map(fn, otherThis) {
    const out = [];
    const boundFn = fn.bind(otherThis || this);
    this.forEach((v, i, arr) => {
      out.push(boundFn(v, i, arr));
    });
    return out;
  }
  filter(fn, otherThis) {
    const out = [];
    const boundFn = fn.bind(otherThis || this);
    this.forEach((v, i, arr) => {
      if (boundFn(v, i, arr)) {
        out.push(v);
      }
    });
    return out;
  }
  reduce(fn, initialValue) {
    let out = initialValue || this[0];
    this.slice(initialValue ? 0 : 1).forEach((v) => {
      out = fn(out, v);
    });
    return out;
  }
};
function progress(x, y) {
  if (x instanceof Array) {
    return Progress.from(x);
  }
  if (typeof x === "number") {
    return Progress.drawBar(x, y);
  }
  throw new Error(
    "You must pass either (1) an array or (2) one or two numbers into the `progress` function!"
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  progress
});
