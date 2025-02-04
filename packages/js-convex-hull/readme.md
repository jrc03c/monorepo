# Introduction

**js-convex-hull** gets the convex hull of a set of 2D points using [the "gift-wrapping" (AKA "Jarvis march") algorithm](https://en.wikipedia.org/wiki/Gift_wrapping_algorithm).

![](https://i.ibb.co/7jMvFQP/hull.png)

# Installation

```bash
npm install --save @jrc03c/js-convex-hull
```

# Usage

Add the script to your page:

```html
<script src="path/to/js-convex-hull.js"></script>
```

Or `require` it for use with bundlers:

```js
const { getConvexHull } = require("@jrc03c/js-convex-hull")
```

Then call the `getConvexHull` function (which returns the subset of points that represents the hull), passing in an array of 2D points:

```js
let points = [
  [0, 5],
  [7, 2],
  [-3, 8],
  [4, -5],
  ...
]

let hull = getConvexHull(points)
```

Check out the [demo](/demo.html) to see it in action!
