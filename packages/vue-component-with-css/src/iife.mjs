import { createVueComponentWithCSS } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.createVueComponentWithCSS = createVueComponentWithCSS
}
