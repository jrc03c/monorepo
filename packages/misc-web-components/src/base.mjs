import { camelify } from "@jrc03c/js-text-tools"

class BaseComponent extends HTMLElement {
  static css = ``
  static observedAttributes = []
  static template = ``

  eventListeners = []

  constructor() {
    super(...arguments)

    const shadow = this.attachShadow({ mode: "open" })

    shadow.innerHTML = `
      <style>
        ${this.constructor.css}
      </style>

      ${this.constructor.template}
    `

    this.eventListeners = []

    this.constructor.observedAttributes.forEach(attr => {
      Object.defineProperty(this, camelify(attr), {
        configurable: true,
        enumerable: true,

        get: () => {
          return this.getAttribute(attr)
        },

        set: value => {
          console.warn(
            `You directly set the value of the "${attr}" attribute on a(n) ${this.constructor.name} element! While this isn't strictly prohibited, it's much better to follow the design principle of "attributes go down, events go up" by emitting an event indicating that you'd prefer to change the attribute value rather than changing it directly.`,
          )

          this.setAttribute(attr, value)
        },
      })
    })
  }

  attributeChangedCallback() {}

  connectedCallback() {}

  disconnectedCallback() {
    this.eventListeners.forEach(listener => {
      try {
        listener.remove()
      } catch (e) {}
    })
  }

  getAttribute() {
    const value = super.getAttribute(...arguments)

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  off(target, event, callback) {
    target.removeEventListener(event, callback)
  }

  on(target, event, callback) {
    target.addEventListener(event, callback)
    const remove = () => target.removeEventListener(event, callback)

    const listener = {
      target,
      event,
      callback,
      remove,
    }

    this.eventListeners.push(listener)
    return remove
  }
}

export { BaseComponent }
