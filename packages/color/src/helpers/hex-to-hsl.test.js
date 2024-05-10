const hexToHSL = require("./hex-to-hsl.js")
const leftPad = require("./left-pad.js")

test("tests that hexToHSL works as expected", () => {
  const pred1 = hexToHSL("#ffd400")
  const pred2 = hexToHSL("ffd400")
  const truth = { h: 50, s: 1, l: 0.5 }

  expect(Math.abs(pred1.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred1.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred1.l - truth.l)).toBeLessThan(0.01)

  expect(Math.abs(pred2.h - truth.h)).toBeLessThan(1)
  expect(Math.abs(pred2.s - truth.s)).toBeLessThan(0.01)
  expect(Math.abs(pred2.l - truth.l)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let r = 0; r < 255; r++) {
    for (let g = 0; g < 255; g++) {
      for (let b = 0; b < 255; b++) {
        const rHex = leftPad(parseInt(r).toString(16), 2)
        const gHex = leftPad(parseInt(g).toString(16), 2)
        const bHex = leftPad(parseInt(b).toString(16), 2)
        const hex = "#" + rHex + gHex + bHex
        const { h, s, l } = hexToHSL(hex)

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
