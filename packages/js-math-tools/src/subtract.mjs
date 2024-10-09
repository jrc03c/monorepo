import { add } from "./add.mjs"
import { scale } from "./scale.mjs"

function subtract(a, b) {
  return add(a, scale(b, -1))
}

export { subtract }
