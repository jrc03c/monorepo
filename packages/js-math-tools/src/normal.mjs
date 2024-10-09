import { apply } from "./apply.mjs"
import { isUndefined } from "./is-undefined.mjs"
import { ndarray } from "./ndarray.mjs"
import { random } from "./random.mjs"

function helper() {
  const u1 = random()
  const u2 = random()
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
}

function normal(shape) {
  if (isUndefined(shape)) return helper()
  return apply(ndarray(shape), helper)
}

export { normal }
