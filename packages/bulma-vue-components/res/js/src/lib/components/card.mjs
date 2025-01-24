// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

// NOTE: This component intentionally omits the `.card-header` offered by Bulma.

const template = /* html */ `
  <div class="bulma-card card">
    <div class="card-image" v-if="image">
      <bulma-image
        :class="{ [imageRatioClass]: true }"
        :src="image">
      </bulma-image>
    </div>

    <div class="card-content">
      <slot name="content"></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaImage } from "../elements/image.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaCard = createVueComponentWithCSS({
  name: "bulma-card",

  components: {
    "bulma-image": BulmaImage,
  },

  template,

  props: {
    image: {
      type: String,
      required: false,
      default: () => "",
    },

    "image-ratio-class": {
      type: String,
      required: false,
      default: () => "is-4by3",
    },
  },

  data() {
    return {
      css,
    }
  },
})

export { BulmaCard }
