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
              <li>
                <router-link to="/elements/block">
                  Block
                </router-link>
              </li>

              <li>
                <router-link to="/elements/box">
                  Box
                </router-link>
              </li>

              <li>
                <router-link to="/elements/button">
                  Button
                </router-link>
              </li>

              <li>
                <router-link to="/elements/delete">
                  Delete
                </router-link>
              </li>

              <li>
                <router-link to="/elements/icon">
                  Icon
                </router-link>
              </li>

              <li>
                <router-link to="/elements/image">
                  Image
                </router-link>
              </li>

              <li>
                <router-link to="/elements/notification">
                  Notification
                </router-link>
              </li>

              <li>
                <router-link to="/elements/progress">
                  Progress
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
    }
  },
})

export { AppView }
