import { isString } from "@jrc03c/js-math-tools"
import { stringify } from "@jrc03c/js-text-tools"

function base64Encode(x) {
  if (!isString(x)) {
    x = stringify(x)
  }

  return btoa(encodeURIComponent(x))
}

export { base64Encode }
