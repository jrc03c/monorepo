import {
  BulmaBlock,
  BulmaBox,
  BulmaButton,
} from "../dist/bulma-vue-components.import.mjs"

import { createApp } from "vue/dist/vue.esm-bundler.js"

const app = createApp({
  components: {
    "bulma-block": BulmaBlock,
    "bulma-box": BulmaBox,
    "bulma-button": BulmaButton,
  },
})

app.mount("#app")
