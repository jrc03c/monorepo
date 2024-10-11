import { BrowserPlotter } from "./browser-plotter.mjs"
import { isBrowser } from "@jrc03c/js-math-tools"
import { NodePlotter } from "./node-plotter.mjs"

const Plotter = isBrowser() ? BrowserPlotter : NodePlotter
const plot = new Plotter()

if (typeof window !== "undefined") {
  window.plot = plot
  window.Plotter = Plotter
}

export { plot, Plotter }
