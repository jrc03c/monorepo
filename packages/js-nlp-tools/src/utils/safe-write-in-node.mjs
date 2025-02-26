import fs from "node:fs"
import path from "node:path"

async function safeWriteInNode(file, contents) {
  const dir = file.split(path.sep).slice(0, -1).join(path.sep)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(file, JSON.stringify(contents), "utf8")
}

export { safeWriteInNode }
