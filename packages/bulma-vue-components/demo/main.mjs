import { BulmaBox } from "../dist/bulma-vue-components.import.mjs"
import { createApp } from "vue/dist/vue.esm-bundler.js"

const app = createApp({
  components: {
    "bulma-box": BulmaBox,
  },
})

app.mount("#app")
