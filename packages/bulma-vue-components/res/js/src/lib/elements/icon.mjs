// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <span class="bulma-icon icon">
    <i :class="{ ['la-' + name]: true }" class="las" ref="inner"></i>
  </span>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const BulmaIcon = createVueComponentWithCSS({
  name: "bulma-icon",
  template,

  props: {
    name: {
      type: String,
      required: true,
      default: () => "exclamation-circle",
    },
  },

  data() {
    return {
      css,
      observer: null,
    }
  },

  methods: {
    updateInnerClasses() {
      const classes = Array.from(this.$el.classList)

      if (classes.includes("is-medium")) {
        this.$refs.inner.classList.add("la-lg")
      } else {
        this.$refs.inner.classList.remove("la-lg")
      }

      if (classes.includes("is-large")) {
        this.$refs.inner.classList.add("la-2x")
      } else {
        this.$refs.inner.classList.remove("la-2x")
      }
    },
  },

  mounted() {
    this.observer = new MutationObserver(mutations => {
      if (!this.$refs.inner) {
        return
      }

      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          this.updateInnerClasses()
          return
        }
      }
    })

    this.observer.observe(this.$el, {
      attributes: true,
      attributeFilter: ["class"],
    })

    this.$nextTick(() => this.updateInnerClasses())
  },

  unmounted() {
    this.observer.disconnect()
  },
})

export { BulmaIcon }
