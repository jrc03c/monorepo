import { Thing } from "../thing/index.mjs"
import { Vector2 } from "@jrc03c/vector2"

class Point extends Vector2 {}

Thing.classRegistry["Point"] = Point
export { Point }
