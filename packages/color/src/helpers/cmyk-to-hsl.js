const RGBToHSL = require("./rgb-to-hsl.js")

function CMYKToHSL(c, m, y, k) {
  const values = [c, m, y, k]

  values.forEach(v => {
    if (isNaN(v) || v < 0 || v > 1) {
      throw new Error("CMYK values must all be in the range [0, 1]!")
    }
  })

  const r = 255 * (1 - c) * (1 - k)
  const g = 255 * (1 - m) * (1 - k)
  const b = 255 * (1 - y) * (1 - k)
  return RGBToHSL(r, g, b)
}

module.exports = CMYKToHSL
