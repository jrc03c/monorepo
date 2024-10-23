class HighDPICanvasElementResizeEvent extends Event {
  constructor(name, options) {
    super(name, options)
    options = options || {}
    this.height = options.height
    this.width = options.width
  }
}

class HighDPICanvasElement extends HTMLElement {
  static css = /* css */ `
    canvas {
      width: 100%;
      height: 100%;
    }
  `

  static forwardedEvents = [
    "contextlost",
    "contextrestored",
    "webglcontextcreationerror",
    "webglcontextlost",
    "webglcontextrestored",
  ]

  static observedAttributes = ["height", "width"]
  static tagName = "high-dpi-canvas"

  static template = /* html */ `
    <canvas></canvas>
  `

  constructor() {
    super(...arguments)

    const shadow = this.attachShadow({ mode: "open" })

    shadow.innerHTML = `
      <style>
        ${this.constructor.css}
      </style>

      ${this.constructor.template}
    `
  }

  get height() {
    return this.shadowRoot.querySelector("canvas").height
  }

  set height(value) {
    const dpi = window.devicePixelRatio || 1
    const canvas = this.shadowRoot.querySelector("canvas")
    canvas.height = Math.floor(value * dpi)
    this.onResizeCallback()
  }

  get width() {
    return this.shadowRoot.querySelector("canvas").width
  }

  set width(value) {
    const dpi = window.devicePixelRatio || 1
    const canvas = this.shadowRoot.querySelector("canvas")
    canvas.width = Math.floor(value * dpi)
    this.onResizeCallback()
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "height") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.height = newValue
    }

    if (name === "width") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.width = newValue
    }
  }

  captureStream() {
    return this.shadowRoot.querySelector("canvas").captureStream(...arguments)
  }

  connectedCallback() {
    this.eventListenerRemovers = []

    this.constructor.forwardedEvents.forEach(eventName => {
      this.on(this.shadowRoot.querySelector("canvas"), eventName, event => {
        this.dispatchEvent(
          new Event(eventName, {
            bubbles: true,
            composed: true,
            detail: { ...event.detail },
          }),
        )
      })
    })
  }

  disconnectedCallback() {
    this.eventListenerRemovers.forEach(remover => {
      try {
        remover.remove()
      } catch (e) {}
    })
  }

  getContext() {
    return this.shadowRoot.querySelector("canvas").getContext(...arguments)
  }

  off(object, event, callback) {
    const removers = this.eventListenerRemovers.filter(
      remover =>
        remover.object === object &&
        remover.event === event &&
        remover.callback === callback,
    )

    if (removers.length > 0) {
      removers.forEach(remover => remover.remove())
    } else {
      object.removeEventListener(event, callback)
    }
  }

  on(object, event, callback) {
    const remove = () => {
      object.removeEventListener(event, callback)
      const index = this.eventListenerRemovers.indexOf(remover)

      if (index > -1) {
        this.eventListenerRemovers.splice(index, 1)
      }
    }

    const remover = {
      object,
      event,
      callback,
      remove,
    }

    this.eventListenerRemovers.push(remover)
    return remove
  }

  onResizeCallback() {
    const canvas = this.shadowRoot.querySelector("canvas")
    const dpi = window.devicePixelRatio || 1
    canvas.style.width = `${Math.round(canvas.width / dpi)}px`
    canvas.style.height = `${Math.round(canvas.height / dpi)}px`

    const context = canvas.getContext("2d")
    context.resetTransform()
    context.scale(dpi, dpi)

    this.dispatchEvent(
      new HighDPICanvasElementResizeEvent("resize", {
        width: canvas.width,
        height: canvas.height,
      }),
    )
  }

  toBlob() {
    return this.shadowRoot.querySelector("canvas").toBlob(...arguments)
  }

  toDataURL() {
    return this.shadowRoot.querySelector("canvas").toDataURL(...arguments)
  }

  transferControlToOffscreen() {
    return this.shadowRoot
      .querySelector("canvas")
      .transferControlToOffscreen(...arguments)
  }
}

function createHighDPICanvas(width, height) {
  width = Math.floor(width)
  height = Math.floor(height)

  const canvas = document.createElement(HighDPICanvasElement.tagName)
  canvas.width = width
  canvas.height = height

  return canvas
}

if (typeof window !== "undefined") {
  window.createHighDPICanvas = createHighDPICanvas
  window.HighDPICanvasElement = HighDPICanvasElement

  window.customElements.define(
    HighDPICanvasElement.tagName,
    HighDPICanvasElement,
  )
}

export { createHighDPICanvas }
