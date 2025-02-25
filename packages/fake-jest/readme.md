# Introduction

This package is a temporary stand-in for [Jest](https://jestjs.io/), which doesn't currently support ES modules (I think).

# Installation

```bash
npm install --save-dev @jrc03c/fake-jest
```

# Usage

**Step 1:** Write a test file:

```js
// my-cool-function.test.mjs
import { afterAll, beforeAll, expect, test } from "./index.mjs"
import { myCoolFunction } from "./my-cool-function.mjs"

beforeAll(() => {
  // set up
})

afterAll(() => {
  // tear down
})

test("that `myCoolFunction` works as expected", () => {
  expect(() => myCoolFunction()).not.toThrow()
})
```

**Step 2a:** Run the tests in `my-cool-function.test.mjs` by running it as a normal Node script:

```bash
node path/to/my-cool-function.test.mjs
```

...or by invoking the `fake-jest` executable and passing the path as an argument:

```bash
npx fake-jest path/to/my-cool-function.test.mjs
```

**Step 2b:** To run _all_ tests in a project, invoke the `fake-jest` executable with no arguments:

```bash
npx fake-jest
```
