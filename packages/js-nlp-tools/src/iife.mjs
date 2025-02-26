import * as JSNLPTools from "./index-browser.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.JSNLPTools = JSNLPTools
}
