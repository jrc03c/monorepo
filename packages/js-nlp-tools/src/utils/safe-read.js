const { fs } = (() => {
  try {
    return {
      fs: require("node:fs"),
    }
  } catch (e) {
    return {}
  }
})()

const { isBrowser } = require("@jrc03c/js-math-tools")

const WE_ARE_IN_THE_BROWSER = isBrowser()

function safeRead(file) {
  if (WE_ARE_IN_THE_BROWSER) {
    const out = localStorage.getItem(file)

    try {
      return JSON.parse(out)
    } catch (e) {
      return out
    }
  } else {
    try {
      const out = fs.readFileSync(file, "utf8")

      try {
        return JSON.parse(out)
      } catch (e) {
        return out
      }
    } catch (e) {
      // ...
    }
  }
}

module.exports = safeRead
