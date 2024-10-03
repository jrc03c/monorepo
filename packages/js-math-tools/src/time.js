import assert from "./assert.js"
import isFunction from "./is-function.js"

export function timeSync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    fn(...args)
  } else {
    fn()
  }

  return new Date() - start
}

export async function timeAsync(fn, args) {
  assert(isFunction(fn), "`fn` must be a function!")

  const start = new Date()

  if (args) {
    await fn(...args)
  } else {
    await fn()
  }

  return new Date() - start
}
