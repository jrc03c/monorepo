// -----------------------------------------------------------------------------
// CSS
// -----------------------------------------------------------------------------

const css = /* css */ ``

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

const template = /* html */ `
  <section class="section">
    <div class="container">
      <h1 class="is-size-1 title">Bulma Vue Components</h1>

      <h2 class="is-size-3 subtitle">
        Components for

        <a
          href="https://vuejs.org"
          rel="noreferrer,noopener"
          target="_blank">
          Vue
        </a>

        with built-in

        <a
          href="https://bulma.io"
          rel="noreferrer,noopener"
          target="_blank">
          Bulma
        </a>

        classes
      </h2>

      <hr />

      <div class="columns">
        <div class="column is-2">
          <aside class="menu">
            <div class="menu-label">Elements</div>

            <ul>
              <li :key="item.label" v-for="item in menuItems.elements">
                <router-link :to="item.url">
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </aside>
        </div>

        <div class="column is-10">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
`

// -----------------------------------------------------------------------------
// JS
// -----------------------------------------------------------------------------

import { createVueComponentWithCSS } from "@jrc03c/vue-component-with-css"

const AppView = createVueComponentWithCSS({
  name: "x-app-view",
  template,

  data() {
    return {
      css,
      menuItems: {
        elements: [
          { label: "Block", url: "/elements/block" },
          { label: "Box", url: "/elements/box" },
          { label: "Button", url: "/elements/button" },
          { label: "Delete", url: "/elements/delete" },
          { label: "Icon", url: "/elements/icon" },
          { label: "Image", url: "/elements/image" },
          { label: "Notification", url: "/elements/notification" },
          { label: "Progress", url: "/elements/progress" },
          { label: "Table", url: "/elements/table" },
        ],
      },
    }
  },
})

export { AppView }
