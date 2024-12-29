// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <progress :value="value" class="progress" max="1">
    {{ value * 100 }}%
  </progress>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaProgress = createVueComponentWithCSS({
  name: "bulma-progress",
  template,

  props: {
    value: {
      type: Number,
      required: false,
      default: () => 0,
    },
  },

  data() {
    return {
      css,
    }
  },
})

export { BulmaProgress }
