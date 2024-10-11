import fs from "node:fs"
import path from "node:path"

function safeWriteFileSync(filename, content, encoding) {
  filename = path.resolve(filename)
  const dir = filename.split("/").slice(0, -1).join("/")

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  return fs.writeFileSync(filename, content, encoding)
}

export { safeWriteFileSync }
