import { isBrowser } from "@jrc03c/js-math-tools"

async function safeDelete(x) {
  try {
    if (isBrowser()) {
      localStorage.removeItem(x)
    } else {
      const fs = await import("node:fs")
      fs.rmSync(x, { recursive: true, force: true })
    }
  } catch (e) {
    // ...
  }
}

export { safeDelete }
