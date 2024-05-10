# Intro

This is just a little helper tool to convert between color representations (e.g., RGB to HSL).

# Installation

Install directly from the repo or from the NPM registry:

```bash
npm install --save https://github.com/jrc03c/color
npm install --save @jrc03c/color
```

Import into Node and/or a bundled application:

```js
const Color = require("@jrc03c/color")
```

Or insert in a script tag:

```html
<script src="node_modules/@jrc03c/color/dist/color.js"></script>
<script>
  const c = Color.fromRGB(0, 128, 255)
</script>
```

Alternatively, download from a CDN here: [https://unpkg.com/@jrc03c/color/dist/color.js](https://unpkg.com/@jrc03c/color/dist/color.js)

# Usage

## Creating colors

```js
const Color = require("@jrc03c/color")
const a = Color.fromCMYK(0.23, 0.45, 0.67, 0.89)
const b = Color.fromHex("#ffeedd") // with or without "#"
const c = Color.fromHSL(90, 0, 1)
const d = Color.fromHSV(180, 0.25, 0.75)
const e = Color.fromRGB(0, 128, 255)
const f = Color.random()
```

It's also possible to create colors by calling the constructor to instantiate a new `Color` and then setting the instance's component values as in the examples in the next section.

## Changing colors

```js
const Color = require("@jrc03c/color")
const c = new Color()

// set by cmyk values
c.cmyk = [0.23, 0.45, 0.67, 0.89]
c.cmyk = { c: 0.23, m: 0.45, y: 0.67, k: 0.89 }

// set by hex values (with or without "#")
c.hex = "#ffeedd"

// set by hsl values
c.hsl = [90, 0, 1]
c.hsl = { h: 90, s: 0, l: 1 }

// set by hsv values
c.hsv = [180, 0.25, 0.75]
c.hsv = { h: 180, s: 0.25, v: 0.75 }

// set by rgb values
c.rgb = [0, 128, 255]
c.rgb = { r: 0, g: 128, b: 255 }
```

## Getting color representations

```js
const Color = require("@jrc03c/color")
const c = new Color()
c.rgb = [0, 128, 255]

console.log(c.cmyk)
// {
//   c: 1,
//   m: 0.4980392156862745,
//   y: 0,
//   k: 0,
//   toCSSString: [Function (anonymous)]
// }

console.log(c.cmyk.toCSSString())
// 'cmyk(100.00%, 49.80%, 0.00%, 0.00%)'

console.log(c.hex)
// { value: '0080ff', toCSSString: [Function (anonymous)] }

console.log(c.hex.toCSSString())
// '#0080ff'

console.log(c.hsl)
// {
//   h: 209.88235294117646,
//   s: 1,
//   l: 0.5,
//   toCSSString: [Function (anonymous)]
// }

console.log(c.hsl.toCSSString())
// 'hsl(209.88deg, 100.00%, 50.00%)'

console.log(c.hsv)
// {
//   h: 209.88235294117646,
//   s: 1,
//   v: 1,
//   toCSSString: [Function (anonymous)]
// }

console.log(c.hsv.toCSSString())
// 'hsv(209.88deg, 100.00%, 100.00%)'

console.log(c.rgb)
// { r: 0, g: 128, b: 255, toCSSString: [Function (anonymous)] }

console.log(c.rgb.toCSSString())
// 'rgb(0.00, 128.00, 255.00)'
```

# To do

- Add a `print` method to display the color in the console
