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
    id="breadcrumbs">
    Breadcrumbs

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/components/breadcrumb/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-breadcrumbs :links="links" @click="onClick"></bulma-breadcrumbs>

  <bulma-notification permanent>
    This is the <b>{{ activeLink.label }}</b> page!
  </bulma-notification>

  <bulma-block>
    The <code>&lt;bulma-breadcrumbs&gt;</code> component optionally accepts an array of link objects via a <code>links</code> attribute. Each link object in the array must have a <code>label</code> property and a <code>path</code> property; and it can optionally have <code>isActive</code> and <code>icon</code> properties. If the <code>links</code> attribute is not used, then content can be slotted in.
  </bulma-block>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import {
  BulmaBlock,
  BulmaBreadcrumbs,
  BulmaIcon,
  BulmaNotification,
} from "../../lib/index.mjs"

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"
import { range } from "../../lib/helpers.mjs"

const BreadcrumbsView = createVueComponentWithCSS({
  name: "x-breadcrumbs-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-breadcrumbs": BulmaBreadcrumbs,
    "bulma-icon": BulmaIcon,
    "bulma-notification": BulmaNotification,
  },

  template,

  data() {
    return {
      css,
      links: [
        { label: "Technology", icon: { name: "flask" }, path: "#" },
        { label: "Computing", icon: { name: "laptop" }, path: "#" },
        {
          label: "Internet",
          icon: { name: "globe" },
          path: "#",
          isActive: true,
        },
        { label: "Web development", icon: { name: "code" }, path: "#" },
        { label: "JavaScript", icon: { brand: true, name: "js" }, path: "#" },
      ],
    }
  },

  computed: {
    activeLink() {
      return this.links[this.activeLinkIndex]
    },

    activeLinkIndex() {
      return this.links.findIndex(link => link.isActive)
    },
  },

  methods: {
    onClick(link) {
      this.links.forEach(link => (link.isActive = false))
      link.isActive = true
    },

    range,
  },

  mounted() {
    this.onClick(this.activeLink)
  },
})

export { BreadcrumbsView }
