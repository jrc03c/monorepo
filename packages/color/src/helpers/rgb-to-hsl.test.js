const RGBToHSL = require("./rgb-to-hsl.js")

test("tests that RGBToHSL works as expected", () => {
  const pred = RGBToHSL(255, 213, 0)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let r = 0; r < 255; r++) {
    for (let g = 0; g < 255; g++) {
      for (let b = 0; b < 255; b++) {
        const { h, s, l } = RGBToHSL(r, g, b)

        if (isNaN(h) || h < 0 || h >= 360) {
          throw new Error()
        }

        if (isNaN(s) || s < 0 || s > 1) {
          throw new Error()
        }

        if (isNaN(l) || l < 0 || l > 1) {
          throw new Error()
        }
      }
    }
  }
})
