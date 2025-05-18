import {
  ABOVE,
  BELOW,
  EXACTLY_ON,
  getPointRelationToLine,
  pointIsInTriangle,
} from "./point-is-in-triangle.mjs"

import { expect, test } from "@jrc03c/fake-jest"
import { forEach } from "@jrc03c/js-math-tools"

test("tests that the `getPointRelationToLine` function works as expected", () => {
  // y = 0.5x - 3
  const pair = [
    [0, -3],
    [2, -2],
  ]

  const pointAbove = [1, 1.5]
  const pointExactlyOn = [1, -2.5]
  const pointBelow = [1, -7.25]
  expect(getPointRelationToLine(pointAbove, pair)).toBe(ABOVE)
  expect(getPointRelationToLine(pointExactlyOn, pair)).toBe(EXACTLY_ON)
  expect(getPointRelationToLine(pointBelow, pair)).toBe(BELOW)
})

test("tests that the `pointIsInTriangle` function works as expected", () => {
  // y = 2x + 1
  // y = -3x -4
  // y = x + 5

  const v1 = [-1, -1]
  const v2 = [4, 9]
  const v3 = [-9 / 4, 11 / 4]
  const vertices = [v1, v2, v3]

  const pointsInside = [
    [0, 2],
    [-1, 3],
    [2.5, 7],
  ]

  const pointsOutside = [
    [0, 0],
    [-1, -2],
    [-3, 0],
    [-4, 4],
    [-2.5, 6.5],
    [6, 12],
  ]

  forEach(pointsInside, p => {
    expect(pointIsInTriangle(p, vertices)).toBe(true)
  })

  forEach(pointsOutside, p => {
    expect(pointIsInTriangle(p, vertices)).toBe(false)
  })
})
