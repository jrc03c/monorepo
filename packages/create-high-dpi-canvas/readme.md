# Introduction

**create-high-dpi-canvas** provides a little helper function to make an HTML5 `<canvas>` element compatible with high-DPI screens.

# Installation

`npm install --save https://github.com/jrc03c/create-high-dpi-canvas`

# Usage

Add to your page:

```html
<script src="path/to/create-high-dpi-canvas.js"></script>
```

Or bundle:

```js
const createHighDPICanvas = require("create-high-dpi-canvas")
```

Then create a canvas!

```js
const width = 512
const height = 512
const canvas = createHighDPICanvas(width, height)

// add the canvas to the DOM:
document.body.appendChild(canvas)

// then draw something like you normally would:
const context = canvas.getContext("2d")
context.fillStyle = "red"
context.fillRect(0, 0, width, height)
```

The canvas returned from the `createHighDPICanvas` is just a plain ol' [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), so you can do all of the usual things with it!
