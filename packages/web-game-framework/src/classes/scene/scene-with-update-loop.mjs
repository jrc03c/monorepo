import { defineTypedProperty } from "@jrc03c/js-type-experiments"
import { Scene } from "./index.mjs"
import { Thing } from "../thing/index.mjs"

class SceneWithUpdateLoop extends Scene {
  lastUpdateTime = null

  constructor() {
    super(...arguments)
    defineTypedProperty(this, "lastUpdateTime", "number")
  }

  destroy() {
    this.lastUpdateTime = null
    return super.destroy()
  }

  start() {
    this.lastUpdateTime = performance.now()

    if (typeof requestAnimationFrame === "undefined") {
      const interval = setInterval(() => {
        if (!this.isRunning) {
          return clearInterval(interval)
        }

        if (!this.isPaused) {
          const now = performance.now()
          const deltaTime = (now - this.lastUpdateTime) / 1000
          this.update(deltaTime)
          this.lastUpdateTime = now
        }
      }, 1000 / 60)
    } else {
      const loop = () => {
        if (!this.isRunning) {
          return
        }

        if (!this.isPaused) {
          const now = performance.now()
          const deltaTime = (now - this.lastUpdateTime) / 1000
          this.update(deltaTime)
          this.lastUpdateTime = now
        }

        requestAnimationFrame(loop)
      }

      loop()
    }

    return super.start(...arguments)
  }
}

Thing.classRegistry["SceneWithUpdateLoop"] = SceneWithUpdateLoop
export { SceneWithUpdateLoop }
