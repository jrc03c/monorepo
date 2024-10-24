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
  HighDPICanvasElement: () => HighDPICanvasElement,
  createHighDPICanvas: () => createHighDPICanvas
});
module.exports = __toCommonJS(src_exports);
var HighDPICanvasElementResizeEvent = class extends Event {
  constructor(name, options) {
    super(name, options);
    options = options || {};
    this.height = options.height;
    this.width = options.width;
  }
};
var HighDPICanvasElement = class extends HTMLElement {
  static css = (
    /* css */
    `
    canvas {
      margin: 0;
      padding: 0;
      border: 0;
    }
  `
  );
  static forwardedEvents = [
    "contextlost",
    "contextrestored",
    "webglcontextcreationerror",
    "webglcontextlost",
    "webglcontextrestored"
  ];
  static observedAttributes = ["height", "width"];
  static tagName = "high-dpi-canvas";
  static template = "<canvas></canvas>";
  constructor() {
    super(...arguments);
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        ${this.constructor.css}
      </style>

      ${this.constructor.template}
    `;
    this._height = 0;
    this._width = 0;
  }
  get dimensions() {
    return [this._width, this._height];
  }
  set dimensions(value) {
    this._width = value[0];
    this._height = value[1];
    this.style.width = `${this._width}px`;
    this.style.height = `${this._height}px`;
  }
  get element() {
    return this.shadowRoot.querySelector("canvas");
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this.style.height = `${value}px`;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this.style.width = `${value}px`;
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "height") {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
      }
      this.height = newValue;
    }
    if (name === "width") {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
      }
      this.width = newValue;
    }
  }
  captureStream() {
    return this.element.captureStream(...arguments);
  }
  connectedCallback() {
    this.style.overflow = "hidden";
    this.style.display = "flex";
    this.style.flexDirection = "row";
    this.style.flexWrap = "nowrap";
    this.style.justifyContent = "center";
    this.style.alignContent = "center";
    this.style.alignItems = "center";
    const { element } = this;
    this.eventListenerRemovers = [];
    this.constructor.forwardedEvents.forEach((eventName) => {
      this.on(element, eventName, (event) => {
        this.dispatchEvent(
          new Event(eventName, {
            bubbles: true,
            composed: true,
            detail: { ...event.detail }
          })
        );
      });
    });
    this.resizeObserver = new ResizeObserver(() => {
      const { width, height } = this.getBoundingClientRect();
      this._width = width;
      this._height = height;
      this.onResizeCallback();
    });
    this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this.eventListenerRemovers.forEach((remover) => {
      try {
        remover.remove();
      } catch (e) {
      }
    });
  }
  getContext() {
    return this.element.getContext(...arguments);
  }
  off(object, event, callback) {
    const removers = this.eventListenerRemovers.filter(
      (remover) => remover.object === object && remover.event === event && remover.callback === callback
    );
    if (removers.length > 0) {
      removers.forEach((remover) => remover.remove());
    } else {
      object.removeEventListener(event, callback);
    }
  }
  on(object, event, callback) {
    const remove = () => {
      object.removeEventListener(event, callback);
      const index = this.eventListenerRemovers.indexOf(remover);
      if (index > -1) {
        this.eventListenerRemovers.splice(index, 1);
      }
    };
    const remover = {
      object,
      event,
      callback,
      remove
    };
    this.eventListenerRemovers.push(remover);
    object.addEventListener(event, callback);
    return remove;
  }
  onResizeCallback() {
    const { element } = this;
    const dpi = window.devicePixelRatio || 1;
    element.width = Math.floor(this._width * dpi);
    element.height = Math.floor(this._height * dpi);
    element.style.width = `${this._width}px`;
    element.style.height = `${this._height}px`;
    const context = element.getContext("2d");
    context.resetTransform();
    context.scale(dpi, dpi);
    this.dispatchEvent(
      new HighDPICanvasElementResizeEvent("resize", {
        width: this._width,
        height: this._height
      })
    );
  }
  toBlob() {
    return this.element.toBlob(...arguments);
  }
  toDataURL() {
    return this.element.toDataURL(...arguments);
  }
  transferControlToOffscreen() {
    return this.element.transferControlToOffscreen(...arguments);
  }
};
function createHighDPICanvas(width, height) {
  width = Math.floor(width);
  height = Math.floor(height);
  const canvas = document.createElement(HighDPICanvasElement.tagName);
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
if (typeof window !== "undefined") {
  window.createHighDPICanvas = createHighDPICanvas;
  window.HighDPICanvasElement = HighDPICanvasElement;
  window.customElements.define(
    HighDPICanvasElement.tagName,
    HighDPICanvasElement
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HighDPICanvasElement,
  createHighDPICanvas
});
