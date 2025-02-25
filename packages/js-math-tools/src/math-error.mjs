import { isBrowser } from "./is-browser.mjs"

class MathError extends Error {
  constructor(message) {
    // browser
    if (isBrowser()) {
      super(message)
    }

    // node
    else {
      super("\n\n\x1b[31m" + message + "\n\x1b[0m")
    }
  }
}

export { MathError }
