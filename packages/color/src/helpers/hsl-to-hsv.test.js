const HSLToHSV = require("./hsl-to-hsv.js")

test("tests that HSLToHSV works as expected", () => {
  const pred = HSLToHSV(50, 1, 0.5)
  const truth = { h: 50, s: 1, v: 1 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.v - truth.v)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let h = 0; h < 360; h++) {
    for (let s = 0; s < 1; s += 0.01) {
      for (let l = 0; l < 1; l += 0.01) {
        const { h: h2, s: s2, v } = HSLToHSV(h, s, l)

        if (isNaN(h2) || h2 < 0 || h2 >= 360) {
          throw new Error()
        }

        if (isNaN(s2) || s2 < 0 || s2 > 1) {
          throw new Error()
        }

        if (isNaN(v) || v < 0 || v > 1) {
          throw new Error()
        }
      }
    }
  }
})
