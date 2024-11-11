import { camelify } from "@jrc03c/js-text-tools"
import { set, sort } from "@jrc03c/js-math-tools"

class BaseComponent extends HTMLElement {
  static css = ``
  static observedAttributes = []

  static template = /* html */ `
    <div class="x-base">
      <slot></slot>
    </div>
  `

  eventListeners = []

  constructor(options) {
    super()
    options = options || {}

    sort(set(this.constructor.observedAttributes)).forEach(attr => {
      Object.defineProperty(this, camelify(attr), {
        configurable: true,
        enumerable: true,

        get() {
          return this.getAttribute(attr)
        },

        set(value) {
          this.setAttribute(attr, value)
        },
      })
    })

    const temp = document.createElement("template")

    temp.innerHTML = `
      <style>${this.constructor.css + (options.css || "")}</style>
      ${this.constructor.template}
    `

    const deep = true
    const clone = document.importNode(temp.content, deep)
    const shadow = this.attachShadow({ mode: "open" })
    shadow.appendChild(clone)

    if (options.el) {
      const el =
        typeof options.el === "string"
          ? document.querySelector(options.el)
          : options.el

      el.appendChild(this)
    }
  }

  attributeChangedCallback() {
    // ...
  }

  connectedCallback() {
    if (!this.isMounted) {
      this.mount(this.parentElement)
    }
  }

  disconnectedCallback() {
    if (this.isMounted) {
      this.unmount()
    }
  }

  getAttribute(attr) {
    const out = super.getAttribute(attr)

    try {
      return JSON.parse(out)
    } catch (e) {
      return out
    }
  }

  mount(el) {
    if (this.isMounted) return

    if (!el) {
      throw new Error(
        "You must pass an element or a selector into the `BaseComponent.mount` method!",
      )
    }

    el = typeof el === "string" ? document.querySelector(el) : el

    if (!Array.from(el.children).includes(this)) {
      el.appendChild(this)
    }

    window.requestAnimationFrame(() => this.dispatchEvent(new Event("mount")))
    window.requestAnimationFrame(() => this.onMounted())
    this.isMounted = true
  }

  off(target, event, callback) {
    const listener = this.eventListeners.find(
      listener =>
        listener.target === target &&
        listener.event === event &&
        listener.callback === callback,
    )

    if (listener) {
      listener.remove()
    } else {
      target.removeEventListener(event, callback)
    }
  }

  on(target, event, callback) {
    const remove = () => target.removeEventListener(event, callback)

    const listener = {
      callback,
      event,
      remove,
      target,
    }

    target.addEventListener(event, callback)
    this.eventListeners.push(listener)
    return remove
  }

  onMounted() {
    // ...
  }

  onUnmounted() {
    // ...
  }

  setAttribute(attr, value) {
    if (typeof value !== "string") {
      value = JSON.stringify(value)
    }

    super.setAttribute(attr, value)
  }

  unmount() {
    if (!this.isMounted) return

    if (this.parentElement) {
      try {
        this.parentElement.removeChild(this)
      } catch (e) {}
    }

    this.eventListeners.forEach(listener => {
      try {
        listener.remove()
      } catch (e) {}
    })

    this.eventListeners = []

    window.requestAnimationFrame(() => this.dispatchEvent(new Event("unmount")))
    window.requestAnimationFrame(() => this.onUnmounted())
    this.isMounted = false
  }
}

if (typeof window !== "undefined") {
  window.BaseComponent = BaseComponent

  if (!window.customElements.get("x-base")) {
    window.customElements.define("x-base", BaseComponent)
  }
}

export { BaseComponent }
