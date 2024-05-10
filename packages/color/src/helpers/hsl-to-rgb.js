function HSLToRGB(h, s, l) {
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

  const c = (1 - Math.abs(2 * l - 1)) * s
  const hPrime = h / 60
  const x = c * (1 - Math.abs((hPrime % 2) - 1))
  let temp

  if (hPrime >= 0 && hPrime < 1) {
    temp = [c, x, 0]
  } else if (hPrime >= 1 && hPrime < 2) {
    temp = [x, c, 0]
  } else if (hPrime >= 2 && hPrime < 3) {
    temp = [0, c, x]
  } else if (hPrime >= 3 && hPrime < 4) {
    temp = [0, x, c]
  } else if (hPrime >= 4 && hPrime < 5) {
    temp = [x, 0, c]
  } else {
    temp = [c, 0, x]
  }

  const m = l - c / 2
  const r = (temp[0] + m) * 255
  const g = (temp[1] + m) * 255
  const b = (temp[2] + m) * 255
  return { r, g, b }
}

module.exports = HSLToRGB
