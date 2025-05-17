# Intro

An asynchronous `pause` function

# Installation

```bash
npm install --save @jrc03c/pause
```

# Usage

```js
import { pause } from "@jrc03c/pause"

pause(1000).then(elapsed => {
  console.log(`${elapsed} milliseconds have elapsed!`)
})
```

# API

## `pause(ms)`

Given a number of milliseconds, `ms`, for which to pause, returns a `Promise` that resolves to a number indicating how many milliseconds have actually elapsed since the function was called.
