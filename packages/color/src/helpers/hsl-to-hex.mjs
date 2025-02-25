import { HSLToRGB } from "./hsl-to-rgb.mjs"

function HSLToHex(h, s, l) {
  if (isNaN(h) || h < 0 || h >= 360) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!",
    )
  }

  if (isNaN(s) || s < 0 || s > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!",
    )
  }

  if (isNaN(l) || l < 0 || l > 1) {
    throw new Error(
      "HSL values must be in the ranges [0, 360), [0, 1], and [0, 1] respectively!",
    )
  }

  const { r, g, b } = HSLToRGB(h, s, l)
  const rHex = parseInt(r).toString(16).padStart(2, "0")
  const gHex = parseInt(g).toString(16).padStart(2, "0")
  const bHex = parseInt(b).toString(16).padStart(2, "0")
  return { value: `${rHex}${gHex}${bHex}` }
}

export { HSLToHex }
