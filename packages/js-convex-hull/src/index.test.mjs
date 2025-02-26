import { combinations, isEqual, normal, range } from "@jrc03c/js-math-tools"
import { expect, test } from "@jrc03c/fake-jest"
import { getConvexHull, pointIsInTriangle } from "./index.mjs"

test("tests that the hull can be found correctly", () => {
  range(0, 100).forEach(() => {
    const points = normal([100, 2])
    const hull = getConvexHull(points)

    const triangles = combinations(
      hull.map(p => JSON.stringify(p)),
      3,
    ).map(combo => combo.map(p => JSON.parse(p)))

    const nonHullPoints = points.filter(p => hull.every(h => !isEqual(h, p)))

    expect(
      nonHullPoints.every(p => !triangles.every(t => !pointIsInTriangle(p, t))),
    ).toBe(true)
  })
})
