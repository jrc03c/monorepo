import { unparse } from "./unparse.mjs"

async function saveCSVInBrowser(filename, df, config) {
  const raw = unparse(df, config)
  const a = document.createElement("a")
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(raw)
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

export { saveCSVInBrowser }
