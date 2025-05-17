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
  for (let angle = 0; angle < 360; angle += 45) {
    const x = Math.cos(angle * Math.PI / 180)
    const y = Math.sin(angle * Math.PI / 180)
    const v = new Vector2(x, y)
    expect(v.angle).toBeCloseTo(angle * Math.PI / 180)
  }
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
