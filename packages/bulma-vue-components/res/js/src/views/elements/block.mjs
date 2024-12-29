// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="block">
    Block

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/block/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    This is a Bulma block! It has a bottom margin, which gives it more vertical
    space than a typical <code>div</code>.
  </bulma-block>

`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BlockView = createVueComponentWithCSS({
  name: "x-block-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { BlockView }
