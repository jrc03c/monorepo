import {
  BulmaBlock,
  BulmaBox,
  BulmaButton,
  BulmaDelete,
  BulmaIcon,
  BulmaImage,
  BulmaNotification,
} from "../../../../dist/bulma-vue-components.import.mjs"

import { createApp } from "vue/dist/vue.esm-bundler.js"

const app = createApp({
  components: {
    "bulma-block": BulmaBlock,
    "bulma-box": BulmaBox,
    "bulma-button": BulmaButton,
    "bulma-delete": BulmaDelete,
    "bulma-icon": BulmaIcon,
    "bulma-image": BulmaImage,
    "bulma-notification": BulmaNotification,
  },
})

app.mount("#app")