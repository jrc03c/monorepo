import { createHighDPICanvas, HighDPICanvasElement } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.createHighDPICanvas = createHighDPICanvas
  globalThis.HighDPICanvasElement = HighDPICanvasElement

  try {
    if (
      globalThis.customElements
      && !globalThis.customElements.get(HighDPICanvasElement.tagName)
    ) {
      globalThis.customElements.define(
        HighDPICanvasElement.tagName,
        HighDPICanvasElement,
      )
    }
  } catch(e) {}
}
