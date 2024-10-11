import { assert } from "../assert.mjs"
import { isNumber } from "../is-number.mjs"

function leftPad(x, maxLength) {
  assert(isNumber(x), "The `leftPad` function only works on numbers!")
  let out = x.toString()
  while (out.length < maxLength) out = "0" + out
  return out
}

export { leftPad }
