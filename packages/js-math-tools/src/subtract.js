import add from "./add.js"
import scale from "./scale.js"

function subtract(a, b) {
  return add(a, scale(b, -1))
}

export default subtract
