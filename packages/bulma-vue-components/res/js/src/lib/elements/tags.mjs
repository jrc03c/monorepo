// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  .bulma-tag .bulma-icon {
    padding-right: 8px;
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div class="bulma-tags field is-grouped is-grouped-multiline">
    <div :key="i" class="control" v-for="i in range(0, tags.length)">
      <div class="tags has-addons">
        <!-- string tag, clickable -->
        <a
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !!tags[i].click">
          {{ tags[i] }}
        </a>

        <!-- string tag, not clickable -->
        <span
          class="bulma-tag tag"
          v-if="typeof tags[i] === 'string' && !tags[i].click">
          {{ tags[i] }}
        </span>

        <!-- object tag with classes, clickable -->
        <a
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-if="!!tags[i].name && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </a>

        <!-- object tag with classes, not clickable -->
        <span
          :class="
            (tags[i].classes || [])
              .reduce(
                (a, b) => { a[b] = true; return a },
                {}
              )
          "
          class="bulma-tag tag"
          v-if="!!tags[i].name && !tags[i].click">
          <bulma-icon
            :name="tags[i].icon"
            v-if="tags[i].icon">
          </bulma-icon>

          {{ tags[i].name }}
        </span>

        <!-- object tag with multiple names and classes, clickable -->
        <a
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          @click="$emit('click', tags[i])"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !!tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </a>

        <!-- object tag with multiple names and classes, not clickable -->
        <span
          :class="{ [tags[i].classes[j]]: true }"
          :key="j"
          class="bulma-tag tag"
          v-for="j in range(0, tags[i].names.length)"
          v-if="!!tags[i].names && !tags[i].click">
          <bulma-icon
            :name="tags[i].icons[j]"
            v-if="tags[i].icons && tags[i].icons.length > 0">
          </bulma-icon>

          {{ tags[i].names[j] }}
        </span>

        <a
          :class="getDeleteClass(tags[i])"
          @click="$emit('delete', tags[i])"
          class="bulma-tag is-delete tag"
          v-if="!!tags[i].delete">
        </a>
      </div>
    </div>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

// cases:
// - single tag
// - multiple tags
// - tags with addons
// - tags with delete buttons
// - many tags with addons and/or delete buttons
// - all of the above with color classes

// options for passing in data:
// - strings
// - objects like { name: "foo", classes: ["is-primary"] }
// - objects like { names: ["bar", "baz"], classes: ["is-dark", "is-warning"] }

import { BulmaIcon } from "./icon.mjs"
import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"
import { range } from "../helpers.mjs"

const BulmaTags = createVueComponentWithCSS({
  name: "bulma-tags",
  emits: ["click", "delete"],

  components: {
    "bulma-icon": BulmaIcon,
  },

  template,

  props: {
    tags: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data() {
    return {
      css,
    }
  },

  methods: {
    getDeleteClass(tag) {
      if (tag.classes && tag.classes.length > 0) {
        const colorClasses = [
          "is-danger",
          "is-warning",
          "is-success",
          "is-primary",
          "is-info",
          "is-link",
          "is-dark",
        ]

        const classes = tag.classes.filter(c => colorClasses.includes(c))

        if (classes.length > 0) {
          const lastColorClass = classes.at(-1)
          return { [lastColorClass]: true, "is-light": true }
        } else {
          return {}
        }
      } else {
        return {}
      }
    },

    range,
  },
})

export { BulmaTags }
