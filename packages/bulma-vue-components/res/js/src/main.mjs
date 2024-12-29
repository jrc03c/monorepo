import { AppView } from "./views/app.mjs"
import { createApp } from "vue/dist/vue.esm-bundler.js"
import { router } from "./router.mjs"

const app = createApp(AppView)
app.use(router)
app.mount("#app")
