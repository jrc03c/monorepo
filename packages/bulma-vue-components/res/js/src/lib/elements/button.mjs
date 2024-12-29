// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <button
    :class="{
      'is-black': black,
      'is-danger': danger,
      'is-dark': dark,
      'is-ghost': ghost,
      'is-info': info,
      'is-light': light,
      'is-link': link,
      'is-primary': primary,
      'is-success': success,
      'is-text': text,
      'is-warning': warning,
      'white': white,
    }"
    class="bulma-button button">
    <slot></slot>
  </button>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaButton = createVueComponentWithCSS({
  name: "bulma-button",
  template,

  props: {
    black: { type: Boolean, required: false, default: () => false },
    danger: { type: Boolean, required: false, default: () => false },
    dark: { type: Boolean, required: false, default: () => false },
    ghost: { type: Boolean, required: false, default: () => false },
    info: { type: Boolean, required: false, default: () => false },
    light: { type: Boolean, required: false, default: () => false },
    link: { type: Boolean, required: false, default: () => false },
    primary: { type: Boolean, required: false, default: () => false },
    success: { type: Boolean, required: false, default: () => false },
    text: { type: Boolean, required: false, default: () => false },
    warning: { type: Boolean, required: false, default: () => false },
    white: { type: Boolean, required: false, default: () => false },
  },

  data() {
    return {
      css,
    }
  },
})

export { BulmaButton }
