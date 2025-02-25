import { expect, test } from "@jrc03c/fake-jest"
import { HSLToHex } from "./hsl-to-hex.mjs"

test("tests that HSLToHex works as expected", () => {
  const pred = HSLToHex(50, 1, 0.5)
  const truth = { value: "ffd400" }
  expect(pred.value).toBe(truth.value)
})
