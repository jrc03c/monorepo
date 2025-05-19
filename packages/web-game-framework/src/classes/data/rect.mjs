import { defineTypedProperty } from "@jrc03c/js-type-experiments"
import { Thing } from "../thing/index.mjs"
import { Vector2 } from "@jrc03c/vector2"

class Rect {
  position = new Vector2()
  dimensions = new Vector2()

  constructor(data) {
    data = data || {}

    defineTypedProperty(this, "position", Vector2)
    this.position = new Vector2()

    defineTypedProperty(this, "dimensions", Vector2)
    this.dimensions = new Vector2()

    if (data.position) {
      this.position.x = data.position.x || 0
      this.position.y = data.position.y || 0
    } else if (data.x && data.y) {
      this.position.x = data.x || 0
      this.position.y = data.y || 0
    }

    if (data.dimensions) {
      this.dimensions.x = data.dimensions.x || 0
      this.dimensions.y = data.dimensions.y || 0
    } else if (data.width && data.height) {
      this.dimensions.x = data.width || 0
      this.dimensions.y = data.height || 0
    }
  }

  get area() {
    return this.dimensions.x * this.dimensions.y
  }

  get height() {
    return this.dimensions.y
  }

  set height(value) {
    this.dimensions.y = value
  }

  get width() {
    return this.dimensions.x
  }

  set width(value) {
    this.dimensions.x = value
  }

  get x() {
    return this.position.x
  }

  set x(value) {
    this.position.x = value
  }

  get y() {
    return this.position.y
  }

  set y(value) {
    this.position.y = value
  }

  copy() {
    return new Rect(this)
  }

  containsPoint(p) {
    return (
      p.x >= this.position.x &&
      p.x <= this.position.x + this.dimensions.x &&
      p.y >= this.position.y &&
      p.y <= this.position.y + this.dimensions.y
    )
  }

  toObject() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    }
  }
}

Thing.classRegistry["Rect"] = Rect
export { Rect }
