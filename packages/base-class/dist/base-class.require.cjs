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
  BaseClass: () => BaseClass
});
module.exports = __toCommonJS(src_exports);
var BaseClass = class {
  subscriptions = {};
  copy() {
    const out = new this.constructor(this.toObject());
    Object.keys(this.subscriptions).forEach((channel) => {
      out.subscriptions[channel] = this.subscriptions[channel].slice();
    });
    return out;
  }
  emit(channel, payload) {
    if (this.subscriptions[channel]) {
      this.subscriptions[channel].forEach((callback) => {
        callback(payload);
      });
    }
    return this;
  }
  off(channel, callback) {
    if (typeof channel !== "string") {
      throw new Error(
        `The first argument passed into a \`${this.constructor.name}\` instance's \`off\` method must be a string representing an event name!`
      );
    }
    if (typeof callback !== "function") {
      throw new Error(
        `The second argument passed into a \`${this.constructor.name}\` instance's \`off\` method must be a callback function!`
      );
    }
    if (this.subscriptions[channel]) {
      const index = this.subscriptions[channel].indexOf(callback);
      if (index > -1) {
        this.subscriptions[channel].splice(index, 1);
      }
    }
    return void 0;
  }
  on(channel, callback) {
    if (typeof channel !== "string") {
      throw new Error(
        `The first argument passed into a \`${this.constructor.name}\` instance's \`on\` method must be a string representing an event name!`
      );
    }
    if (typeof callback !== "function") {
      throw new Error(
        `The second argument passed into a \`${this.constructor.name}\` instance's \`on\` method must be a callback function!`
      );
    }
    if (!this.subscriptions[channel]) {
      this.subscriptions[channel] = [];
    }
    this.subscriptions[channel].push(callback);
    return () => this.off(channel, callback);
  }
  toObject() {
    return {};
  }
};
if (typeof window !== "undefined") {
  window.BaseClass = BaseClass;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseClass
});
