const HSLToCMYK = require("./hsl-to-cmyk.js")

test("tests that HSLToCMYK works as expected", () => {
  const pred = HSLToCMYK(90, 1, 0.25)
  const truth = { c: 0.5, m: 0, y: 1, k: 0.5 }
  expect(Math.abs(pred.c - truth.c)).toBeLessThan(0.01)
  expect(Math.abs(pred.m - truth.m)).toBeLessThan(0.01)
  expect(Math.abs(pred.y - truth.y)).toBeLessThan(0.01)
  expect(Math.abs(pred.k - truth.k)).toBeLessThan(0.01)
})

test("tests that invalid values are never produced", () => {
  for (let h = 0; h < 360; h++) {
    for (let s = 0; s < 1; s += 0.01) {
      for (let l = 0; l < 1; l += 0.01) {
        const { c, m, y, k } = HSLToCMYK(h, s, l)
        const values = [c, m, y, k]

        values.forEach(value => {
          if (isNaN(value) || value < 0 || value > 1) {
            throw new Error()
          }
        })
      }
    }
  }
})
