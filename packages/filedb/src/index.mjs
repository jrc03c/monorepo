import { filter, forEach, map, sort } from "@jrc03c/js-math-tools"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const ARRAY_QUALIFIER = ".filedb.meta.is-array"

function isWholeNumber(x) {
  // i.e., is a non-negative integer
  const i = parseInt(x)
  const f = parseFloat(x)
  return !isNaN(i) && i === f && i >= 0
}

function standardizeKey(key) {
  const invalidParts = []

  forEach(key.split("/"), part => {
    if (part.split(/\s/g).join("").length < part.length) {
      invalidParts.push(part)
      return
    }

    if (part.match(/[^-A-Za-z0-9_.]/g) || part === "." || part === "..") {
      invalidParts.push(part)
      return
    }
  })

  if (invalidParts.length > 0) {
    throw new Error(
      `The key "${key}" cannot be used as a valid filesystem path! Only forward slashes, alphanumeric characters, underscores, hyphens, and periods should be used in keys. The key also cannot include whitespace, and it cannot include "." or ".." as file or directory names, like "./foo" or "bar/../baz". The offending parts are:\n${
          map(invalidParts, part => "→ " + part).join("\n")
        }`,
    )
  }

  if (key.endsWith("/")) {
    key = key.substring(0, -1)
  }

  return key
}

class FileDB {
  path = null

  constructor(relativePath) {
    if (
      typeof relativePath === "object" &&
      relativePath !== null &&
      relativePath.path
    ) {
      relativePath = relativePath.path
    }

    relativePath = typeof relativePath === "undefined" ? "." : relativePath

    if (relativePath[0] === "~") {
      relativePath = path.join(
        os.homedir(),
        relativePath.substring(1, relativePath.length),
      )
    }

    this.path = path.resolve(relativePath)
    fs.mkdirSync(this.path, { recursive: true })
  }

  get dbPath() {
    return this.path
  }

  set dbPath(value) {
    this.path = value
  }

  existsSync(key) {
    return fs.existsSync(path.join(this.path, standardizeKey(key)))
  }

  exists(key, callback) {
    return new Promise((resolve, reject) => {
      try {
        const out = this.existsSync(key)
        if (callback) callback(out)
        return resolve(out)
      } catch (e) {
        return reject(e)
      }
    })
  }

  fork(key) {
    return new FileDB(path.join(this.path, standardizeKey(key || "")))
  }

  writeSync(key, value, ignored) {
    key = standardizeKey(key)
    ignored = ignored || []

    const type = typeof value
    const filePath = path.join(this.path, key)
    const parts = filePath.split("/")
    const dirPath = parts.slice(0, parts.length - 1).join("/")

    const shouldIgnore = ignored.some(ig => {
      if (typeof ig === "string") {
        return filePath.includes(ig)
      } else if (ig instanceof RegExp) {
        return filePath.match(ig)
      }
    })

    if (shouldIgnore) return false

    try {
      fs.unlinkSync(filePath)
    } catch (e) {}

    try {
      fs.rmSync(filePath, { recursive: true, force: true })
    } catch (e) {}

    if (typeof value === "undefined" || value === null) {
      return true
    } else if (type === "object") {
      forEach(Object.keys(value), k => {
        this.writeSync(key + "/" + k, value[k], ignored)
      })

      if (value instanceof Array) {
        this.writeSync(key + "/" + ARRAY_QUALIFIER, true, ignored)
      }

      return true
    } else {
      value = JSON.stringify(value)

      if (typeof value === "undefined") {
        return true
      }

      fs.mkdirSync(dirPath, { recursive: true })
      fs.writeFileSync(filePath, value, "utf8")
      return true
    }
  }

  write(key, value, ignored, callback) {
    return new Promise((resolve, reject) => {
      try {
        const out = this.writeSync(key, value, ignored)

        if (callback) callback(out)
        return resolve(out)
      } catch (e) {
        return reject(e)
      }
    })
  }

  readSync(key, maxDepth, ignored) {
    key = standardizeKey(key)
    ignored = ignored || []

    if (!maxDepth && maxDepth !== 0) maxDepth = Infinity

    const innerRead = (innerKey, currentDepth) => {
      const filePath = path.join(this.path, innerKey)

      if (!fs.existsSync(filePath)) return null

      let shouldIgnore = false

      forEach(ignored, ig => {
        const reg = new RegExp(ig)
        if (reg.test(filePath)) shouldIgnore = true
      })

      if (shouldIgnore) return null

      const stats = fs.lstatSync(filePath)

      if (stats.isFile()) {
        const data = fs.readFileSync(filePath, "utf8")
        let out = data

        try {
          out = JSON.parse(data)
        } catch (e) {}

        return out
      } else {
        const files = fs.readdirSync(filePath)

        if (currentDepth >= maxDepth) {
          return files
        } else {
          if (files.length === 0) return {}

          let failures = 0
          let out = {}
          let isDone = false

          forEach(files, file => {
            if (isDone) return
            const results = innerRead(innerKey + "/" + file, currentDepth + 1)

            if (results !== null && results !== undefined) {
              out[file] = results
            } else {
              failures++
            }

            if (Object.keys(out).length >= files.length - failures) {
              isDone = true
            }
          })

          const { isArray, parsedKeys } = (() => {
            const rawKeys = Object.keys(out)

            if (rawKeys.indexOf(ARRAY_QUALIFIER) > -1) {
              return {
                isArray: true,

                parsedKeys: sort(
                    map(
                      filter(rawKeys, key => key !== ARRAY_QUALIFIER),
                      key => {
                        if (isWholeNumber(key)) {
                          return parseInt(key)
                        } else {
                          return key
                        }
                      },
                    ),
                  (a, b) => (a < b ? -1 : 1),
                ),
              }
            }

            const parsedKeys = []
            let previousKey = -1

            for (const key of rawKeys) {
              const parsedKey = parseInt(key)

              if (isWholeNumber(key) && parsedKey === previousKey + 1) {
                parsedKeys.push(parsedKey)
                previousKey = parsedKey
              } else {
                return {
                  isArray: false,
                  parsedKeys: null,
                }
              }
            }

            return { isArray: true, parsedKeys }
          })()

          if (isArray) {
            const temp = []
            forEach(parsedKeys, key => (temp[key] = out[key]))
            return temp
          } else {
            return out
          }
        }
      }
    }

    return innerRead(key, 0)
  }

  read(key, maxDepth, ignored, callback) {
    return new Promise((resolve, reject) => {
      try {
        const out = this.readSync(key, maxDepth, ignored)
        if (callback) callback(out)
        return resolve(out)
      } catch (e) {
        return reject(e)
      }
    })
  }
}

export { FileDB }
