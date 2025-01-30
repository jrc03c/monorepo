// src/index.mjs
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
export {
  Radio
};
