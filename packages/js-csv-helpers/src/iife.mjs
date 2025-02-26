import * as JSCSVHelpers from "./index-browser.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.JSCSVHelpers = JSCSVHelpers
}
