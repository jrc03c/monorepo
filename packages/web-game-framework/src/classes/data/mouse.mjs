import { Thing } from "../thing/index.mjs"
import { Vector2 } from "@jrc03c/vector2"

class Mouse extends Vector2 {
  hasLeftButtonDown = false
  hasRightButtonDown = false
}

Thing.classRegistry["Mouse"] = Mouse
export { Mouse }
