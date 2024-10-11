import { dropMissing } from "./drop-missing.mjs"

function dropUndefined(x) {
  return dropMissing(x)
}

export { dropUndefined }
