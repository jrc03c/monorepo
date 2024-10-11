import { isBrowser } from "@jrc03c/js-math-tools"

async function safeRead(file) {
  if (isBrowser()) {
    const out = localStorage.getItem(file)

    try {
      return JSON.parse(out)
    } catch (e) {
      return out
    }
  } else {
    try {
      const fs = await import("node:fs")
      const out = fs.readFileSync(file, "utf8")

      try {
        return JSON.parse(out)
      } catch (e) {
        return out
      }
    } catch (e) {
      // ...
    }
  }
}

export { safeRead }
