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
  getAttribute() {
    const value = super.getAttribute(...arguments);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
};

// src/draggable.mjs
var css = (
  /* css */
  `
  .x-draggable {
    position: absolute;
    left: 0;
    top: 0;
    cursor: grab;
  }

  .x-draggable:active {
    cursor: grabbing;
  }

  .x-draggable:active,
  .x-draggable:active * {
    user-select: none;
  }

  .x-draggable.is-h-locked.is-v-locked {
    cursor: unset !important;
  }
`
);
var template = (
  /* html */
  `
  <div class="x-draggable">
    <slot></slot>
  </div>
`
);
var DraggableEvent = class extends Event {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
};
var DraggableDragStartEvent = class extends DraggableEvent {
  constructor(rect, options) {
    super("drag-start", options);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
};
var DraggableDragEvent = class extends DraggableEvent {
  constructor(rect, options) {
    super("drag", options);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
};
var DraggableDragEndEvent = class extends DraggableEvent {
  constructor(rect, options) {
    super("drag-end", options);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
};
var DraggableComponent = class extends BaseComponent {
  static $css = css;
  static $template = template;
  static observedAttributes = BaseComponent.observedAttributes.concat([
    "is-h-locked",
    "is-v-locked",
    "x",
    "y"
  ]);
  $isBeingDragged = false;
  $mouse = { x: 0, y: 0 };
  $x_ = 0;
  $y_ = 0;
  get $isHLocked() {
    return this.getAttribute("is-h-locked");
  }
  get $isVLocked() {
    return this.getAttribute("is-v-locked");
  }
  get $root() {
    return this.shadowRoot.querySelector(".x-draggable");
  }
  $onMouseDown(event) {
    const isHLocked = this.$isHLocked;
    const isVLocked = this.$isVLocked;
    if (isHLocked && isVLocked) {
      return;
    }
    if (!isHLocked) {
      this.$mouse.x = event.screenX;
    }
    if (!isVLocked) {
      this.$mouse.y = event.screenY;
    }
    this.$isBeingDragged = true;
    this.dispatchEvent(
      new DraggableDragStartEvent(this.$root.getBoundingClientRect())
    );
  }
  $onMouseMove(event) {
    const isHLocked = this.$isHLocked;
    const isVLocked = this.$isVLocked;
    if (isHLocked && isVLocked) {
      return;
    }
    if (this.$isBeingDragged) {
      const dx = event.screenX - this.$mouse.x;
      const dy = event.screenY - this.$mouse.y;
      if (!isHLocked) {
        this.$x_ += dx;
        this.$mouse.x = event.screenX;
      }
      if (!isVLocked) {
        this.$y_ += dy;
        this.$mouse.y = event.screenY;
      }
      this.$updateComputedStyle();
      this.dispatchEvent(
        new DraggableDragEvent(this.$root.getBoundingClientRect())
      );
    }
  }
  $onMouseUp() {
    const isHLocked = this.$isHLocked;
    const isVLocked = this.$isVLocked;
    if (isHLocked && isVLocked) {
      return;
    }
    const wasBeingDragged = this.$isBeingDragged;
    this.$isBeingDragged = false;
    if (wasBeingDragged) {
      this.dispatchEvent(
        new DraggableDragEndEvent(this.$root.getBoundingClientRect())
      );
    }
  }
  $updateComputedStyle(shouldForceUpdate) {
    if (shouldForceUpdate || !this.$isHLocked) {
      this.$root.style.left = this.$x_ + "px";
    }
    if (shouldForceUpdate || !this.$isVLocked) {
      this.$root.style.top = this.$y_ + "px";
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "is-h-locked") {
      if (newValue) {
        this.$root.classList.add("is-h-locked");
      } else {
        this.$root.classList.remove("is-h-locked");
      }
    }
    if (name === "is-v-locked") {
      if (newValue) {
        this.$root.classList.add("is-v-locked");
      } else {
        this.$root.classList.remove("is-v-locked");
      }
    }
    if (name === "x") {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
      }
      this.$x_ = newValue;
      this.$updateComputedStyle();
    }
    if (name === "y") {
      try {
        newValue = JSON.parse(newValue);
      } catch (e) {
      }
      this.$y_ = newValue;
      this.$updateComputedStyle();
    }
  }
  connectedCallback() {
    const interval = setInterval(() => {
      const root = this.$root;
      if (!root) {
        return;
      }
      clearInterval(interval);
      this.$on(root, "mousedown", this.$onMouseDown.bind(this));
      this.$on(window, "mousemove", this.$onMouseMove.bind(this));
      this.$on(window, "mouseup", this.$onMouseUp.bind(this));
      this.$x_ = this.getAttribute("x");
      this.$y_ = this.getAttribute("y");
      this.$updateComputedStyle(true);
    }, 10);
    return super.connectedCallback(...arguments);
  }
};
customElements.define("x-draggable", DraggableComponent);

// src/index.mjs
if (typeof window !== "undefined") {
  window.MiscVueComponents = {
    BaseComponent,
    // ContextMenuComponent,
    DraggableComponent
    // FrameComponent,
    // MenuComponent,
    // ResizeableComponent,
  };
}
export {
  BaseComponent,
  DraggableComponent
};
