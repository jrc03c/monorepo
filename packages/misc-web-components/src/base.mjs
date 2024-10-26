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
