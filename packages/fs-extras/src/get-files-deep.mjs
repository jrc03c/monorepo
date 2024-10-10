import { getFilesDeepSync } from "./get-files-deep-sync.mjs"

function getFilesDeep() {
  const args = Object.values(arguments)
  const dir = args.filter(a => typeof a === "string")[0]
  const depth = args.filter(a => typeof a === "number")[0]
  const callback = args.filter(a => typeof a === "function")[0]

  return new Promise((resolve, reject) => {
    try {
      const files = getFilesDeepSync(dir, depth)
      if (callback) callback(files)
      resolve(files)
    } catch (e) {
      reject(e)
    }
  })
}

export { getFilesDeep }
