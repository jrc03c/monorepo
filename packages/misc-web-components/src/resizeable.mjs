// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  /*
    .no-pointer-events,
    .no-pointer-events * {
      pointer-events: none;
    }
  */

  .ew-resize {
    cursor: ew-resize !important;
  }
  
  .ns-resize {
    cursor: ns-resize !important;
  }

  .nwse-resize {
    cursor: nwse-resize !important;
  }
  
  .nesw-resize {
    cursor: nesw-resize !important;
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ ``

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { DraggableComponent } from "./draggable.mjs"

class ResizeableEvent extends Event {
  x = 0
  y = 0
  width = 0
  height = 0

  constructor(name, rect, options) {
    super(name, options)
    this.x = rect.x
    this.y = rect.y
    this.width = rect.width
    this.height = rect.height
  }
}

class ResizeableResizeStartEvent extends ResizeableEvent {
  constructor(rect, options) {
    super("resize-start", rect, options)
  }
}

class ResizeableResizeEvent extends ResizeableEvent {
  constructor(rect, options) {
    super("resize", rect, options)
  }
}

class ResizeableResizeEndEvent extends ResizeableEvent {
  constructor(rect, options) {
    super("resize-end", rect, options)
  }
}

class ResizeableComponent extends DraggableComponent {
  static css = DraggableComponent.css + css

  static observedAttributes = DraggableComponent.observedAttributes.concat([
    "height",
    "is-drag-h-locked",
    "is-drag-v-locked",
    "is-resize-bottom-locked",
    "is-resize-left-locked",
    "is-resize-right-locked",
    "is-resize-top-locked",
    "min-height",
    "min-width",
    "width",
    "x",
    "y",
  ])

  static template = DraggableComponent.template + template

  _height = 0
  _width = 0
  _x = 0
  _y = 0
  anchoredLeftRightBorder = null
  anchoredTopBottomBorder = null
  borderWidth = 10
  isBeingResizedHorizontally = false
  isBeingResizedVertically = false
  isHoveringOverBottomBorder = false
  isHoveringOverLeftBorder = false
  isHoveringOverRightBorder = false
  isHoveringOverTopBorder = false
  mouse = { x: 0, y: 0 }
  shouldPreventInternalPointerEvents = false
  shouldScaleProportionally = false

  constructor() {
    super(...arguments)
    this.shadowRoot.querySelector(".x-draggable").classList.add("x-resizeable")
  }

  get isCompletelyLocked() {
    return (
      this.isResizeLeftLocked &&
      this.isResizeRightLocked &&
      this.isResizeTopLocked &&
      this.isResizeBottomLocked
    )
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    try {
      newValue = JSON.parse(newValue)
    } catch (e) {}

    if (name === "width") {
      this._width = newValue
      await this.updateComputedStyle()
    }

    if (name === "height") {
      this._height = newValue
      await this.updateComputedStyle()
    }

    if (name === "is-drag-h-locked") {
      this.setAttribute("is-h-locked", newValue)
    }

    if (name === "is-drag-v-locked") {
      this.setAttribute("is-v-locked", newValue)
    }

    return await super.attributeChangedCallback(name, oldValue, newValue)
  }

  async connectedCallback() {
    if (typeof this.isDragHLocked === "undefined") {
      this.isDragHLocked = false
    }

    if (typeof this.isDragVLocked === "undefined") {
      this.isDragVLocked = false
    }

    this._x = this.x
    this._y = this.y
    this._width = this.width
    this._height = this.height
    this.updateComputedStyle()

    this.on(window, "keydown", this.onKeyDown.bind(this))
    this.on(window, "keyup", this.onKeyUp.bind(this))

    setTimeout(() => {
      if (!this.width || !this.height) {
        const { width, height } = this.root.getBoundingClientRect()
        const style = getComputedStyle(this.root)

        const paddingLeft = parseFloat(style.getPropertyValue("padding-left"))
        const paddingRight = parseFloat(style.getPropertyValue("padding-right"))
        const paddingTop = parseFloat(style.getPropertyValue("padding-top"))

        const paddingBottom = parseFloat(
          style.getPropertyValue("padding-bottom"),
        )

        const borderLeft = parseFloat(
          style.getPropertyValue("border-left").split("px")[0],
        )

        const borderRight = parseFloat(
          style.getPropertyValue("border-right").split("px")[0],
        )

        const borderTop = parseFloat(
          style.getPropertyValue("border-top").split("px")[0],
        )

        const borderBottom = parseFloat(
          style.getPropertyValue("border-bottom").split("px")[0],
        )

        this._width =
          width - paddingLeft - paddingRight - borderLeft - borderRight

        this._height =
          height - paddingTop - paddingBottom - borderTop - borderBottom

        this.updateComputedStyle()
      }
    }, 100)

    return await super.connectedCallback()
  }

  async onKeyDown(event) {
    if (this.isCompletelyLocked) {
      return
    }

    if (event.key === "Shift") {
      this.shouldScaleProportionally = true
    }
  }

  async onKeyUp(event) {
    if (this.isCompletelyLocked) {
      return
    }

    if (event.key === "Shift") {
      this.shouldScaleProportionally = false
    }
  }

  async onMouseDown(event) {
    if (this.isCompletelyLocked) {
      return
    }

    let shouldCancelEvent = false

    if (this.isHoveringOverLeftBorder && !this.isResizeLeftLocked) {
      this.isBeingResizedHorizontally = true
      this.anchoredLeftRightBorder = "right"
      shouldCancelEvent = true
    }

    if (this.isHoveringOverRightBorder && !this.isResizeRightLocked) {
      this.isBeingResizedHorizontally = true
      this.anchoredLeftRightBorder = "left"
      shouldCancelEvent = true
    }

    if (this.isHoveringOverTopBorder && !this.isResizeTopLocked) {
      this.isBeingResizedVertically = true
      this.anchoredTopBottomBorder = "bottom"
      shouldCancelEvent = true
    }

    if (this.isHoveringOverBottomBorder && !this.isResizeBottomLocked) {
      this.isBeingResizedVertically = true
      this.anchoredTopBottomBorder = "top"
      shouldCancelEvent = true
    }

    if (shouldCancelEvent) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (this.isBeingResizedHorizontally || this.isBeingResizedVertically) {
      this.dispatchEvent(
        new ResizeableResizeStartEvent(this.root.getBoundingClientRect()),
      )
    } else {
      await super.onMouseDown(event)
    }
  }

  async onMouseMove(event) {
    if (this.isCompletelyLocked) {
      return
    }

    if (this.isBeingResizedHorizontally || this.isBeingResizedVertically) {
      const aspect = this._width / this._height
      let mx = event.movementX
      let my = event.movementY

      if (
        this.shouldScaleProportionally &&
        this.isBeingResizedHorizontally &&
        this.isBeingResizedVertically
      ) {
        const isPrimarilyHorizontal = Math.abs(mx) > Math.abs(my)

        if (this.anchoredLeftRightBorder === "left") {
          if (this.anchoredTopBottomBorder === "top") {
            if (isPrimarilyHorizontal) {
              this._width += mx
              this._height = this._width / aspect
            } else {
              this._height += my
              this._width = this._height * aspect
            }

            if (this._width < this.minWidth) {
              this._width = this.minWidth
              this._height = this._width / aspect
            }

            if (this._height < this.minHeight) {
              this._height = this.minHeight
              this._width = this._height * aspect
            }
          } else {
            if (isPrimarilyHorizontal) {
              this._width += mx
              this._height = this._width / aspect
              this._y -= mx / aspect
            } else {
              this._height -= my
              this._y += my
              this._width = this._height * aspect
            }

            if (this._width < this.minWidth) {
              const dx = this.minWidth - this._width
              this._width = this.minWidth
              this._height = this._width / aspect
              this._y -= dx / aspect
            }

            if (this._height < this.minHeight) {
              const dy = this.minHeight - this._height
              this._height = this.minHeight
              this._y -= dy
              this._width = this._height * aspect
            }
          }
        } else {
          if (this.anchoredTopBottomBorder === "top") {
            if (isPrimarilyHorizontal) {
              this._width -= mx
              this._x += mx
              this._height = this._width / aspect
            } else {
              this._height += my
              this._width = this._height * aspect
              this._x -= my * aspect
            }

            if (this._width < this.minWidth) {
              const dx = this.minWidth - this._width
              this._width = this.minWidth
              this._x -= dx
              this._height = this._width / aspect
            }

            if (this._height < this.minHeight) {
              const dy = this.minHeight - this._height
              this._height = this.minHeight
              this._width = this._height * aspect
              this._x -= dy * aspect
            }
          } else {
            if (isPrimarilyHorizontal) {
              this._width -= mx
              this._x += mx
              this._height = this._width / aspect
              this._y += mx / aspect
            } else {
              this._height -= my
              this._y += my
              this._width = this._height * aspect
              this._x += my * aspect
            }

            if (this._width < this.minWidth) {
              const dx = this.minWidth - this._width
              this._width = this.minWidth
              this._x -= dx
              this._height = this._width / aspect
              this._y -= dx / aspect
            }

            if (this._height < this.minHeight) {
              const dy = this.minHeight - this._height
              this._height = this.minHeight
              this._y -= dy
              this._width = this._height * aspect
              this._x -= dy * aspect
            }
          }
        }
      } else {
        if (this.isBeingResizedHorizontally) {
          if (this.anchoredLeftRightBorder === "left") {
            this._width += mx
            this._width = Math.max(this._width, this.minWidth)
          } else {
            this._width -= mx
            this._x += mx

            if (this._width < this.minWidth) {
              const dx = this.minWidth - this._width
              this._width += dx
              this._x -= dx
            }
          }
        }

        if (this.isBeingResizedVertically) {
          if (this.anchoredTopBottomBorder === "top") {
            this._height += my
            this._height = Math.max(this._height, this.minHeight)
          } else {
            this._height -= my
            this._y += my

            if (this._height < this.minHeight) {
              const dy = this.minHeight - this._height
              this._height += dy
              this._y -= dy
            }
          }
        }
      }

      await this.updateComputedStyle()
      event.preventDefault()
      event.stopPropagation()

      this.dispatchEvent(
        new ResizeableResizeEvent(this.root.getBoundingClientRect()),
      )
    } else {
      this.isHoveringOverLeftBorder = false
      this.isHoveringOverRightBorder = false
      this.isHoveringOverTopBorder = false
      this.isHoveringOverBottomBorder = false
      this.shouldPreventInternalPointerEvents = false
      // this.root.classList.remove("no-pointer-events")

      const rect = this.root.getBoundingClientRect()
      const left = rect.x
      const right = rect.x + rect.width
      const top = rect.y
      const bottom = rect.y + rect.height
      let shouldCancelEvent = false

      if (
        Math.abs(event.clientX - left) < this.borderWidth &&
        event.clientY >= top - this.borderWidth &&
        event.clientY <= bottom + this.borderWidth
      ) {
        this.isHoveringOverLeftBorder = true
        this.shouldPreventInternalPointerEvents = true
        // this.root.classList.add("no-pointer-events")
        shouldCancelEvent = true
      }

      if (
        Math.abs(event.clientX - right) < this.borderWidth &&
        event.clientY >= top - this.borderWidth &&
        event.clientY <= bottom + this.borderWidth
      ) {
        this.isHoveringOverRightBorder = true
        this.shouldPreventInternalPointerEvents = true
        // this.root.classList.add("no-pointer-events")
        shouldCancelEvent = true
      }

      if (
        Math.abs(event.clientY - top) < this.borderWidth &&
        event.clientX >= left - this.borderWidth &&
        event.clientX <= right + this.borderWidth
      ) {
        this.isHoveringOverTopBorder = true
        this.shouldPreventInternalPointerEvents = true
        // this.root.classList.add("no-pointer-events")
        shouldCancelEvent = true
      }

      if (
        Math.abs(event.clientY - bottom) < this.borderWidth &&
        event.clientX >= left - this.borderWidth &&
        event.clientX <= right + this.borderWidth
      ) {
        this.isHoveringOverBottomBorder = true
        this.shouldPreventInternalPointerEvents = true
        // this.root.classList.add("no-pointer-events")
        shouldCancelEvent = true
      }

      if (shouldCancelEvent) {
        event.preventDefault()
        event.stopPropagation()
      }

      await this.updateComputedStyle()
      await super.onMouseMove(event)
    }
  }

  async onMouseUp(event) {
    if (this.isCompletelyLocked) {
      return
    }

    const wasBeingResized =
      this.isBeingResizedHorizontally || this.isBeingResizedVertically

    this.isBeingResizedHorizontally = false
    this.isBeingResizedVertically = false
    this.isHoveringOverBorder = false

    if (wasBeingResized) {
      this.dispatchEvent(
        new ResizeableResizeEndEvent(this.root.getBoundingClientRect()),
      )
    } else {
      await super.onMouseUp(event)
    }
  }

  async updateComputedStyle() {
    const shouldResizeLeft =
      this.isHoveringOverLeftBorder && !this.isResizeLeftLocked

    const shouldResizeRight =
      this.isHoveringOverRightBorder && !this.isResizeRightLocked

    const shouldResizeTop =
      this.isHoveringOverTopBorder && !this.isResizeTopLocked

    const shouldResizeBottom =
      this.isHoveringOverBottomBorder && !this.isResizeBottomLocked

    const resizeClasses = ["ew", "ns", "nwse", "nesw"]

    resizeClasses.forEach(c => {
      this.root.classList.remove(c + "-resize")
    })

    if (shouldResizeLeft || shouldResizeRight) {
      this.root.classList.add("ew-resize")
    }

    if (shouldResizeTop || shouldResizeBottom) {
      this.root.classList.add("ns-resize")
    }

    if (shouldResizeLeft && shouldResizeTop) {
      this.root.classList.add("nwse-resize")
    }

    if (shouldResizeLeft && shouldResizeBottom) {
      this.root.classList.add("nesw-resize")
    }

    if (shouldResizeRight && shouldResizeTop) {
      this.root.classList.add("nesw-resize")
    }

    if (shouldResizeRight && shouldResizeBottom) {
      this.root.classList.add("nwse-resize")
    }

    this.root.style.width = this._width + "px"
    this.root.style.minWidth = this._width + "px"
    this.root.style.maxWidth = this._width + "px"
    this.root.style.height = this._height + "px"
    this.root.style.minHeight = this._height + "px"
    this.root.style.maxHeight = this._height + "px"

    return await super.updateComputedStyle()
  }
}

customElements.define("x-resizeable", ResizeableComponent)
export { ResizeableComponent }
