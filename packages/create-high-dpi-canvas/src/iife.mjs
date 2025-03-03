import { createHighDPICanvas, HighDPICanvasElement } from "./index.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.createHighDPICanvas = createHighDPICanvas
  globalThis.HighDPICanvasElement = HighDPICanvasElement
}
