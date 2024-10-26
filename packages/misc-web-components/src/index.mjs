// import { ContextMenuComponent } from "./context-menu/index.mjs"
// import { FrameComponent } from "./frame/index.mjs"
// import { MenuComponent } from "./context-menu/menu.mjs"

import { BaseComponent } from "./base.mjs"
import { DraggableComponent } from "./draggable.mjs"
import { ResizeableComponent } from "./resizeable.mjs"

if (typeof window !== "undefined") {
  window.MiscVueComponents = {
    BaseComponent,
    // ContextMenuComponent,
    DraggableComponent,
    // FrameComponent,
    // MenuComponent,
    ResizeableComponent,
  }
}

export {
  BaseComponent,
  // ContextMenuComponent,
  DraggableComponent,
  // FrameComponent,
  // MenuComponent,
  ResizeableComponent,
}
