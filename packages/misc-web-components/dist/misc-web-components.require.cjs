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
  BaseWebComponent: () => BaseWebComponent
});
module.exports = __toCommonJS(src_exports);

// src/base.mjs
var BaseWebComponent = class extends HTMLElement {
  static $css = ``;
  static $template = ``;
  static observedAttributes = [];
  $eventListeners = [];
  constructor() {
    super(...arguments);
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        ${this.constructor.$css}
      </style>

      ${this.constructor.$template}
    `;
    this.$eventListeners = [];
  }
  $off(target, event, callback) {
    target.removeEventListener(event, callback);
  }
  $on(target, event, callback) {
    target.addEventListener(event, callback);
    const remove = () => target.removeEventListener(event, callback);
    const listener = {
      target,
      event,
      callback,
      remove
    };
    this.$eventListeners.push(listener);
    return remove;
  }
  attributeChangedCallback() {
  }
  connectedCallback() {
  }
  disconnectedCallback() {
    this.$eventListeners.forEach((listener) => {
      try {
        listener.remove();
      } catch (e) {
      }
    });
  }
};

// src/index.mjs
if (typeof window !== "undefined") {
  window.MiscVueComponents = {
    BaseWebComponent
    // ContextMenuComponent,
    // DraggableComponent,
    // FrameComponent,
    // MenuComponent,
    // ResizeableComponent,
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseWebComponent
});
