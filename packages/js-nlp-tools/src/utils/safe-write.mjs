import { isBrowser } from "@jrc03c/js-math-tools"

async function safeWrite(file, contents) {
  if (isBrowser()) {
    localStorage.setItem(file, JSON.stringify(contents))
  } else {
    const fs = await import("node:fs")
    const dir = file.split("/").slice(0, -1).join("/")

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(file, JSON.stringify(contents), "utf8")
  }
}

export { safeWrite }
