const HSVToHSL = require("./hsv-to-hsl.js")

test("tests that HSVToHSL works as expected", () => {
  const pred = HSVToHSL(50, 1, 1)
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred.l - truth.l)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let h = 0; h < 360; h++) {
    for (let s = 0; s < 1; s += 0.01) {
      for (let v = 0; v < 1; v += 0.01) {
        const { h: h2, s: s2, l } = HSVToHSL(h, s, v)

        if (isNaN(h2) || h2 < 0 || h2 >= 360) {
          throw new Error()
        }

        if (isNaN(s2) || s2 < 0 || s2 > 1) {
          throw new Error()
        }

        if (isNaN(l) || l < 0 || l > 1) {
          throw new Error()
        }
      }
    }
  }
})
