import { vectorize } from "./vectorize.mjs"

function apply(x, fn) {
  try {
    return fn(x)
  } catch (e) {
    return NaN
  }
}

const vapply = vectorize(apply)
export { vapply as apply }
