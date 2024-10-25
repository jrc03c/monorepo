// src/base.mjs
var BaseComponent = class extends HTMLElement {
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
    BaseComponent
    // ContextMenuComponent,
    // DraggableComponent,
    // FrameComponent,
    // MenuComponent,
    // ResizeableComponent,
  };
}
export {
  BaseComponent
};
