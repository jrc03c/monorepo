import isNumber from "./is-number.js"
import product from "./product.js"
import reshape from "./reshape.js"

function zeros(shape) {
  if (isNumber(shape)) shape = [shape]
  const out = []
  const n = product(shape)
  for (let i = 0; i < n; i++) out.push(0)
  return reshape(out, shape)
}

export default zeros
