function HSLToHSV(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  const value = l + s * Math.min(l, 1 - l)
  const saturation = value === 0 ? 0 : 2 * (1 - l / value)
  return { h, s: saturation, v: value }
}

module.exports = HSLToHSV
