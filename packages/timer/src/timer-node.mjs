import { Timer } from "./index.mjs"
import fs from "node:fs"
import path from "node:path"

class NodeTimer extends Timer {
  path = null

  constructor(options) {
    options = options || {}
    super(options)
    this.path = options.path || this.path
  }

  save(p) {
    p = p || this.path

    if (!p) {
      throw new Error(
        "No file path was specified! You must pass a file path either (1) as an argument to the `save` method or (2) as a property of the options object passed into the `NodeTimer` constructor.",
      )
    }

    const dir = p.split(path.sep).slice(0, -1).join(path.sep)

    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(p, JSON.stringify(this.toObject(), null, 2), "utf8")
    return this
  }
}

export { NodeTimer }
