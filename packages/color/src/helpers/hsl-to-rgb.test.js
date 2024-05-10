const HSLToRGB = require("./hsl-to-rgb.js")

test("tests that HSLToRGB works as expected", () => {
  const pred = HSLToRGB(50, 1, 0.5)
  const truth = { r: 255, g: 213, b: 0 }

  expect(Math.abs(pred.r - truth.r)).toBeLessThan(1)
  expect(Math.abs(pred.g - truth.g)).toBeLessThan(1)
  expect(Math.abs(pred.b - truth.b)).toBeLessThan(1)
})

test("tests that invalid values are never produced", () => {
  for (let h = 0; h < 360; h++) {
    for (let s = 0; s < 1; s += 0.01) {
      for (let l = 0; l < 1; l += 0.01) {
        const { r, g, b } = HSLToRGB(h, s, l)

        if (isNaN(r) || r < 0 || r > 255) {
          throw new Error()
        }

        if (isNaN(g) || g < 0 || g > 255) {
          throw new Error()
        }

        if (isNaN(b) || b < 0 || b > 255) {
          throw new Error()
        }
      }
    }
  }
})
