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
  prompt: () => prompt
});
module.exports = __toCommonJS(src_exports);
var import_node_process = __toESM(require("node:process"), 1);
var import_node_readline = __toESM(require("node:readline"), 1);
function prompt(text, isHidden, callback) {
  if (arguments.length === 2) {
    if (typeof arguments[1] === "function") {
      callback = isHidden;
      isHidden = false;
    }
  }
  return new Promise((resolve, reject) => {
    try {
      if (!text.match(/\s$/g)) {
        text += " ";
      }
      const rl = import_node_readline.default.createInterface({
        input: import_node_process.default.stdin,
        output: import_node_process.default.stdout
      });
      rl.question(text, (response) => {
        if (callback) callback(response);
        resolve(response);
        rl.close();
      });
      if (isHidden) {
        rl._writeToOutput = function(s) {
          if (s === "\r\n") {
            rl.output.write(s);
          } else {
            rl.output.write("*");
          }
        };
      }
    } catch (e) {
      reject(e);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prompt
});
