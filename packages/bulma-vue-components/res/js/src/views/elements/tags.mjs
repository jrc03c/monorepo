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
    id="tags">
    Tags

    <a
      class="is-external-anchor-tag"
      href="https://bulma.io/documentation/elements/tag/"
      rel="noreferrer,noopener"
      target="_blank"
      title="Go to Bulma docs">
      <bulma-icon name="external-link-alt"></bulma-icon>
    </a>
  </h4>

  <bulma-block>
    <bulma-tags @click="onClick" @delete="onDelete" :tags="tags"></bulma-tags>
  </bulma-block>

  <bulma-notification
    @close="message = ''"
    class="is-info is-light"
    v-if="message">
    {{ message }}
  </bulma-notification>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import {
  BulmaBlock,
  BulmaIcon,
  BulmaNotification,
  BulmaTags,
} from "../../lib/index.mjs"

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const TagsView = createVueComponentWithCSS({
  name: "x-tags-view",

  components: {
    "bulma-block": BulmaBlock,
    "bulma-icon": BulmaIcon,
    "bulma-notification": BulmaNotification,
    "bulma-tags": BulmaTags,
  },

  template,

  data() {
    return {
      css,
      message: "",
      tags: [
        "hello",
        "world",
        { name: "primary", classes: ["is-primary"] },
        { name: "link", classes: ["is-link"] },
        { name: "delete me", classes: ["is-info"], delete: true },
        { name: "delete me too", classes: ["is-danger"], delete: true },
        { name: "click me, senpai", icon: "mouse", click: true },
        {
          names: ["build", "passing"],
          classes: ["is-dark", "is-success"],
          icons: ["industry", "thumbs-up"],
        },
        { names: ["status", "abandoned"], classes: ["is-dark", "is-warning"] },
        {
          names: ["friends", "0"],
          classes: ["is-dark", "is-danger"],
          icons: ["user-friends", "frown"],
        },
      ],
      timeout: null,
    }
  },

  methods: {
    onClick(tag) {
      this.message = `The "${
        typeof tag === "string"
          ? tag
          : tag.name
            ? tag.name
            : "[ " + tag.names.join(", ") + " ]"
      }" tag was clicked!`

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.message = ""
      }, 3000)
    },

    onDelete(tag) {
      if (this.tags.includes(tag)) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      }
    },
  },
})

export { TagsView }
