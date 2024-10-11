import { apply } from "./apply.mjs"
import { ndarray } from "./ndarray.mjs"

function ones(shape) {
  return apply(ndarray(shape), () => 1)
}

export { ones }
