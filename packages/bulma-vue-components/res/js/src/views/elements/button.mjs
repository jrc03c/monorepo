// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4 class="block has-text-grey has-text-weight-bold is-size-4" id="button">
    Button

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/button/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <div class="row">
      <bulma-button>Default</bulma-button>
      <bulma-button primary>Primary</bulma-button>
      <bulma-button link>Link</bulma-button>
      <bulma-button info>Info</bulma-button>
      <bulma-button success>Success</bulma-button>
      <bulma-button warning>Warning</bulma-button>
      <bulma-button danger>Danger</bulma-button>
      <bulma-button white>White</bulma-button>
      <bulma-button light>Light</bulma-button>
      <bulma-button dark>Dark</bulma-button>
      <bulma-button black>Black</bulma-button>
      <bulma-button text>Text</bulma-button>
      <bulma-button ghost>Ghost</bulma-button>
    </div>
  </bulma-block>

  <bulma-block>
    <bulma-block>
      To apply colors, use the adjective word from the
      <code>is-</code>
      class name (e.g., use "danger" from the
      <code>is-danger</code>
      class name) as an empty attribute. For example, this:
    </bulma-block>

    <bulma-block class="code-block notification">
      <!-- prettier-ignore -->
      <code>
          &lt;bulma-button
          <span class="has-text-warning">danger</span>&gt;
          <br />
          &nbsp;&nbsp;Watch out!
          <br />
          &lt;/bulma-button&gt;
        </code>
    </bulma-block>

    <bulma-block>...is equivalent to:</bulma-block>

    <bulma-block class="code-block notification">
      <code>
        &lt;button class="button is-danger"&gt;
        <br />
        &nbsp;&nbsp;Watch out!
        <br />
        &lt;/button&gt;
      </code>
    </bulma-block>
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaButton, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const ButtonView = createVueComponentWithCSS({
  name: "x-button-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-button": BulmaButton,
    "bulma-icon": BulmaIcon,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { ButtonView }
