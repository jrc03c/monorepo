class Vector2 {
  x = 0
  y = 0

  constructor(x, y) {
    const self = this
    self.x = x
    self.y = y
  }

  add(v) {
    const self = this
    self.x += v.x
    self.y += v.y
    return self
  }

  subtract(v) {
    const self = this
    self.x -= v.x
    self.y -= v.y
    return self
  }

  dot(v) {
    const self = this
    return self.x * v.x + self.y * v.y
  }

  get magnitude() {
    const self = this
    return Math.sqrt(Math.pow(self.x, 2) + Math.pow(self.y, 2))
  }

  set magnitude(m) {
    const self = this
    self.normalize().scale(m)
  }

  get angle() {
    const self = this

    if (self.x === 0) {
      if (self.y === 0) return NaN
      if (self.y > 0) return Math.PI / 2
      if (self.y < 0) return (3 * Math.PI) / 2
    }

    const angle = Math.atan(self.y / self.x) + (self.x < 0 ? Math.PI : 0)
    const k = Math.floor(angle / (2 * Math.PI))
    return angle - k * 2 * Math.PI
  }

  set angle(theta) {
    const self = this
    const radius = self.magnitude
    self.x = radius * Math.cos(theta)
    self.y = radius * Math.sin(theta)
  }

  scale(s) {
    const self = this
    self.x *= s
    self.y *= s
    return self
  }

  normalize() {
    const self = this
    return self.scale(1 / self.magnitude)
  }

  rotate(theta) {
    const self = this
    self.angle += theta
    return self
  }

  copy() {
    const self = this
    return new Vector2(self.x, self.y)
  }

  clone() {
    const self = this
    return self.copy()
  }

  static add(a, b) {
    return a.copy().add(b)
  }

  static subtract(a, b) {
    return a.copy().subtract(b)
  }

  static dot(a, b) {
    return a.copy().dot(b)
  }

  static scale(v, s) {
    return v.copy().scale(s)
  }

  static normalize(v) {
    return v.copy().normalize()
  }

  static rotate(v, theta) {
    return v.copy().rotate(theta)
  }

  static copy(v) {
    return v.copy()
  }

  static clone(v) {
    return v.copy()
  }
}

if (typeof module !== "undefined") {
  module.exports = Vector2
}

if (typeof window !== "undefined") {
  window.Vector2 = Vector2
}
