import fs from "node:fs"
import path from "node:path"

export default function getFilesDeepAsync(dir) {
  const out = []
  const children = fs.readdirSync(dir)

  for (const child of children) {
    const childDir = path.join(dir, child)

    if (fs.lstatSync(childDir).isDirectory()) {
      out.push(...getFilesDeepAsync(childDir))
    } else {
      out.push(child)
    }
  }

  return out
}
