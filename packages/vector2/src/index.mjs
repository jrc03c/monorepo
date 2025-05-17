class Vector2 {
  static fromAngle(a) {
    const v = new Vector2(1, 0)
    v.angle = a
    return v
  }

  static random(randomFn) {
    randomFn = randomFn || Math.random
    return this.fromAngle(randomFn() * 2 * Math.PI)
  }

  x = 0
  y = 0

  // valid forms:
  // - new Vector2(options)
  // - new Vector2([x, y])
  // - new Vector2(x, y)
  constructor() {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        const v = arguments[0]

        if (v instanceof Array) {
          this.x = v[0] || 0
          this.y = v[1] || 0
        }

        else {
          this.x = v.x || 0
          this.y = v.y || 0
        }
      }

      else {
        this.x = arguments[0] || 0
        this.y = arguments[1] || 0
      }
    }
  }

  get angle() {}

  set angle(v) {}

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  set length(v) {
    this.norm().mul(v)
  }

  get magnitude() {
    return this.length
  }

  set magnitude(v) {
    this.length = v
  }

  // valid forms:
  // - add(Vector2)
  // - add(number)
  // - add(number, number)
  add() {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        const v = arguments[0]

        if (v instanceof Vector2) {
          this.x += v.x
          this.y += v.y
        }

        else {
          this.x += v
          this.y += v
        }
      }

      else {
        this.x += arguments[0]
        this.y += arguments[1]
      }
    }

    return this
  }

  copy() {
    return new Vector2(this)
  }

  // valid forms:
  // - div(Vector2)
  // - div(number)
  // - div(number, number)
  div() {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        const v = arguments[0]

        if (arguments[0] instanceof Vector2) {
          this.x /= v.x
          this.y /= v.y
        }

        else {
          this.x /= v
          this.y /= v
        }
      }

      else {
        this.x /= arguments[0]
        this.y /= arguments[1]
      }
    }

    return this
  }

  divide() {
    return this.div(...arguments)
  }

  dot(v) {
    return this.x * v.x + this.y * v.y
  }

  // valid forms:
  // - mul(Vector2)
  // - mul(number)
  // - mul(number, number)
  mul() {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        const v = arguments[0]

        if (arguments[0] instanceof Vector2) {
          this.x *= v.x
          this.y *= v.y
        }

        else {
          this.x *= v
          this.y *= v
        }
      }

      else {
        this.x *= arguments[0]
        this.y *= arguments[1]
      }
    }

    return this
  }

  multiply() {
    return this.mul(...arguments)
  }

  norm() {
    return this.div(this.length)
  }

  normalize() {
    return this.norm(...arguments)
  }

  rotate(a) {
    this.angle += a
  }

  scale() {
    return this.mul(...arguments)
  }

  // valid forms:
  // - sub(Vector2)
  // - sub(number)
  // - sub(number, number)
  sub() {
    if (arguments.length > 0) {
      if (arguments.length === 1) {
        const v = arguments[0]

        if (v instanceof Vector2) {
          this.x -= v.x
          this.y -= v.y
        }

        else {
          this.x -= v
          this.y -= v
        }
      }

      else {
        this.x -= arguments[0]
        this.y -= arguments[1]
      }
    }

    return this
  }

  subtract() {
    return this.sub(...arguments)
  }
}

export { Vector2 }
