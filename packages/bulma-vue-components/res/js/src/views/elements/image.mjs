// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="image">
    Image

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/image/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block style="width: 512px; max-width: 100%">
    <bulma-image
      class="is-16by9"
      src="https://i.ibb.co/CvGJ3SV/paul-hanaoka-Lc-AZc-VWs-CIo-unsplash-2-min.jpg">
    </bulma-image>
  </bulma-block>

  <bulma-block>
    This component accepts an
    <code>src</code>
    attribute. If the attribute is defined, then the inner element becomes an
    <code>&lt;img&gt;</code>
    element, and the value of the
    <code>src</code>
    attribute is applied to it. Otherwise, the inner element is a
    <code>&lt;slot&gt;</code>
    .
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon, BulmaImage } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const ImageView = createVueComponentWithCSS({
  name: "x-image-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
    "bulma-image": BulmaImage,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { ImageView }
