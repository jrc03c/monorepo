import { set, sort } from "@jrc03c/js-math-tools"
import fs from "node:fs"
import path from "node:path"

function getDirsDeepSync(dir, depth) {
  if (typeof depth !== "number") {
    depth = Infinity
  }

  if (depth <= 0) {
    return []
  }

  dir = path.resolve(dir)

  const children = (() => {
    try {
      return fs.readdirSync(dir)
    } catch (e) {
      return []
    }
  })()

  const out = []

  children.forEach(child => {
    const childPath = dir + "/" + child

    const stat = (() => {
      try {
        return fs.lstatSync(childPath)
      } catch (e) {
        return null
      }
    })()

    if (!stat) return

    if (stat.isDirectory()) {
      out.push(childPath)
      getDirsDeepSync(childPath, depth - 1).forEach(d => out.push(d))
    }
  })

  return sort(set(out))
}

export { getDirsDeepSync }