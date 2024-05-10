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

function safeDelete(x) {
  try {
    if (WE_ARE_IN_THE_BROWSER) {
      localStorage.removeItem(x)
    } else {
      fs.rmSync(x, { recursive: true, force: true })
    }
  } catch (e) {
    // ...
  }
}

module.exports = safeDelete
