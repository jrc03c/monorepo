import { isBrowser } from "@jrc03c/js-math-tools"
import { unparse } from "./unparse.mjs"

function download(filename, text) {
  let a = document.createElement("a")
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(text)
  a.download = filename
  a.dispatchEvent(new MouseEvent("click"))
}

async function saveCSV(path, df, config) {
  const raw = unparse(df, config)

  if (isBrowser()) {
    download(path, raw)
  } else {
    const dir = path.split("/").slice(0, -1).join("/")

    try {
      const fs = await import("node:fs/promises")

      try {
        await fs.mkdir(dir, { recursive: true })
      } catch (e) {}

      await fs.writeFile(path, raw, { encoding: "utf8" })
    } catch (e) {
      console.error(e)
    }
  }
}

export { saveCSV }
