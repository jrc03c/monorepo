import pow from "./pow.js"
import scale from "./scale.js"

function divide(a, b) {
  return scale(a, pow(b, -1))
}

export default divide
