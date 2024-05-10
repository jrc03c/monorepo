function RGBToHSL(r, g, b) {
  if (isNaN(r) || r < 0 || r > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(g) || g < 0 || g > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  if (isNaN(b) || b < 0 || b > 255) {
    throw new Error("RGB values must be in the range [0, 255]!")
  }

  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const range = max - min
  const midrange = (max + min) / 2

  const hue =
    range === 0
      ? 0
      : max === r
      ? 60 * (0 + (g - b) / range)
      : max === g
      ? 60 * (2 + (b - r) / range)
      : max === b
      ? 60 * (4 + (r - g) / range)
      : NaN

  const saturation =
    midrange === 0 || midrange === 1
      ? 0
      : (max - midrange) / Math.min(midrange, 1 - midrange)

  const lightness = midrange
  return { h: hue - Math.floor(hue / 360) * 360, s: saturation, l: lightness }
}

module.exports = RGBToHSL
