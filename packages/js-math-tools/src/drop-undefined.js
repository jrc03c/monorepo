import dropMissing from "./drop-missing.js"

function dropUndefined(x) {
  return dropMissing(x)
}

export default dropUndefined
