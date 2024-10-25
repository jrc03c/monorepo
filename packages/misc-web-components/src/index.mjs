// import { ContextMenuComponent } from "./context-menu/index.mjs"
// import { DraggableComponent } from "./draggable.mjs"
// import { FrameComponent } from "./frame/index.mjs"
// import { MenuComponent } from "./context-menu/menu.mjs"
// import { ResizeableComponent } from "./resizeable.mjs"

import { BaseComponent } from "./base.mjs"

if (typeof window !== "undefined") {
  window.MiscVueComponents = {
    BaseComponent,
    // ContextMenuComponent,
    // DraggableComponent,
    // FrameComponent,
    // MenuComponent,
    // ResizeableComponent,
  }
}

export {
  BaseComponent,
  // ContextMenuComponent,
  // DraggableComponent,
  // FrameComponent,
  // MenuComponent,
  // ResizeableComponent,
}
