import { expect, test } from "@jrc03c/fake-jest"
import { Vector2 } from "./index.mjs"

test("CONSTRUCTOR: Vector2", () => {
  const a = new Vector2()
  expect(a.x).toBe(0)
  expect(a.y).toBe(0)

  const b = new Vector2({ x: 3, y: 4 })
  expect(b.x).toBe(3)
  expect(b.y).toBe(4)

  const c = new Vector2([5, 12])
  expect(c.x).toBe(5)
  expect(c.y).toBe(12)

  const d = new Vector2(234, 345)
  expect(d.x).toBe(234)
  expect(d.y).toBe(345)
})

test("PROPERTY: Vector2.angle", () => {
  // get the angle
  for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
    const x = Math.cos(angle)
    const y = Math.sin(angle)
    const v = new Vector2(x, y)
    expect(v.angle).toBeCloseTo(angle)
  }

  // set the angle
  const v = new Vector2(1, 0)

  v.angle = Math.PI / 4
  expect(v.x).toBeCloseTo(1 / Math.sqrt(2))
  expect(v.y).toBeCloseTo(1 / Math.sqrt(2))

  v.angle = 7 * Math.PI / 6
  expect(v.x).toBeCloseTo(-Math.sqrt(3) / 2)
  expect(v.y).toBeCloseTo(-1 / 2)
})

test("PROPERTY: Vector2.length", () => {
  // get the length
  const a = new Vector2()
  expect(a.length).toBe(0)

  const b = new Vector2(3, 4)
  expect(b.length).toBeCloseTo(5)

  const c = new Vector2(-5, -12)
  expect(c.length).toBeCloseTo(13)

  const d = Vector2.random()
  expect(d.length).toBeCloseTo(1)

  const e = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1)
  expect(e.length).toBeCloseTo(Math.sqrt(e.x * e.x + e.y * e.y))

  // set the length
  const f = Vector2.random()
  expect(f.length).toBeCloseTo(1)
  const g = f.copy()
  g.length = 2
  expect(f.length).toBeCloseTo(1)
  expect(g.length).toBeCloseTo(2)
  expect(g.x).toBe(f.x * 2)
  expect(g.y).toBe(f.y * 2)
})

test("METHOD: Vector2.add", () => {
  const a = Vector2.random()
  const b = Vector2.random()
  const c = a.copy()
  c.add(b)
  expect(c.x).toBe(a.x + b.x)
  expect(c.y).toBe(a.y + b.y)

  const d = Vector2.random()
  const e = d.copy()
  e.add(5)
  expect(e.x).toBe(d.x + 5)
  expect(e.y).toBe(d.y + 5)

  const f = Vector2.random()
  const g = f.copy()
  g.add(-7.5, -9.5)
  expect(g.x).toBe(f.x - 7.5)
  expect(g.y).toBe(f.y - 9.5)
})

test("METHOD: Vector2.copy", () => {
  const a = Vector2.random()
  const b = a.copy()
  expect(b.x).toBe(a.x)
  expect(b.y).toBe(a.y)
  expect(a === b).toBe(false)
})

test("METHOD: Vector2.div", () => {
  const a = Vector2.random()
  const b = Vector2.random()
  const c = a.copy()
  c.div(b)
  expect(c.x).toBe(a.x / b.x)
  expect(c.y).toBe(a.y / b.y)

  const d = Vector2.random()
  const e = d.copy()
  e.div(5)
  expect(e.x).toBe(d.x / 5)
  expect(e.y).toBe(d.y / 5)

  const f = Vector2.random()
  const g = f.copy()
  g.div(-7.5, -9.5)
  expect(g.x).toBe(f.x / -7.5)
  expect(g.y).toBe(f.y / -9.5)
})

test("METHOD: Vector2.dot", () => {
  const a = Vector2.random()
  const b = Vector2.random()
  const c = a.dot(b)
  expect(c).toBeCloseTo(a.x * b.x + a.y * b.y)
})

test("METHOD: Vector2.mul", () => {
  const a = Vector2.random()
  const b = Vector2.random()
  const c = a.copy()
  c.mul(b)
  expect(c.x).toBe(a.x * b.x)
  expect(c.y).toBe(a.y * b.y)

  const d = Vector2.random()
  const e = d.copy()
  e.mul(5)
  expect(e.x).toBe(d.x * 5)
  expect(e.y).toBe(d.y * 5)

  const f = Vector2.random()
  const g = f.copy()
  g.mul(-7.5, -9.5)
  expect(g.x).toBe(f.x * -7.5)
  expect(g.y).toBe(f.y * -9.5)
})

test("METHOD: Vector2.norm", () => {
  const a = Vector2.random()
  expect(a.length).toBeCloseTo(1)
  a.mul(Math.random() * 100 - 50)
  expect(a.length).not.toBeCloseTo(1)
  a.norm()
  expect(a.length).toBeCloseTo(1)
})

test("METHOD: Vector2.rotate", () => {})

test("METHOD: Vector2.sub", () => {})

test("METHOD: Vector2.fromAngle (static)", () => {})

test("METHOD: Vector2.random (static)", () => {})
