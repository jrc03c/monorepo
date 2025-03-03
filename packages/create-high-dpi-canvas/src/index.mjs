// NOTE: Many of the methods implemented below (e.g., `captureStream`,
// `toBlob`, etc.) are required as part of the HTMLCanvasElement interface but
// don't actually provide any novel functionality.

import { BaseComponent } from "@jrc03c/base-web-component"

class HighDPICanvasElementResizeEvent extends Event {
  constructor(width, height, options) {
    super("resize", options)
    this.width = width
    this.height = height
  }
}

class HighDPICanvasElement extends BaseComponent {
  static css =
    BaseComponent.css +
    `
      canvas {
        margin: 0;
        padding: 0;
        border: 0;
      }
    `

  static forwardedEvents = [
    "contextlost",
    "contextrestored",
    "webglcontextcreationerror",
    "webglcontextlost",
    "webglcontextrestored",
  ]

  static observedAttributes = BaseComponent.observedAttributes.concat([
    "height",
    "width",
  ])

  static tagName = "high-dpi-canvas"
  static template = "<canvas></canvas>"

  // NOTE: CONSTRUCTORS CAN'T BE USED WITH WEB COMPONENTS! Or, at the very
  // least, they're stupid and complicated, and I can't figure out when and why
  // they work or don't work. So, for now, they SHOULD NOT BE USED! Instead,
  // create new high-DPI canvases using `document.createElement` (*after* this
  // component has been registered as a custom element, of course). Finally,
  // anything you'd normally do in the constructor should be done in the
  // `connectedCallback` method instead.
  //
  // constructor(width, height) {
  //   super()
  //   this.dimensions = [width, height]
  //   this.onOuterResize(false)
  // }

  isMounted = false

  get dimensions() {
    return [this.width, this.height]
  }

  set dimensions(value) {
    this.width = value[0]
    this.height = value[1]
  }

  get element() {
    return this.shadowRoot.querySelector("canvas")
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const out = super.attributeChangedCallback(...arguments)

    if (name === "height") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.style.height = `${newValue}px`
    }

    if (name === "width") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.style.width = `${newValue}px`
    }

    // NOTE: When the element isn't mounted, the resize observer doesn't work
    // as expected: instead of reporting *all* resize events, it merely reports
    // a single, initial resize event — and then stops reporting any further
    // resize events. Since the `onOuterResize` method is usually called as part
    // of the resize observer's callback function, the `onOuterResize` method
    // isn't called often enough (i.e., it's only called once) when the element
    // isn't mounted. Therefore, when it's not mounted, we must call the method
    // manually if we want the unmounted element to resize the same way as a
    // mounted element. This is especially important when, for example, we draw
    // to an offscreen canvas with the intent of then drawing the offscreen
    // canvas onto an onscreen canvas. If the offscreen (unmounted) canvas
    // changes size but does *not* call the `onOuterResize` method, then it
    // becomes stretched and blurry when drawn to the onscreen canvas. Also, we
    // also want to emit "resize" events so that any event listeners can be
    // notified; and that can only happen if we call the `onOuterResize` method.
    if (!this.isMounted) {
      this.onOuterResize(true)
    }

    return out
  }

  captureStream() {
    return this.element.captureStream(...arguments)
  }

  connectedCallback() {
    const out = super.connectedCallback(...arguments)

    this.style.overflow = "hidden"
    this.style.display = "flex"
    this.style.flexDirection = "row"
    this.style.flexWrap = "nowrap"
    this.style.justifyContent = "center"
    this.style.alignContent = "center"
    this.style.alignItems = "center"

    const { element } = this
    this.eventListeners = []

    this.constructor.forwardedEvents.forEach(eventName => {
      this.on(element, eventName, event => {
        this.dispatchEvent(
          new Event(eventName, {
            bubbles: true,
            composed: true,
            detail: { ...event.detail },
          }),
        )
      })
    })

    // Ignore the very first resize event because (I think) it's emitted
    // immediately after the observer is added, even if the size hasn't changed.
    let first = true

    this.resizeObserver = new ResizeObserver(() => {
      if (first) {
        first = false
        return
      }

      const { width, height } = this.getBoundingClientRect()
      this.width = width
      this.height = height
      this.onOuterResize(true)
    })

    this.onOuterResize(false)
    this.resizeObserver.observe(this)

    this.isMounted = true
    return out
  }

  disconnectedCallback() {
    const out = super.disconnectedCallback(...arguments)

    this.eventListeners.forEach(listener => {
      try {
        listener.remove()
      } catch (e) {}
    })

    this.isMounted = false
    return out
  }

  getContext() {
    return this.element.getContext(...arguments)
  }

  onOuterResize(shouldEmitEvent) {
    const { element } = this
    const dpi = window.devicePixelRatio || 1
    element.width = Math.floor(this.width * dpi)
    element.height = Math.floor(this.height * dpi)
    element.style.width = `${this.width}px`
    element.style.height = `${this.height}px`

    const context = element.getContext("2d")
    context.resetTransform()
    context.scale(dpi, dpi)

    if (shouldEmitEvent || typeof shouldEmitEvent === "undefined") {
      this.dispatchEvent(
        new HighDPICanvasElementResizeEvent(this.width, this.height),
      )
    }
  }

  toBlob() {
    return this.element.toBlob(...arguments)
  }

  toDataURL() {
    return this.element.toDataURL(...arguments)
  }

  transferControlToOffscreen() {
    return this.element.transferControlToOffscreen(...arguments)
  }
}

function createHighDPICanvas(width, height) {
  const canvas = document.createElement(HighDPICanvasElement.tagName)
  canvas.dimensions = [width, height]
  return canvas
}

try {
  if (
    globalThis.customElements &&
    !globalThis.customElements.get(HighDPICanvasElement.tagName)
  ) {
    globalThis.customElements.define(
      HighDPICanvasElement.tagName,
      HighDPICanvasElement,
    )
  }
} catch (e) {}

export { createHighDPICanvas, HighDPICanvasElement }
