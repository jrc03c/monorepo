import { BlockView } from "./views/elements/block.mjs"
import { BoxView } from "./views/elements/box.mjs"
import { BreadcrumbsView } from "./views/components/breadcrumbs.mjs"
import { ButtonView } from "./views/elements/button.mjs"
import { CardView } from "./views/components/card.mjs"
import { createRouter, createWebHashHistory } from "vue-router"
import { DeleteView } from "./views/elements/delete.mjs"
import { IconView } from "./views/elements/icon.mjs"
import { ImageView } from "./views/elements/image.mjs"
import { NotificationView } from "./views/elements/notification.mjs"
import { ProgressView } from "./views/elements/progress.mjs"
import { TableView } from "./views/elements/table.mjs"
import { TagsView } from "./views/elements/tags.mjs"

const RouterViewComponent = {
  template: "<router-view></router-view>",
}

const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/elements",
      component: RouterViewComponent,
      children: [
        { path: "block", component: BlockView },
        { path: "box", component: BoxView },
        { path: "button", component: ButtonView },
        { path: "delete", component: DeleteView },
        { path: "icon", component: IconView },
        { path: "image", component: ImageView },
        { path: "notification", component: NotificationView },
        { path: "progress", component: ProgressView },
        { path: "table", component: TableView },
        { path: "tags", component: TagsView },
      ],
    },

    {
      path: "/components",
      component: RouterViewComponent,
      children: [
        { path: "breadcrumbs", component: BreadcrumbsView },
        { path: "card", component: CardView },
      ],
    },
  ],
})

export { router }
