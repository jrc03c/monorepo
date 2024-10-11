// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <x-frame-horizontal
    :is-locked="isLocked"
    :max-width="maxSize"
    :min-width="minSize"
    @resize="$emit('resize', $event)"
    @resize-end="$emit('resize-end', $event)"
    @resize-start="$emit('resize-start', $event)"
    v-if="orientation === 'horizontal'">
    <slot></slot>
  </x-frame-horizontal>

  <x-frame-vertical
    :is-locked="isLocked"
    :max-height="maxSize"
    :min-height="minSize"
    @resize="$emit('resize', $event)"
    @resize-end="$emit('resize-end', $event)"
    @resize-start="$emit('resize-start', $event)"
    v-if="orientation === 'vertical'">
    <slot></slot>
  </x-frame-vertical>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"
import { FrameHorizontalComponent } from "./horizontal.mjs"
import { FrameVerticalComponent } from "./vertical.mjs"

const FrameComponent = createVueComponentWithCSS({
  name: "x-frame",
  template,
  emits: ["resize", "resize-end", "resize-start"],

  components: {
    "x-frame-horizontal": FrameHorizontalComponent,
    "x-frame-vertical": FrameVerticalComponent,
  },

  props: {
    "is-locked": {
      type: Boolean,
      required: false,
      default: () => false,
    },

    "max-size": {
      type: Number,
      required: false,
      default: () => Infinity,
    },

    "min-size": {
      type: Number,
      required: false,
      default: () => 64,
    },

    orientation: {
      type: String,
      required: false,
      default: () => "horizontal",
    },
  },

  data() {
    return {
      css,
    }
  },
})

export { FrameComponent }
