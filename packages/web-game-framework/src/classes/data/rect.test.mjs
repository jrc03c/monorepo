import { expect, test } from "@jrc03c/fake-jest"
import { isEqual } from "@jrc03c/js-math-tools"
import { Rect } from "./rect.mjs"
import { Vector2 } from "@jrc03c/vector2"

test("tests that the `Rect` constructor works as expected", () => {
  const a = new Rect()
  expect(a.position.x).toBe(0)
  expect(a.position.y).toBe(0)
  expect(a.dimensions.x).toBe(0)
  expect(a.dimensions.y).toBe(0)

  const b = new Rect({
    position: { x: 100, y: 200 },
    dimensions: { x: 300, y: 400 },
  })

  expect(b.position.x).toBe(100)
  expect(b.position.y).toBe(200)
  expect(b.dimensions.x).toBe(300)
  expect(b.dimensions.y).toBe(400)

  const c = new Rect({ x: 234, y: 345, width: 456, height: 567 })
  expect(c.position.x).toBe(234)
  expect(c.position.y).toBe(345)
  expect(c.dimensions.x).toBe(456)
  expect(c.dimensions.y).toBe(567)
})

test("tests that the `Rect.area` property works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    expect(r.area).toBe(r.dimensions.x * r.dimensions.y)
  }
})

test("tests that the `Rect.height` property works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    expect(r.height).toBe(r.dimensions.y)
    r.height = Math.random()
    expect(r.height).toBe(r.dimensions.y)
    r.dimensions.y = Math.random()
    expect(r.height).toBe(r.dimensions.y)
  }
})

test("tests that the `Rect.width` property works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    expect(r.width).toBe(r.dimensions.x)
    r.width = Math.random()
    expect(r.width).toBe(r.dimensions.x)
    r.dimensions.x = Math.random()
    expect(r.width).toBe(r.dimensions.x)
  }
})

test("tests that the `Rect.x` property works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    expect(r.x).toBe(r.position.x)
    r.x = Math.random()
    expect(r.x).toBe(r.position.x)
    r.position.x = Math.random()
    expect(r.x).toBe(r.position.x)
  }
})

test("tests that the `Rect.y` property works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    expect(r.y).toBe(r.position.y)
    r.y = Math.random()
    expect(r.y).toBe(r.position.y)
    r.position.y = Math.random()
    expect(r.y).toBe(r.position.y)
  }
})

test("tests that the `Rect.copy` method works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const a = new Rect({
      x: Math.random(),
      y: Math.random(),
      width: Math.random(),
      height: Math.random(),
    })

    const b = a.copy()
    expect(a === b).toBe(false)
    expect(isEqual(a, b)).toBe(true)
  }
})

test("tests that the `Rect.containsPoint` method works as expected", () => {
  for (let i = 0; i < 100; i++) {
    const r = new Rect({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      width: Math.random(),
      height: Math.random(),
    })

    const p = new Vector2({
      x: r.x + Math.random() * r.width,
      y: r.y + Math.random() * r.height,
    })

    expect(r.containsPoint(p)).toBe(true)
  }

  const empty = new Rect()

  for (let i = 0; i < 100; i++) {
    const p = new Vector2({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
    })

    expect(empty.containsPoint(p)).toBe(p.x === 0 && p.y === 0)
  }
})
