import { getDirsDeepSync } from "./get-dirs-deep-sync.mjs"
import { getFilesDeepSync } from "./get-files-deep-sync.mjs"
import { set, sort } from "@jrc03c/js-math-tools"

function findSync(dir, matcher, depth) {
  if (matcher instanceof RegExp || typeof matcher === "string") {
    const originalMatcher = matcher
    matcher = file => file.match(originalMatcher)
  }

  const files = getFilesDeepSync(dir, depth)
  const dirs = getDirsDeepSync(dir, depth)
  const all = files.concat(dirs)
  const out = all.filter(f => matcher(f))
  return sort(set(out))
}

export { findSync }
