const HSLToRGB = require("./hsl-to-rgb.js")

function HSLToCMYK(h, s, l) {
  const { r, g, b } = HSLToRGB(h, s, l)
  const r_ = r / 255
  const g_ = g / 255
  const b_ = b / 255
  const k = 1 - Math.max(r_, g_, b_)

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 0 }
  } else {
    const c = (1 - r_ - k) / (1 - k)
    const m = (1 - g_ - k) / (1 - k)
    const y = (1 - b_ - k) / (1 - k)
    return { c, m, y, k }
  }
}

module.exports = HSLToCMYK
