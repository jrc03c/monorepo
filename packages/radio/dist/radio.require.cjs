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
  Radio: () => Radio
});
module.exports = __toCommonJS(src_exports);
var Radio = class {
  subscriptions = {};
  static get singleton() {
    return singleton;
  }
  subscribe(channel, callback) {
    if (!this.subscriptions[channel]) {
      this.subscriptions[channel] = [];
    }
    this.subscriptions[channel].push(callback);
    return () => this.unsubscribe(channel, callback);
  }
  unsubscribe(channel, callback) {
    if (!this.subscriptions[channel]) return this;
    const index = this.subscriptions[channel].indexOf(callback);
    this.subscriptions[channel].splice(index, 1);
    return this;
  }
  on(channel, callback) {
    return this.subscribe(channel, callback);
  }
  off(channel, callback) {
    return this.unsubscribe(channel, callback);
  }
  broadcast(channel, payload) {
    if (!this.subscriptions[channel]) return this;
    this.subscriptions[channel].forEach((callback) => {
      callback(payload);
    });
    return this;
  }
  emit(channel, payload) {
    return this.broadcast(channel, payload);
  }
  trigger(channel, payload) {
    return this.broadcast(channel, payload);
  }
};
var singleton = new Radio();
if (typeof window !== "undefined") {
  window.Radio = Radio;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Radio
});
