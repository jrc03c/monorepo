// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="box">
    Box

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/box/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-box>
    This is a Bulma box!
  </bulma-box>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBox, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BoxView = createVueComponentWithCSS({
  name: "x-box-view",

  components: {
    "bulma-box": BulmaBox,
    "bulma-icon": BulmaIcon,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { BoxView }
