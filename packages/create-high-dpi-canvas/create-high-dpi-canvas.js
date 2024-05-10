function createHighDPICanvas(width, height) {
  width = Math.floor(width)
  height = Math.floor(height)

  let dpi = window.devicePixelRatio || 1
  let canvas = document.createElement("canvas")
  canvas.width = Math.floor(width * dpi)
  canvas.height = Math.floor(height * dpi)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  let context = canvas.getContext("2d")
  context.scale(dpi, dpi)

  return canvas
}

if (typeof window !== "undefined") {
  window.createHighDPICanvas = createHighDPICanvas
}

if (typeof module !== "undefined") {
  module.exports = createHighDPICanvas
}
