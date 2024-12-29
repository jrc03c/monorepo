// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="icon">
    Icon

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/icon/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <div class="row">
      <bulma-icon class="is-large" name="question-circle"></bulma-icon>
      <bulma-icon class="is-large" name="bell"></bulma-icon>
      <bulma-icon class="is-large" name="dove"></bulma-icon>
      <bulma-icon class="is-large" name="sync"></bulma-icon>
      <bulma-icon class="is-large" name="volume-up"></bulma-icon>
    </div>
  </bulma-block>

  <bulma-block>
    Note that the icons above have the
    <code>is-large</code>
    class for better visibility. Those are
    <i>not</i>
    the default sizes of the icons.
  </bulma-block>

  <bulma-block>
    <bulma-block>
      Unlike Bulma, which recommends Font Awesome icons, this library uses
      <a
        href="https://icons8.com/line-awesome"
        rel="noopener, noreferrer"
        target="_blank">
        Line Awesome
      </a>
      icons. Use the
      <code>name</code>
      attribute to select a Line Awesome icon (without including the
      <code>la-</code>
      prefix in the name). For example, this:
    </bulma-block>

    <bulma-block class="code-block notification">
      <!-- prettier-ignore -->
      <code>
        &lt;bulma-icon class="is-large"
        <span class="has-text-warning">name="question-circle"</span>&gt;&lt;/bulma-icon&gt;
      </code>
    </bulma-block>

    <bulma-block>
      ...produces the first of the five icons shown above.
    </bulma-block>
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const IconView = createVueComponentWithCSS({
  name: "x-icon-view",

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

export { IconView }
