const RGBToHSL = require("./rgb-to-hsl.js")

function hexToHSL(hex) {
  if (typeof hex !== "string") {
    throw new Error("Hex values must be strings!")
  }

  hex = hex.replaceAll("#", "").trim()

  if (hex.length !== 6) {
    throw new Error("Hex values must be 6 in length!")
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return RGBToHSL(r, g, b)
}

module.exports = hexToHSL
