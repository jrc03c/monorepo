import { isBrowser } from "@jrc03c/js-math-tools"
import { parse } from "./parse.mjs"

async function loadCSV(path, config) {
  const raw = await (async () => {
    if (isBrowser()) {
      const response = await fetch(path)
      return await response.text()
    } else {
      try {
        const fs = await import("node:fs/promises")
        return await fs.readFile(path, { encoding: "utf8" })
      } catch (e) {
        console.error(e)
      }
    }
  })()

  return parse(raw, config)
}

export { loadCSV }
