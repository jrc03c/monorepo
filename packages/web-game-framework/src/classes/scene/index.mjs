import { defineTypedProperty } from "@jrc03c/js-type-experiments"
import { Thing } from "../thing/index.mjs"

class Scene extends Thing {
  isPaused = false
  isRunning = false

  constructor() {
    super(...arguments)

    defineTypedProperty(this, "isPaused", "boolean")
    this.isPaused = false

    defineTypedProperty(this, "isRunning", "boolean")
    this.isRunning = false
  }

  destroy() {
    this.stop()
    this.isPaused = null
    this.isRunning = null
    return super.destroy()
  }

  pause() {
    if (this.isPaused) {
      return this
    }

    this.isPaused = true
    this.emit("pause")
    return this
  }

  start() {
    if (this.isRunning) {
      return this
    }

    this.isRunning = true
    this.emit("start")
    return this
  }

  stop() {
    if (!this.isRunning) {
      return this
    }

    this.isRunning = false
    this.emit("stop")
    return this
  }

  unpause() {
    if (!this.isPaused) {
      return this
    }

    this.isPaused = false
    this.emit("unpause")
    return this
  }
}

Thing.classRegistry["Scene"] = Scene
export { Scene }
