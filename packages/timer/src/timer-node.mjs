import { Timer } from "./timer.mjs"
import fs from "node:fs"
import path from "node:path"

class NodeTimer extends Timer {
  static fromFile(file) {
    const raw = fs.readFileSync(file, "utf8")
    const options = JSON.parse(raw)
    return new NodeTimer(options)
  }

  path = null
  shouldAutoSave = false

  constructor(options) {
    options = options || {}
    super(options)
    this.path = options.path || this.path

    this.shouldAutoSave =
      typeof options.shouldAutoSave === "undefined"
        ? !!this.path
        : options.shouldAutoSave
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

  start() {
    const out = super.start(...arguments)

    if (this.shouldAutoSave) {
      this.save()
    }

    return out
  }

  stop() {
    const out = super.stop(...arguments)

    if (this.shouldAutoSave) {
      this.save()
    }

    return out
  }

  toObject() {
    return {
      ...super.toObject(),
      path: this.path,
      shouldAutoSave: this.shouldAutoSave,
    }
  }
}

export { NodeTimer }
