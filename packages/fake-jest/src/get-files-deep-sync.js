import fs from "node:fs"
import path from "node:path"

export default function getFilesDeepAsync(dir) {
  const out = []
  const children = fs.readdirSync(dir)

  for (const child of children) {
    const childPath = path.join(dir, child)

    if (fs.lstatSync(childPath).isDirectory()) {
      out.push(...getFilesDeepAsync(childPath))
    } else {
      out.push(childPath)
    }
  }

  return out
}
