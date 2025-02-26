import { BrowserPlotter } from "./browser-plotter.mjs"

if (typeof globalThis !== "undefined") {
  globalThis.JSPlotTools = {
    plot: new BrowserPlotter(),
    Plotter: BrowserPlotter,
  }
}
