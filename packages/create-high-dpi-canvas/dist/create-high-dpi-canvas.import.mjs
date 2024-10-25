// src/index.mjs
var HighDPICanvasElementResizeEvent = class extends Event {
  constructor(width, height, options) {
    super("resize", options);
    this.width = width;
    this.height = height;
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
  constructor(width, height) {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        ${this.constructor.css}
      </style>

      ${this.constructor.template}
    `;
    this.dimensions = [width, height];
    this.onOuterResize(false);
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
    this.eventListeners = [];
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
    let first = true;
    this.resizeObserver = new ResizeObserver(() => {
      if (first) {
        first = false;
        return;
      }
      const { width, height } = this.getBoundingClientRect();
      this._width = width;
      this._height = height;
      this.onOuterResize();
    });
    this.resizeObserver.observe(this);
  }
  disconnectedCallback() {
    this.eventListeners.forEach((listener) => {
      try {
        listener.remove();
      } catch (e) {
      }
    });
  }
  getContext() {
    return this.element.getContext(...arguments);
  }
  off(target, event, callback) {
    const listeners = this.eventListeners.filter(
      (listener) => listener.target === target && listener.event === event && listener.callback === callback
    );
    if (listeners.length > 0) {
      listeners.forEach((listener) => listener.remove());
    } else {
      target.removeEventListener(event, callback);
    }
  }
  on(target, event, callback, shouldRecordEventListenerInfo) {
    let listener;
    const remove = () => {
      target.removeEventListener(event, callback);
      const index = this.eventListeners.indexOf(listener);
      if (index > -1) {
        this.eventListeners.splice(index, 1);
      }
    };
    if (shouldRecordEventListenerInfo || typeof shouldRecordEventListenerInfo === "undefined") {
      listener = {
        callback,
        event,
        remove,
        target
      };
      this.eventListeners.push(listener);
    }
    target.addEventListener(event, callback);
    return remove;
  }
  onOuterResize(shouldEmitEvent) {
    const { element } = this;
    const dpi = window.devicePixelRatio || 1;
    element.width = Math.floor(this._width * dpi);
    element.height = Math.floor(this._height * dpi);
    element.style.width = `${this._width}px`;
    element.style.height = `${this._height}px`;
    const context = element.getContext("2d");
    context.resetTransform();
    context.scale(dpi, dpi);
    if (shouldEmitEvent || typeof shouldEmitEvent === "undefined") {
      this.dispatchEvent(
        new HighDPICanvasElementResizeEvent(this._width, this._height)
      );
    }
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
  return new HighDPICanvasElement(width, height);
}
if (typeof window !== "undefined") {
  window.createHighDPICanvas = createHighDPICanvas;
  window.HighDPICanvasElement = HighDPICanvasElement;
  window.customElements.define(
    HighDPICanvasElement.tagName,
    HighDPICanvasElement
  );
}
export {
  HighDPICanvasElement,
  createHighDPICanvas
};
