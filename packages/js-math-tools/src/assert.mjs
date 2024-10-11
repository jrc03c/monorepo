import { MathError } from "./math-error.mjs"

function assert(isTrue, message) {
  if (!isTrue) throw new MathError(message)
}

export { assert }
