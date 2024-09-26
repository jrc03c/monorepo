import apply from "./apply.js"
import ndarray from "./ndarray.js"

function ones(shape) {
  return apply(ndarray(shape), () => 1)
}

export default ones
