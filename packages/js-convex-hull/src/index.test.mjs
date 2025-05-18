import {
  combinations,
  filter,
  forEach,
  isEqual,
  map,
  normal,
  range,
} from "@jrc03c/js-math-tools"

import { expect, test } from "@jrc03c/fake-jest"
import { getConvexHull, pointIsInTriangle } from "./index.mjs"

test("tests that the hull can be found correctly", () => {
  forEach(range(0, 100), () => {
    const points = normal([100, 2])
    const hull = getConvexHull(points)

    const triangles = map(
      combinations(
        map(hull, p => JSON.stringify(p)),
        3,
      ),
      combo => map(combo, p => JSON.parse(p)),
    )

    const nonHullPoints = filter(points, p => hull.every(h => !isEqual(h, p)))

    expect(
      nonHullPoints.every(p => !triangles.every(t => !pointIsInTriangle(p, t))),
    ).toBe(true)
  })
})
