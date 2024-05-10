// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ `
  .x-context-menu {
    z-index: 999999999;
    background-color: rgb(235, 235, 235);
    position: fixed;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    font-size: 0.75rem;
    pointer-events: none;
    opacity: 0;
  }

  .x-context-menu .x-context-menu-items {
    min-width: 192px;
  }

  .x-context-menu:has(.x-context-menu-item.has-expanded-children)
    > .x-context-menu-items
    > .x-context-menu-item:not(.has-expanded-children) {
    opacity: 0.25;
  }

  .x-context-menu.is-visible {
    pointer-events: all;
    opacity: 1;
  }

  .x-context-menu .x-context-menu-item {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    cursor: pointer;
    padding: 0.5rem;
    user-select: none;
    border-bottom: 2px solid rgb(215, 215, 215);
  }

  .x-context-menu .x-context-menu-item:last-child {
    border-bottom: 0;
  }

  .x-context-menu .x-context-menu-item:hover,
  .x-context-menu .x-context-menu-item.has-expanded-children {
    background-color: rgb(255, 255, 255);
  }

  .x-context-menu .x-context-menu-item:active {
    background-color: rgb(205, 205, 205);
  }

  .x-context-menu .context-menu-item-label  {
    width: 100%;
    flex-shrink: 999999;
  }

  .x-context-menu .x-context-menu-item-label-expand-arrow::after {
    content: "❯";
  }
`

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <div
    :class="{
      'has-open-submenu': !!hoveredItemWithChildren,
      'is-visible': isVisible,
    }"
    :style="computedStyle"
    @click.stop.prevent="() => {}"
    class="x-context-menu">
    <div class="x-context-menu-items" ref="itemsContainer">
      <div
        :class="{ 'has-expanded-children': hoveredItemWithChildren === item }"
        :key="item.label"
        @click="select(item)"
        @mouseenter="showChildren($event, item)"
        class="x-context-menu-item"
        v-for="item in items">
        <span class="x-context-menu-item-label">
          {{ item.label }}
        </span>

        <span
          class="x-context-menu-item-label-expand-arrow"
          v-if="item.children">
        </span>
      </div>
    </div>

    <x-context-menu
      :is-visible="true"
      :items="hoveredItemWithChildren.children"
      :x="hoveredItemWithChildrenX"
      :y="hoveredItemWithChildrenY"
      v-if="hoveredItemWithChildren">
    </x-context-menu>
  </div>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

const createVueComponentWithCSS = require("@jrc03c/vue-component-with-css")
const pause = require("@jrc03c/pause")

module.exports = createVueComponentWithCSS({
  name: "x-context-menu",
  template,
  emits: ["cancel", "close", "open", "select"],

  props: {
    "is-visible": {
      type: Boolean,
      required: true,
      default: () => false,
    },

    // `items` should be an array of objects, where each object has these
    // properties:
    // - label (string, required)
    // - action (function, required if !children)
    // - children (array of objects like this, required if !action)
    items: {
      type: Array,
      required: true,
      default: () => [],
    },

    x: {
      type: Number,
      required: true,
      default: () => 0,
    },

    y: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },

  data() {
    return {
      computedStyle: "",
      css,
      hoveredItemWithChildren: null,
      hoveredItemWithChildrenX: 0,
      hoveredItemWithChildrenY: 0,
      listenersHaveBeenAdded: false,
    }
  },

  computed: {
    isRoot() {
      return this.getRootContextMenu() === this.$el
    },
  },

  watch: {
    isVisible() {
      if (this.isVisible) {
        this.$emit("open")
      } else {
        this.$emit("close")
        this.hoveredItemWithChildren = null
        this.hoveredItemWithChildrenX = 0
        this.hoveredItemWithChildrenY = 0
      }
    },

    x() {
      this.updateComputedStyle()
    },

    y() {
      this.updateComputedStyle()
    },
  },

  methods: {
    addListeners() {
      if (this.isRoot && !this.listenersHaveBeenAdded) {
        window.addEventListener("click", this.onClick)
        window.addEventListener("keydown", this.onKeyDown)
        this.listenersHaveBeenAdded = true
      }
    },

    getParentContextMenu() {
      let current = this.$el

      while (current.parentElement) {
        if (current.parentElement.classList.contains("x-context-menu")) {
          return current.parentElement
        }

        current = current.parentElement
      }

      return this.$el
    },

    getRootContextMenu() {
      let current = this.$el
      let root = this.$el

      while (current.parentElement) {
        if (current.parentElement.classList.contains("x-context-menu")) {
          root = current.parentElement
        }

        current = current.parentElement
      }

      return root
    },

    onClick() {
      this.$emit("cancel")
    },

    onKeyDown(event) {
      if (event.key === "Escape") {
        this.$emit("cancel")
      }
    },

    removeListeners() {
      if (this.listenersHaveBeenAdded) {
        window.removeEventListener("click", this.onClick)
        window.removeEventListener("keydown", this.onKeyDown)
        this.listenersHaveBeenAdded = false
      }
    },

    select(item) {
      if (item.children) {
        return
      }

      if (item.action) {
        item.action()
      }

      this.$emit("select", item)
    },

    showChildren(event, item) {
      this.hoveredItemWithChildren = null
      this.hoveredItemWithChildrenX = 0
      this.hoveredItemWithChildrenY = 0

      if (item.children) {
        this.$nextTick(() => {
          const rect = this.$refs.itemsContainer.getBoundingClientRect()
          const targetRect = event.target.getBoundingClientRect()
          this.hoveredItemWithChildren = item
          this.hoveredItemWithChildrenX = rect.x + rect.width
          this.hoveredItemWithChildrenY = rect.y + targetRect.y - rect.y
        })
      }
    },

    async updateComputedStyle(shouldCallAgain) {
      if (typeof shouldCallAgain === "undefined") {
        shouldCallAgain = true
      }

      while (!this.$refs.itemsContainer) {
        await pause(10)
      }

      let x = this.x
      let y = this.y
      const itemsRect = this.$refs.itemsContainer.getBoundingClientRect()

      if (this.isRoot) {
        if (x + itemsRect.width > window.innerWidth) {
          x = window.innerWidth - itemsRect.width
        }
      } else {
        const parentMenu = this.getParentContextMenu()
        const parentMenuRect = parentMenu.getBoundingClientRect()

        const parentMenuItemsRect = parentMenu
          .querySelector(".x-context-menu-items")
          .getBoundingClientRect()

        if (
          parentMenuRect.x + parentMenuItemsRect.width + itemsRect.width >
          window.innerWidth
        ) {
          x = parentMenuItemsRect.x - itemsRect.width
        }
      }

      if (y + itemsRect.height > window.innerHeight) {
        y = window.innerHeight - itemsRect.height
      }

      this.computedStyle = `
        left: ${x}px;
        top: ${y}px;
      `

      if (shouldCallAgain) {
        this.$nextTick(() => {
          this.updateComputedStyle(false)
        })
      }
    },
  },

  mounted() {
    this.addListeners()
    this.$nextTick(() => this.updateComputedStyle())
  },

  unmounted() {
    this.removeListeners()
  },
})
