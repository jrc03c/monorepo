import { ContextMenuComponent } from "./context-menu/index.mjs"
import { DraggableComponent } from "./draggable.mjs"
import { FrameComponent } from "./frame/index.mjs"
import { MenuComponent } from "./context-menu/menu.mjs"
import { ResizeableComponent } from "./resizeable.mjs"

if (typeof window !== "undefined") {
  window.MiscVueComponents = {
    ContextMenuComponent,
    DraggableComponent,
    FrameComponent,
    MenuComponent,
    ResizeableComponent,
  }
}

export {
  ContextMenuComponent,
  DraggableComponent,
  FrameComponent,
  MenuComponent,
  ResizeableComponent,
}