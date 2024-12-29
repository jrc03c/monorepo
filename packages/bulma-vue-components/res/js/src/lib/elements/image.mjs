// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <figure class="bulma-image image">
    <img :src="src" v-if="src">
    <slot v-else></slot>
  </figure>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaImage = createVueComponentWithCSS({
  name: "bulma-image",
  template,

  props: {
    src: {
      type: String,
      required: false,
      default: () => "",
    },
  },

  data() {
    return {
      css,
    }
  },
})

export { BulmaImage }
