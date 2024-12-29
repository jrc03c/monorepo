// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4
    class="block has-text-grey has-text-weight-bold is-size-4"
    id="notification">
    Notification

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/notification/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <bulma-notification
      @close="event => event.target.parentElement.parentElement.removeChild(event.target.parentElement)">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id est lorem.
      Praesent erat dui, malesuada in massa eu, ultricies pellentesque odio. Etiam
      iaculis euismod condimentum.
    </bulma-notification>

    <bulma-notification
      @close="event => event.target.parentElement.parentElement.removeChild(event.target.parentElement)"
      class="is-light is-info">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id est lorem.
      Praesent erat dui, malesuada in massa eu, ultricies pellentesque odio. Etiam
      iaculis euismod condimentum.
    </bulma-notification>

    <bulma-notification
      @close="event => event.target.parentElement.parentElement.removeChild(event.target.parentElement)"
      class="is-info">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id est lorem.
      Praesent erat dui, malesuada in massa eu, ultricies pellentesque odio. Etiam
      iaculis euismod condimentum.
    </bulma-notification>
  </bulma-block>

  <bulma-block>
    By default, notification components are dismissable. To make them
    non-dismissable, add an empty
    <code>permanent</code>
    attribute, like this:
  </bulma-block>

  <bulma-block class="code-block notification">
    <!-- prettier-ignore -->
    <code>
      &lt;bulma-notification class="is-warning is-light" <span class="has-text-warning">permanent</span>&gt;
      <br />
      &nbsp;&nbsp;This can't be dismissed!
      <br />
      &lt;/bulma-notification&gt;
    </code>
  </bulma-block>

  <bulma-block>...which yields:</bulma-block>

  <bulma-notification class="is-warning is-light" permanent>
    This can't be dismissed!
  </bulma-notification>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon, BulmaNotification } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const NotificationView = createVueComponentWithCSS({
  name: "x-notification-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
    "bulma-notification": BulmaNotification,
  },

  template,

  data() {
    return {
      css,
    }
  },
})

export { NotificationView }
