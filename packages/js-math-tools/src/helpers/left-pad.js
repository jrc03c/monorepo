import assert from "../assert.js"
import isNumber from "../is-number.js"

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
}

export default leftPad
