import { findSync } from "./find-sync.mjs"

function findAsync(dir, pattern, depth, callback) {
  return new Promise((resolve, reject) => {
    try {
      const out = findSync(dir, pattern, depth)
      if (callback) callback(out)
      resolve(out)
    } catch (e) {
      reject(e)
    }
  })
}

export { findAsync }
