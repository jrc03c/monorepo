const CMYKToHSL = require("./cmyk-to-hsl.js")

test("tests that CMYKToHSL works as expected", () => {
  const pred = CMYKToHSL(0.5, 0, 1, 0.5)
  const truth = { h: 90, s: 1, l: 0.25 }
  expect(Math.abs(pred.h - truth.h)).toBeLessThan(0.01)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let c = 0; c < 1; c += 0.01) {
    for (let m = 0; m < 1; m += 0.01) {
      for (let y = 0; y < 1; y += 0.01) {
        for (let k = 0; k < 1; k += 0.01) {
          const { h, s, l } = CMYKToHSL(c, m, y, k)

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
  }
})
