import { pow } from "./pow.mjs"
import { scale } from "./scale.mjs"

function divide(a, b) {
  return scale(a, pow(b, -1))
}

export { divide }
