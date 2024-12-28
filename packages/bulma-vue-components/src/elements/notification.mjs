// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div class="notification">
    <bulma-delete
      @click="$emit('close', $event)"
      v-if="!permanent">
    </bulma-delete>
    
    <slot></slot>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaDelete } from "./delete.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaNotification = createVueComponentWithCSS({
  name: "bulma-notification",
  emits: ["close"],

  components: {
    "bulma-delete": BulmaDelete,
  },

  template,

  props: {
    permanent: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },

  data() {
    return {
      css,
    }
  },
})

export { BulmaNotification }
