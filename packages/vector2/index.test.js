const Vector2 = require(".")

test("adds vectors", () => {
  const a = new Vector2(3, 4)
  const b = new Vector2(-2, -7)
  const c = Vector2.add(a, b)
  expect(c.x).toBe(1)
  expect(c.y).toBe(-3)

  const d = new Vector2(-6, 12)
  const e = new Vector2(17, 20)
  d.add(e)
  expect(d.x).toBe(11)
  expect(d.y).toBe(32)
})

test("subtracts vectors", () => {
  const a = new Vector2(3, 4)
  const b = new Vector2(-2, -7)
  const c = Vector2.subtract(a, b)
  expect(c.x).toBe(5)
  expect(c.y).toBe(11)

  const d = new Vector2(-6, 12)
  const e = new Vector2(17, 20)
  d.subtract(e)
  expect(d.x).toBe(-23)
  expect(d.y).toBe(-8)
})

test("dots vectors", () => {
  const a = new Vector2(3, 4)
  const b = new Vector2(-2, -7)
  const c = Vector2.dot(a, b)
  expect(c).toBe(3 * -2 + 4 * -7)

  const d = new Vector2(-6, 12)
  const e = new Vector2(17, 20)
  expect(d.dot(e)).toBe(-6 * 17 + 12 * 20)
})

test("gets and sets magnitudes of vectors", () => {
  expect(new Vector2(3, 4).magnitude).toBe(5)
  expect(new Vector2(-3, 4).magnitude).toBe(5)
  expect(new Vector2(3, -4).magnitude).toBe(5)
  expect(new Vector2(-3, -4).magnitude).toBe(5)

  const a = new Vector2(17, -3)
  a.magnitude = 5
  expect(a.magnitude).toBe(5)
  expect(Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2))).toBe(5)
})

test("scales vectors", () => {
  const a = new Vector2(Math.random(), Math.random())
  const s = Math.random() * 100 - 50
  const b = Vector2.scale(a, s)
  expect(b.magnitude).toBeCloseTo(a.magnitude * Math.abs(s))
  expect(b.x).toBe(a.x * s)
  expect(b.y).toBe(a.y * s)

  const c = new Vector2(3, 4)
  c.scale(-5)
  expect(c.x).toBe(-15)
  expect(c.y).toBe(-20)
})

test("normalizes vectors", () => {
  const a = new Vector2(Math.random() * 100 - 50, Math.random() * 100 - 50)
  a.normalize()
  expect(a.magnitude).toBeCloseTo(1)

  const b = new Vector2(Math.random() * 100 - 50, Math.random() * 100 - 50)
  const c = Vector2.normalize(b)
  expect(b.magnitude).not.toBeCloseTo(c.magnitude)
  expect(c.magnitude).toBeCloseTo(1)
})

test("gets and sets vector angles", () => {
  const a = new Vector2(1, Math.sqrt(3))
  a.magnitude *= 5

  expect(a.magnitude).toBeCloseTo(10)
  expect(a.angle).toBeCloseTo(Math.PI / 3)

  a.angle += Math.PI / 4
  expect(a.magnitude).toBeCloseTo(10)
  expect(a.angle).toBeCloseTo(Math.PI / 3 + Math.PI / 4)

  a.rotate(-Math.PI)
  let newAngle = Math.PI / 3 + Math.PI / 4 - Math.PI
  const k = Math.floor(newAngle / (Math.PI * 2))
  newAngle -= k * Math.PI * 2
  expect(a.magnitude).toBeCloseTo(10)
  expect(a.angle).toBeCloseTo(newAngle)

  a.magnitude *= 0.25
  expect(a.magnitude).toBeCloseTo(2.5)
  expect(a.angle).toBeCloseTo(newAngle)

  a.normalize()
  expect(a.magnitude).toBeCloseTo(1)
  expect(a.angle).toBeCloseTo(newAngle)
})

test("copies vectors", () => {
  const a = new Vector2(Math.random() * 100 - 50, Math.random() * 100 - 50)
  const b = a.copy()
  const c = a.clone()

  expect(a.x).toBe(b.x)
  expect(a.x).toBe(c.x)
  expect(a.y).toBe(b.y)
  expect(a.y).toBe(c.y)
  expect(a === b).toBe(false)
  expect(a === c).toBe(false)
  expect(b === c).toBe(false)

  const d = Vector2.copy(a)
  expect(a.x).toBe(d.x)
  expect(a.y).toBe(d.y)
  expect(a === d).toBe(false)
})
