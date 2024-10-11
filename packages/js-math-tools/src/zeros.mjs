import { isNumber } from "./is-number.mjs"
import { product } from "./product.mjs"
import { reshape } from "./reshape.mjs"

function zeros(shape) {
  if (isNumber(shape)) shape = [shape]
  const out = []
  const n = product(shape)
  for (let i = 0; i < n; i++) out.push(0)
  return reshape(out, shape)
}

export { zeros }
