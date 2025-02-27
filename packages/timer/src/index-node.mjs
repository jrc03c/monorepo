import { Timer } from "./index.mjs"
import fs from "node:fs"
import path from "node:path"

class NodeTimer extends Timer {
  save(file) {
    const dir = file.split(path.sep).slice(0, -1).join(path.sep)

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    fs.writeFileSync(file, JSON.stringify(this.splits, null, 2), "utf8")
    return this
  }
}

export { NodeTimer }
