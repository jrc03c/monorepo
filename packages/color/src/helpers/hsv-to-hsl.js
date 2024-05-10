function HSVToHSL(h, s, v) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  if (isNaN(v) || v < 0 || v > 1) {
    throw new Error(
      "HSV values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!"
    )
  }

  const lightness = v * (1 - s / 2)

  const saturation =
    lightness === 0 || lightness === 1
      ? 0
      : (v - lightness) / Math.min(lightness, 1 - lightness)

  return { h, s: saturation, l: lightness }
}

module.exports = HSVToHSL
