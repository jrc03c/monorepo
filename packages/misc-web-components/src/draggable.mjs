// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  .x-draggable {
    position: absolute;
    left: 0;
    top: 0;
    cursor: grab;
  }

  .x-draggable:active,
  .x-draggable:active * {
    user-select: none;
  }

  .x-draggable.is-h-locked.is-v-locked {
    cursor: unset !important;
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div class="x-draggable">
    <slot></slot>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BaseComponent } from "./base.mjs"

class DraggableEvent extends Event {
  x = 0
  y = 0
  width = 0
  height = 0
}

class DraggableDragStartEvent extends DraggableEvent {
  constructor(rect, options) {
    super("drag-start", options)
    this.x = rect.x
    this.y = rect.y
    this.width = rect.width
    this.height = rect.height
  }
}

class DraggableDragEvent extends DraggableEvent {
  constructor(rect, options) {
    super("drag", options)
    this.x = rect.x
    this.y = rect.y
    this.width = rect.width
    this.height = rect.height
  }
}

class DraggableDragEndEvent extends DraggableEvent {
  constructor(rect, options) {
    super("drag-end", options)
    this.x = rect.x
    this.y = rect.y
    this.width = rect.width
    this.height = rect.height
  }
}

class DraggableComponent extends BaseComponent {
  static $css = css
  static $template = template

  static observedAttributes = BaseComponent.observedAttributes.concat([
    "is-h-locked",
    "is-v-locked",
    "x",
    "y",
  ])

  $isBeingDragged = false
  $mouse = { x: 0, y: 0 }
  $x_ = 0
  $y_ = 0

  get $isHLocked() {
    return this.getAttribute("is-h-locked")
  }

  get $isVLocked() {
    return this.getAttribute("is-v-locked")
  }

  get $root() {
    return this.shadowRoot.querySelector(".x-draggable")
  }

  $onMouseDown(event) {
    event.preventDefault()
    event.stopPropagation()

    const isHLocked = this.$isHLocked
    const isVLocked = this.$isVLocked

    if (isHLocked && isVLocked) {
      return
    }

    if (!isHLocked) {
      this.$mouse.x = event.screenX
    }

    if (!isVLocked) {
      this.$mouse.y = event.screenY
    }

    this.$isBeingDragged = true
    this.$root.style.cursor = "grabbing"

    this.dispatchEvent(
      new DraggableDragStartEvent(this.$root.getBoundingClientRect()),
    )
  }

  $onMouseMove(event) {
    const isHLocked = this.$isHLocked
    const isVLocked = this.$isVLocked

    if (isHLocked && isVLocked) {
      return
    }

    if (this.$isBeingDragged) {
      const dx = event.screenX - this.$mouse.x
      const dy = event.screenY - this.$mouse.y

      if (!isHLocked) {
        this.$x_ += dx
        this.$mouse.x = event.screenX
      }

      if (!isVLocked) {
        this.$y_ += dy
        this.$mouse.y = event.screenY
      }

      this.$updateComputedStyle()

      this.dispatchEvent(
        new DraggableDragEvent(this.$root.getBoundingClientRect()),
      )
    }
  }

  $onMouseUp() {
    const isHLocked = this.$isHLocked
    const isVLocked = this.$isVLocked

    if (isHLocked && isVLocked) {
      return
    }

    const wasBeingDragged = this.$isBeingDragged
    this.$isBeingDragged = false
    this.$root.style.cursor = ""

    if (wasBeingDragged) {
      this.dispatchEvent(
        new DraggableDragEndEvent(this.$root.getBoundingClientRect()),
      )
    }
  }

  $updateComputedStyle(shouldForceUpdate) {
    if (shouldForceUpdate || !this.$isHLocked) {
      this.$root.style.left = this.$x_ + "px"
    }

    if (shouldForceUpdate || !this.$isVLocked) {
      this.$root.style.top = this.$y_ + "px"
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "is-h-locked") {
      if (newValue) {
        this.$root.classList.add("is-h-locked")
      } else {
        this.$root.classList.remove("is-h-locked")
      }
    }

    if (name === "is-v-locked") {
      if (newValue) {
        this.$root.classList.add("is-v-locked")
      } else {
        this.$root.classList.remove("is-v-locked")
      }
    }

    if (name === "x") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.$x_ = newValue
      this.$updateComputedStyle()
    }

    if (name === "y") {
      try {
        newValue = JSON.parse(newValue)
      } catch (e) {}

      this.$y_ = newValue
      this.$updateComputedStyle()
    }
  }

  connectedCallback() {
    const interval = setInterval(() => {
      const root = this.$root

      if (!root) {
        return
      }

      clearInterval(interval)

      this.$on(root, "mousedown", this.$onMouseDown.bind(this))
      this.$on(window, "mousemove", this.$onMouseMove.bind(this))
      this.$on(window, "mouseup", this.$onMouseUp.bind(this))

      this.$x_ = this.getAttribute("x")
      this.$y_ = this.getAttribute("y")
      this.$updateComputedStyle(true)
    }, 10)

    return super.connectedCallback(...arguments)
  }
}

customElements.define("x-draggable", DraggableComponent)
export { DraggableComponent }
