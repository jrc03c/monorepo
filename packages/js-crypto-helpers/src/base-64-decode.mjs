import { Base64DecodingError } from "./errors.mjs"
import { isEqual, isString } from "@jrc03c/js-math-tools"
import { parse } from "@jrc03c/js-text-tools"

function base64Decode(x) {
  if (!isString(x)) {
    throw new Error(
      "The value passed into the `base64Decode` must be a string!",
    )
  }

  try {
    let out = decodeURIComponent(atob(x))
    let last = out
    let isStillParsing = true

    while (isStillParsing) {
      try {
        out = parse(out)

        if (isEqual(out, last)) {
          isStillParsing = false
        }

        last = out
      } catch (e) {
        isStillParsing = false
      }
    }

    return out
  } catch (e) {
    throw new Base64DecodingError(e.toString())
  }
}

export { base64Decode }
