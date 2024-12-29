// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  This is the element notification view.
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const NotificationView = createVueComponentWithCSS({
  name: "x-notification-view",
  template,

  data() {
    return {
      css,
    }
  },
})

export { NotificationView }
