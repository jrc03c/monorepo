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
    const self = this;
    if (!self.subscriptions[channel]) {
      self.subscriptions[channel] = [];
    }
    self.subscriptions[channel].push(callback);
    return self;
  }
  unsubscribe(channel, callback) {
    const self = this;
    if (!self.subscriptions[channel]) return self;
    const index = self.subscriptions[channel].indexOf(callback);
    self.subscriptions[channel].splice(index, 1);
    return self;
  }
  on(channel, callback) {
    const self = this;
    return self.subscribe(channel, callback);
  }
  off(channel, callback) {
    const self = this;
    return self.unsubscribe(channel, callback);
  }
  broadcast(channel, payload) {
    const self = this;
    if (!self.subscriptions[channel]) return self;
    self.subscriptions[channel].forEach((callback) => {
      callback(payload);
    });
    return self;
  }
  emit(channel, payload) {
    const self = this;
    return self.broadcast(channel, payload);
  }
  trigger(channel, payload) {
    const self = this;
    return self.broadcast(channel, payload);
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
