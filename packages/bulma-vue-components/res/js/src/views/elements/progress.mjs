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
    id="progress">
    Progress

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/progress/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <bulma-progress
      :class="{ [which.color]: true }"
      :key="which.value"
      :value="which.value"
      v-for="which in colors">
      {{ which.value * 100 }}%
    </bulma-progress>
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaIcon, BulmaProgress } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const ProgressView = createVueComponentWithCSS({
  name: "x-progress-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
    "bulma-progress": BulmaProgress,
  },

  template,

  data() {
    return {
      colors: [
        { color: "is-danger", value: 1 / 8 },
        { color: "is-warning", value: 2 / 8 },
        { color: "is-success", value: 3 / 8 },
        { color: "is-primary", value: 4 / 8 },
        { color: "is-info", value: 5 / 8 },
        { color: "is-link", value: 6 / 8 },
        { color: "", value: 7 / 8 },
      ],
      css,
      isAnimating: false,
    }
  },

  mounted() {
    this.isAnimating = true
    let x = 0

    const loop = () => {
      if (!this.isAnimating) {
        return
      }

      this.colors.forEach((which, i) => {
        which.value = Math.sin((2 * i) / this.colors.length + x) * 0.5 + 0.5
      })

      x += 0.02
      window.requestAnimationFrame(loop)
    }

    loop()
  },

  unmounted() {
    this.isAnimating = false
  },
})

export { ProgressView }
