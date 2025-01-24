// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  .bulma-card {
    max-width: 512px;
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <h4
    class="block has-text-grey has-text-weight-bold is-size-4"
    id="card">
    Card

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/components/card/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <bulma-card :image="image" image-ratio-class="is-2by1">
      <template v-slot:content>
        <h1 class="title">Card</h1>
        <h2 class="subtitle">Hey! This is a card!</h2>
      </template>

      <template v-slot:footer>
        <a class="card-footer-item" href="#">
          Cancel
        </a>

        <a class="card-footer-item" href="#">
          Okay
        </a>
      </template>
    </bulma-card>
  </bulma-block>

  <bulma-block>
    ...
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaBlock, BulmaCard, BulmaIcon } from "../../lib/index.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const CardView = createVueComponentWithCSS({
  name: "x-card-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-card": BulmaCard,
    "bulma-icon": BulmaIcon,
  },

  template,

  data() {
    return {
      css,
      image: "",
    }
  },

  mounted() {
    const width = 512
    const height = 256
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    context.fillStyle = "black"
    context.fillRect(0, 0, width, height)

    const steps = 20
    const xstep = width / steps
    const ystep = xstep
    context.lineWidth = 2

    for (let x = 0; x < width; x += xstep) {
      for (let y = 0; y < height; y += ystep) {
        const hue = Math.random() * 360
        const opacity = Math.random() * Math.random()
        context.beginPath()
        context.arc(x + xstep / 2, y + ystep / 2, xstep / 2, 0, Math.PI * 2)
        context.fillStyle = `hsla(${hue}deg, 100%, 50%, ${opacity})`
        context.fill()
      }
    }

    this.image = canvas.toDataURL()
  },
})

export { CardView }
