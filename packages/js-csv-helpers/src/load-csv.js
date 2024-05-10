const fs = (() => {
  try {
    return require("fs/promises")
  } catch (e) {
    return null
  }
})()

const { isBrowser } = require("@jrc03c/js-math-tools")
const parse = require("./parse")

module.exports = async function loadCSV(path, config) {
  const raw = await (async () => {
    if (isBrowser()) {
      const response = await fetch(path)
      return await response.text()
    } else {
      return await fs.readFile(path, { encoding: "utf8" })
    }
  })()

  return parse(raw, config)
}
