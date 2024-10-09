import { assert } from "./assert.mjs"
import { isFunction } from "./is-function.mjs"

function timeSync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    fn(...args)
  } else {
    fn()
  }

  return new Date() - start
}

async function timeAsync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    await fn(...args)
  } else {
    await fn()
  }

  return new Date() - start
}

export { timeSync as time, timeAsync, timeSync }
