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

test("PROPERTY: Vector2.length", () => {})

test("METHOD: Vector2.add", () => {})

test("METHOD: Vector2.copy", () => {})

test("METHOD: Vector2.div", () => {})

test("METHOD: Vector2.dot", () => {})

test("METHOD: Vector2.mul", () => {})

test("METHOD: Vector2.norm", () => {})

test("METHOD: Vector2.sub", () => {})

test("METHOD: Vector2.fromAngle (static)", () => {})

test("METHOD: Vector2.random (static)", () => {})
