import { loadCSV } from "./load-csv.mjs"
import { parse } from "./parse.mjs"
import { saveCSV } from "./save-csv.mjs"
import { streamLoadCSV } from "./stream-load-csv.mjs"
import { unparse } from "./unparse.mjs"

if (typeof window !== "undefined") {
  window.JSCSVHelpers = {
    loadCSV,
    parse,
    saveCSV,
    streamLoadCSV,
    unparse,
  }
}

export { loadCSV, parse, saveCSV, streamLoadCSV, unparse }
