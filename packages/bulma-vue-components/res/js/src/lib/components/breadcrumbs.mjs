// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  nav.breadcrumb ul li.is-excess a {
    color: hsl(0, 0%, 86%) ; /* grey-lighter */
  }

  nav.breadcrumb ul li a .bulma-icon {
    margin-left: -0.25em !important;
    margin-right: 0.25em !important;
  }

  nav.breadcrumb ul li.is-active a .bulma-icon {
    border-bottom: 2px solid transparent;
  }

  nav.breadcrumb ul li.is-active a span:not(.bulma-icon) {
    border-bottom: 2px solid var(--bulma-breadcrumb-item-active-color);
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <nav aria-label="breadcrumbs" class="breadcrumb">
    <ul v-if="links && links.length > 0">
      <li
        :class="{
          'is-active': links[i].isActive,
          'is-excess': i > this.activeLinkIndex,
        }"
        :key="links[i].label"
        v-for="i in range(0, links.length)">
        <router-link
          :to="links[i].path"
          @click="$emit('click', links[i])"
          aria-current="page"
          v-if="links[i].isActive">
          <bulma-icon
            :brand="links[i].icon.brand"
            :name="
              typeof links[i].icon === 'string'
                ? links[i].icon
                : links[i].icon.name
            "
            :regular="links[i].icon.regular"
            :solid="
              typeof links[i].icon.solid === 'undefined'
                ? !links[i].icon.brand && !links[i].icon.regular
                : links[i].solid
            "
            v-if="links[i].icon">
          </bulma-icon>

          <span>{{ links[i].label }}</span>
        </router-link>

        <router-link
          :to="links[i].path"
          @click="$emit('click', links[i])"
          v-else>
          <bulma-icon
            :brand="links[i].icon.brand"
            :name="
              typeof links[i].icon === 'string'
                ? links[i].icon
                : links[i].icon.name
            "
            :regular="links[i].icon.regular"
            :solid="
              typeof links[i].icon.solid === 'undefined'
                ? !links[i].icon.brand && !links[i].icon.regular
                : links[i].solid
            "
            v-if="links[i].icon">
          </bulma-icon>
          
          <span>{{ links[i].label }}</span>
        </router-link>
      </li>
    </ul>

    <slot v-else></slot>
  </nav>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { BulmaIcon } from "../elements/icon.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"
import { range } from "../../lib/helpers.mjs"

const BulmaBreadcrumbs = createVueComponentWithCSS({
  name: "bulma-breadcrumbs",
  emits: ["click"],

  components: {
    "bulma-icon": BulmaIcon,
  },

  template,

  props: {
    links: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      css,
      activeLinkIndex: -1,
    }
  },

  watch: {
    links: {
      deep: true,

      handler() {
        this.activeLinkIndex = this.links.findIndex(link => link.isActive)
      },
    },
  },

  methods: {
    range,
  },
})

export { BulmaBreadcrumbs }
