// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="delete">
    Delete

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/delete/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <div class="row">
      <bulma-delete class="is-large"></bulma-delete>
      <bulma-delete class="is-medium"></bulma-delete>
      <bulma-delete></bulma-delete>
      <bulma-delete class="is-small"></bulma-delete>
    </div>
  </bulma-block>

`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaDelete, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const DeleteView = createVueComponentWithCSS({
  name: "x-delete-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-delete": BulmaDelete,
    "bulma-icon": BulmaIcon,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { DeleteView }
